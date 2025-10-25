import { Chakra_Petch } from 'next/font/google'
import '../styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ToastProvider } from '@/components/ToastContainer'

const chakraPetch = Chakra_Petch({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-chakra-petch',
})

export const metadata = {
  title: 'VIRTY - The Portal to Cyberspace',
  description: 'Your gateway to infinite digital worlds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={chakraPetch.className}>
        <ToastProvider>
          <Navigation />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
