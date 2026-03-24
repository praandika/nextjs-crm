import {prisma} from "@/lib/prisma"

export async function GET() {
    try {
        const users = await prisma.user.findMany({
        orderBy: {id: "asc"},
        })

        return Response.json(users)
    } catch (error) {
        console.error(error)
        return Response.json(
            {error: "Server Error"},
            {status: 500}
        )
    }
}

export async function POST(request) {
    const body = await request.json()

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            role: body.role,
        }
    })

    return Response.json(newUser)
}