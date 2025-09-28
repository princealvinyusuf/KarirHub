import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { Routes, Route, Link } from 'react-router-dom'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JobsLayout />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

function JobsLayout() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>KarirHub</Link></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <JobsPage />
      </IonContent>
    </IonPage>
  )
}


