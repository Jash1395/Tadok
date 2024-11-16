import { useEffect } from 'react'
import { authUI, loginUIConfig } from '../firebase/firebase'

export const useLoginUI = () => {
    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href =
            'https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css'
        document.head.appendChild(link)

        authUI.start('#firebaseui-auth-container', loginUIConfig)

        return () => {
            authUI.reset()
            document.head.removeChild(link)
        }
    }, [])
}
