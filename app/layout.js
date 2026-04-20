import './globals.css'

export const metadata = {
  title: 'Synaptic - Movie Discovery',
  description: 'Discover movies and series with immersive experiences',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
