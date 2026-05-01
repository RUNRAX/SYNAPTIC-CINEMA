export default function GridLines() {
  return (
    <div className="grid-overlay">
      <div className="grid-h" style={{ top: '33%' }}></div>
      <div className="grid-h" style={{ top: '66%' }}></div>
      <div className="grid-v" style={{ left: '33%' }}></div>
      <div className="grid-v" style={{ right: '320px' }}></div>
      
      <div className="cross" style={{ top: '33%', left: '33%', transform: 'translate(-50%, -50%)' }}></div>
      <div className="cross" style={{ top: '66%', left: '33%', transform: 'translate(-50%, -50%)' }}></div>
      
      {/* Additional crosses for right intersections */}
      <div className="cross" style={{ top: '33%', right: '320px', transform: 'translate(50%, -50%)' }}></div>
      <div className="cross" style={{ top: '66%', right: '320px', transform: 'translate(50%, -50%)' }}></div>
    </div>
  )
}
