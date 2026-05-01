export function lerp(a, b, t) {
  return a + (b - a) * t
}

export function ripple(element, event) {
  const rect = element.getBoundingClientRect()
  const x = event ? event.clientX - rect.left : rect.width / 2
  const y = event ? event.clientY - rect.top : rect.height / 2
  
  const circle = document.createElement('div')
  circle.classList.add('ripple-circle')
  
  circle.style.width = '10px'
  circle.style.height = '10px'
  circle.style.left = `${x - 5}px`
  circle.style.top = `${y - 5}px`
  
  element.appendChild(circle)
  
  setTimeout(() => {
    element.removeChild(circle)
  }, 600)
}
