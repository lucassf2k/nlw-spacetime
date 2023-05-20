import "./globals.css"
import { ReactNode } from "react"
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google"

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" })
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjurre",
})

export const metadata = {
  title: "Spacetime | Seu espaço para guardar suas melhores memórias",
  description:
    "Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
