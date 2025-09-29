import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/react'
import { Routes, Route, Link } from 'react-router-dom'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JobsLayout />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

function JobsLayout() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>KarirHub</Link></IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/about">About Us</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <JobsPage />
      </IonContent>
    </IonPage>
  )
}


