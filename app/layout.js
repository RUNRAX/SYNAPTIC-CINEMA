import './globals.css'

export const metadata = {
  title: 'Synaptic - Movie Discovery',
  description: 'Discover movies and series with immersive experiences',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#0a0e1a' }}>{children}</body>
    </html>
  )
}
