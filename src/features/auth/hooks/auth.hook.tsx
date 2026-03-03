import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth'
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as Crypto from 'expo-crypto'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'

const auth = getAuth()

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
})

type User = {
  email: string
  name: string
  role: string
  photo: string
  phone?: string
  birthDate?: string
}

type AuthContextType = {
  user: User | null
  login: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>
  register: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>
  logout: () => Promise<void>
  loading: boolean
  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential>
  signInWithApple: () => Promise<FirebaseAuthTypes.UserCredential>
  recoverPassword: (email: string) => Promise<void>
  isAppleAuthAvailable: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

async function getOrCreateUser(
  authUser: FirebaseAuthTypes.User,
): Promise<User> {
  const db = getFirestore()
  const userRef = doc(db, 'users', authUser.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    const newUser: User = {
      email: authUser.email || '',
      name: authUser.displayName || '',
      role: 'user',
      photo: authUser.photoURL || '',
    }

    await setDoc(userRef, {
      ...newUser,
      createdAt: serverTimestamp(),
      uid: authUser.uid,
    })

    return newUser
  }

  const data = userSnap.data()!
  return {
    email: data.email,
    name: data.name,
    role: data.role,
    photo: data.photo,
    phone: data.phone,
    birthDate: data.birthDate,
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      let user = null

      if (authUser) {
        user = await getOrCreateUser(authUser)
      }

      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    async function checkAppleAuth() {
      if (Platform.OS === 'ios') {
        const isAvailable = await AppleAuthentication.isAvailableAsync()
        setIsAppleAuthAvailable(isAvailable)
      }
    }
    checkAppleAuth()
  }, [])

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function recoverPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
  }

  function logout() {
    return signOut(auth)
  }

  async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const signInResult = await GoogleSignin.signIn()

    const idToken = signInResult.data?.idToken

    if (!idToken) {
      throw new Error('No ID token found')
    }

    const googleCredential = GoogleAuthProvider.credential(idToken)

    return signInWithCredential(getAuth(), googleCredential)
  }

  async function signInWithApple() {
    const nonce = Math.random().toString(36).substring(2, 10)
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
      throw new Error('No identity token found')
    }

    const provider = new OAuthProvider('apple.com')
    const credential = provider.credential({
      idToken: identityToken,
      rawNonce: nonce,
    })

    return signInWithCredential(auth, credential)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        signInWithGoogle,
        signInWithApple,
        recoverPassword,
        isAppleAuthAvailable,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
