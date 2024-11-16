import { initializeApp } from 'firebase/app'
import * as firebaseui from 'firebaseui'
import firebase from 'firebase/compat/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDDxsW3obgfRAOwqNqHQyIZd7xLpZfwvG8',
    authDomain: 'tadok-c5c6d.firebaseapp.com',
    projectId: 'tadok-c5c6d',
    storageBucket: 'tadok-c5c6d.firebasestorage.app',
    messagingSenderId: '456400773616',
    appId: '1:456400773616:web:045e1d5f15d754a7e37d35',
    measurementId: 'G-LJXYES6EBC',
}

export const loginUIConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (
            authResult: any,
            redirectUrl: string
        ) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.

            const user = authResult.user
            console.log('User signed in:', user.displayName, user.email)

            return false
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            // document.getElementById('loader').style.display = 'none'
        },
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
export const authUI =
    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
