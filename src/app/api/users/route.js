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

export async function DELETE(request) {
    try {
        const {id} = await request.json()

        await prisma.user.delete({
            where: {id: Number(id)},
        })

        return Response.json({message: "User deleted"})
    } catch (error) {
        console.error(error)

        return Response.json(
            {error: "Server Error"},
            {status: 500}
        )
    }
}

export async function PUT(request) {
    try {
        const body = await request.json()

        const updateUser = await prisma.user.update({
            where: {id: Number(body.id)},
            data: {
                name: body.name,
                role: body.role,
            }
        })

        return Response.json(updateUser)
        
    } catch (error) {
        console.error(error)

        return Response.json(
            {error: "Server Error"},
            {status: 500}
        )
    }
}