import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useNavigate } from 'react-router-dom'

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Us</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => navigate('/certifications')}>Certification Programs</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>KarirHub</h2>
        <p>
          KarirHub is a demo job portal built with Ionic React, Express, Prisma, and PostgreSQL.
          It showcases a simple flow for discovering jobs, viewing details, and applying.
        </p>
        <p>
          This project is containerized with Docker for easy local development and deployment.
        </p>
      </IonContent>
    </IonPage>
  )
}


