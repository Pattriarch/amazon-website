import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    )
}
