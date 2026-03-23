let users = [
        { id: 1, name: "Andika", role: "Data Analyst" },
        { id: 2, name: "Desak", role: "Frontend Developer" },
        { id: 3, name: "Inten", role: "Data Scientist" }
    ]

export async function GET() {
    return Response.json(users)
}

export async function POST(request) {
    const body = await request.json()

    const newUser = {
        id: users.length + 1,
        name: body.name,
        role: body.role,
    }

    users.push(newUser)

    return Response.json(newUser)
}