import { useEffect, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

export type CertificationProgram = {
  id: string
  title: string
  provider?: string
  description?: string
  link?: string
  startDate?: string
  endDate?: string
}

export default function CertificationListPage() {
  const [items, setItems] = useState<CertificationProgram[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    const res = await fetch(`${API}/certifications`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id: string) {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login as Employer/Admin to delete.')
      return
    }
    if (!confirm('Delete this certification?')) return
    await fetch(`${API}/certifications/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Certification Programs</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => navigate('/certifications/new')}>Add Certification Program</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <IonList>
            {items.map((it) => (
              <IonItem key={it.id} lines="full">
                <IonLabel>
                  <h2>{it.title}</h2>
                  <p>{it.provider}</p>
                </IonLabel>
                <IonButtons slot="end">
                  <IonButton onClick={() => navigate(`/certifications/${it.id}/edit`)}>Edit</IonButton>
                  <IonButton color="danger" onClick={() => remove(it.id)}>Delete</IonButton>
                </IonButtons>
              </IonItem>
            ))}
            {items.length === 0 && <div>No certifications yet.</div>}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}


