const FACE_API_MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights'

const EMOTION_MAP = {
  angry: 'angry',
  disgusted: 'disgust',
  fearful: 'fear',
  happy: 'happy',
  neutral: 'neutral',
  sad: 'sad',
  surprised: 'surprise',
}

let faceApiPromise = null

async function configureTensorflow(faceapi) {
  const tf = faceapi.tf

  if (!tf?.setBackend) {
    return
  }

  try {
    await tf.setBackend('webgl')
  } catch (error) {
    await tf.setBackend('cpu')
  }

  await tf.ready()
}

export async function loadFaceApiModels() {
  if (typeof window === 'undefined') {
    throw new Error('face-api.js can only be loaded in the browser')
  }

  if (!faceApiPromise) {
    faceApiPromise = (async () => {
      const faceapi = await import('face-api.js')

      await configureTensorflow(faceapi)
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_MODEL_URL),
      ])

      return faceapi
    })().catch((error) => {
      faceApiPromise = null
      throw error
    })
  }

  return faceApiPromise
}

export function preloadModels() {
  loadFaceApiModels().catch((err) => console.log('Preload face-api error:', err))
}

export async function detectMixedEmotions(videoElement) {
  const faceapi = await loadFaceApiModels()

  const detection = await faceapi
    .detectSingleFace(
      videoElement,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 160,
        scoreThreshold: 0.3,
      })
    )
    .withFaceExpressions()

  if (!detection?.expressions) {
    return {
      hasFace: false,
      emotion: 'neutral',
      confidence: 0,
      expressions: null,
      topEmotions: [{ emotion: 'neutral', confidence: 1 }]
    }
  }

  // Sort all expressions by confidence descending
  const sortedEmotions = Object.entries(detection.expressions)
    .sort((left, right) => right[1] - left[1])
    .map(([label, confidence]) => ({
      emotion: EMOTION_MAP[label] || 'neutral',
      confidence: confidence
    }))

  const significantEmotions = sortedEmotions.filter(e => e.confidence > 0.15)
  if (significantEmotions.length === 0) {
    significantEmotions.push(sortedEmotions[0])
  }

  return {
    hasFace: true,
    emotion: sortedEmotions[0].emotion,
    confidence: sortedEmotions[0].confidence,
    expressions: detection.expressions,
    topEmotions: significantEmotions.slice(0, 3) // Return top meaningful mixed emotions
  }
}

export async function detectDominantEmotion(videoElement) {
  const result = await detectMixedEmotions(videoElement)
  return {
    hasFace: result.hasFace,
    emotion: result.emotion,
    confidence: result.confidence,
    expressions: result.expressions
  }
}
