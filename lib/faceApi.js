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

export async function detectDominantEmotion(videoElement) {
  const faceapi = await loadFaceApiModels()

  const detection = await faceapi
    .detectSingleFace(
      videoElement,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 320,
        scoreThreshold: 0.5,
      })
    )
    .withFaceExpressions()

  if (!detection?.expressions) {
    return {
      hasFace: false,
      emotion: 'neutral',
      confidence: 0,
      expressions: null,
    }
  }

  const [label, confidence] =
    Object.entries(detection.expressions).sort((left, right) => right[1] - left[1])[0] || []

  return {
    hasFace: true,
    emotion: EMOTION_MAP[label] || 'neutral',
    confidence: confidence ?? 0,
    expressions: detection.expressions,
  }
}
