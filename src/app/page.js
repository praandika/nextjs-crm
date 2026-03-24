"use client"
import { useEffect, useState } from "react"

export default function Home(){
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  // READ data
  const ambilDataUser = async () => {
    const res = await fetch("/api/users")

    if (!res.ok) {
      console.error("API Error")
      return
    }

    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    ambilDataUser()
  }, [])

  // CREATE data
  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("/api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, role}),
    })

    setName("")
    setRole("")
    ambilDataUser()
  }

  // DELETE data
  const deleteUser = async (id) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id}),
    })

    ambilDataUser()
  }

  // UPDATE data
  const updateUser = async (id) => {
    const name = prompt("Input New Name")
    const role = prompt("Input New Role")

    if (!name || !role) return

    await fetch("api/users", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, name, role}),
    })

    ambilDataUser()
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
          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
          <button onClick={() => updateUser(user.id)}>
            Update
          </button>
        </div>
      ))}
    </div>
  )
}