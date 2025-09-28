import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

type Job = { id: string; title: string; description: string; company: { name: string } }

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API}/jobs/${id}`)
      if (res.ok) {
        setJob(await res.json())
      }
    }
    load()
  }, [id])

  async function apply() {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    await fetch(`${API}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ jobId: id }),
    })
    alert('Applied!')
  }

  if (!job) return null
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{job.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p><strong>Company:</strong> {job.company?.name}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{job.description}</p>
        <IonButton onClick={apply}>Apply</IonButton>
      </IonCardContent>
    </IonCard>
  )
}


