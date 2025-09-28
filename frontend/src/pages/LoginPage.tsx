import { useState } from 'react'
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

export default function LoginPage() {
  const [email, setEmail] = useState('seeker@karirhub.dev')
  const [password, setPassword] = useState('seeker123')
  const navigate = useNavigate()

  async function login() {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      navigate('/')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput type="email" value={email} onIonInput={e => setEmail(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Password</IonLabel>
        <IonInput type="password" value={password} onIonInput={e => setPassword(e.detail.value!)} />
      </IonItem>
      <div style={{ marginTop: 16 }}>
        <IonButton onClick={login}>Login</IonButton>
      </div>
    </div>
  )
}


