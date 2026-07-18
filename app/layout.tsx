import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ToDo管理アプリ',
  description: 'シンプルなToDo管理アプリ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  )
}
