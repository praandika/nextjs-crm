export async function GET() {
    const users = [
        { id: 1, name: "Andika", role: "Data Analyst" },
        { id: 2, name: "Desak", role: "Frontend Developer" },
        { id: 3, name: "Inten", role: "Data Scientist" }
    ]

    return Response.json(users)
}