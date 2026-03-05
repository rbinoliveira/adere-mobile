import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  firebaseSendPasswordResetEmail,
  firebaseSignInWithApple,
  firebaseSignInWithEmail,
  firebaseSignInWithGoogle,
  firebaseSignOut,
} from '@/features/auth/services/firebase-auth.service'
import {
  requestNotificationPermission,
  syncPrescriptionsWithNotifications,
} from '@/features/medications/services/notifications.service'
import { Prescription } from '@/features/medications/types/prescription'
import { auth, db } from '@/shared/libs/firebase'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const unsubscribePrescriptionsRef = useRef<(() => void) | null>(null)

  // 4.4 — On auth state change: request permission + subscribe to prescription changes for sync
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      // Clean up previous prescription listener before setting new user
      unsubscribePrescriptionsRef.current?.()
      unsubscribePrescriptionsRef.current = null

      setUser(firebaseUser)
      setLoading(false)

      if (!firebaseUser) return

      // Request notification permission on login
      await requestNotificationPermission()

      // Subscribe to prescription changes and sync notifications
      const q = query(
        collection(db, 'prescriptions'),
        where('patientId', '==', firebaseUser.uid),
        where('isActive', '==', true),
      )

      unsubscribePrescriptionsRef.current = onSnapshot(q, async (snapshot) => {
        const prescriptions: Prescription[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Prescription, 'id'>),
        }))

        // Sync notifications whenever prescriptions change (version-aware)
        await syncPrescriptionsWithNotifications(prescriptions).catch((err) => {
          if (__DEV__) console.warn('[Auth] Failed to sync notifications:', err)
        })
      })
    })

    return () => {
      unsubscribeAuth()
      unsubscribePrescriptionsRef.current?.()
    }
  }, [])

  async function signIn(email: string, password: string) {
    await firebaseSignInWithEmail(email, password)
  }

  async function signInWithGoogle() {
    await firebaseSignInWithGoogle()
  }

  async function signInWithApple() {
    await firebaseSignInWithApple()
  }

  async function signOut() {
    await firebaseSignOut()
  }

  async function sendPasswordReset(email: string) {
    await firebaseSendPasswordResetEmail(email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithGoogle,
        signInWithApple,
        signOut,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
