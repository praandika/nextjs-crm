"use client"
import { useEffect, useState } from "react"

export default function Home(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <h2>Loading...</h2>

  return (
    <div style={{padding: "40px"}}>
      <h1>Next.js Fullstack CRM</h1>

      {users.map((user) => (
        <div key={user.id} style={{marginTop: "15px"}}>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  )
}