import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

export default function AboutPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Us</IonTitle>
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


