import * as AppleAuthentication from 'expo-apple-authentication'
import * as AuthSession from 'expo-auth-session'
import * as Crypto from 'expo-crypto'
import {
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import { env } from '@/shared/config/env'
import { auth } from '@/shared/libs/firebase'

export async function firebaseSignInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export async function firebaseSignOut() {
  await signOut(auth)
}

export async function firebaseSendPasswordResetEmail(email: string) {
  await sendPasswordResetEmail(auth, email)
}

export async function firebaseSignInWithGoogle() {
  const iosClientId = env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
  const reversedClientId = iosClientId.split('.').reverse().join('.')
  const redirectUri = `${reversedClientId}:/oauthredirect`

  const discovery = await AuthSession.fetchDiscoveryAsync(
    'https://accounts.google.com',
  )

  const request = new AuthSession.AuthRequest({
    clientId: iosClientId,
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
    responseType: AuthSession.ResponseType.Code,
    usePKCE: true,
  })

  const result = await request.promptAsync(discovery)

  if (result.type !== 'success') {
    throw new Error('Google sign-in cancelled or failed')
  }

  const tokenResult = await AuthSession.exchangeCodeAsync(
    {
      clientId: iosClientId,
      code: result.params.code,
      redirectUri,
      extraParams: {
        code_verifier: request.codeVerifier ?? '',
      },
    },
    discovery,
  )

  const idToken = tokenResult.idToken
  if (!idToken) throw new Error('Google sign-in failed: no id_token')

  const credential = GoogleAuthProvider.credential(idToken)
  const userCredential = await signInWithCredential(auth, credential)
  return userCredential.user
}

export async function firebaseSignInWithApple() {
  const nonce = Crypto.randomUUID()
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce,
  )

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  })

  const { identityToken } = appleCredential

  if (!identityToken) {
    throw new Error('Apple sign-in failed: no identity token')
  }

  const provider = new OAuthProvider('apple.com')
  const credential = provider.credential({
    idToken: identityToken,
    rawNonce: nonce,
  })

  const userCredential = await signInWithCredential(auth, credential)
  return userCredential.user
}
