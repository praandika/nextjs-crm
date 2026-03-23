"use client"
import { useEffect, useState } from "react"

export default function Home(){
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  const fetchUsers = async () => {
    const res = await fetch("api/users")
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, role}),
    })

    setName("")
    setRole("")
    fetchUsers()
  }

  return (
    <div style={{padding: "40px"}}>
      <h1>Next.js Fullstack CRM</h1>

      <form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
        <input
          placeholder="Input Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Input Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button style={{marginLeft: "10px"}}>
          Tambah
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} style={{marginTop: "15px"}}>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  )
}