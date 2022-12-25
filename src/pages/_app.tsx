import { AppProvider } from '../data/context/appContext'
import { AuthProvider } from '../data/context/AuthContext'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider tema={''} alternarTema={function (): void {
        throw new Error('Function not implemented.')
      } }>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
    )
}
