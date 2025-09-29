import { useEffect, useState } from 'react'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import { useNavigate, useParams } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

export default function CertificationFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [provider, setProvider] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    async function load() {
      if (!isEdit) return
      const res = await fetch(`${API}/certifications/${id}`)
      if (res.ok) {
        const data = await res.json()
        setTitle(data.title ?? '')
        setProvider(data.provider ?? '')
        setDescription(data.description ?? '')
        setLink(data.link ?? '')
        setStartDate(data.startDate ? data.startDate.slice(0, 10) : '')
        setEndDate(data.endDate ? data.endDate.slice(0, 10) : '')
      }
    }
    load()
  }, [id])

  async function save() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login as Employer/Admin to save.')
      return
    }
    const payload: any = { title, provider, description, link }
    if (startDate) payload.startDate = new Date(startDate).toISOString()
    if (endDate) payload.endDate = new Date(endDate).toISOString()
    const res = await fetch(isEdit ? `${API}/certifications/${id}` : `${API}/certifications`, {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      alert('Failed to save')
      return
    }
    navigate('/certifications')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEdit ? 'Edit Certification' : 'Add Certification Program'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput value={title} onIonInput={e => setTitle(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Provider</IonLabel>
          <IonInput value={provider} onIonInput={e => setProvider(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea autoGrow value={description} onIonInput={e => setDescription(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Link</IonLabel>
          <IonInput type="url" value={link} onIonInput={e => setLink(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Start Date</IonLabel>
          <IonInput type="date" value={startDate} onIonInput={e => setStartDate(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">End Date</IonLabel>
          <IonInput type="date" value={endDate} onIonInput={e => setEndDate(e.detail.value ?? '')} />
        </IonItem>
        <div style={{ marginTop: 16 }}>
          <IonButton onClick={save}>{isEdit ? 'Update' : 'Create'}</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}


