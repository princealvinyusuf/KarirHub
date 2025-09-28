import { useEffect, useState } from 'react'
import { IonList, IonItem, IonLabel, IonSearchbar, IonSpinner } from '@ionic/react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

type Company = { id: string; name: string }
type Job = { id: string; title: string; description: string; company: Company }

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      setLoading(true)
      const res = await fetch(`${API}/jobs?q=${encodeURIComponent(q)}`, { signal: controller.signal })
      const data = await res.json()
      setJobs(data)
      setLoading(false)
    }
    load()
    return () => controller.abort()
  }, [q])

  return (
    <div>
      <IonSearchbar value={q} onIonInput={e => setQ(e.detail.value ?? '')} placeholder="Search jobs" />
      {loading ? (
        <div style={{ padding: 16 }}><IonSpinner /></div>
      ) : (
        <IonList>
          {jobs.map(j => (
            <IonItem key={j.id} routerLink={`/jobs/${j.id}`}>
              <IonLabel>
                <h2>{j.title}</h2>
                <p>{j.company?.name}</p>
              </IonLabel>
            </IonItem>
          ))}
          {jobs.length === 0 && <div style={{ padding: 16 }}>No jobs found.</div>}
        </IonList>
      )}
    </div>
  )
}


