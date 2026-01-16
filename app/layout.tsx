import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>To-Do List App</title>
        <meta
          name="description"
          content="A feature-rich to-do list built with Next.js"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
