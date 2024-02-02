import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema } from "../../validationSchema";
import prisma from "@/prisma/client";

// Function used to post information to the DB
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body); // see point 1 below
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newTask = await prisma.task.create({
        data: {
            title: body.title, 
            description: body.description, 
            due: body.due
        }
    })

    return NextResponse.json(newTask, { status: 201 })
}

/*
1. Safe Parsing with Zod
    "safe" parsing doesn't throw error if validation fails
        ex: mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
            mySchema.safeParse(12); // => { success: false; error: ZodError }
2. (Next)Request and (Next)Response
    A request is something a client (web user) makes to a server. In our case, the client is filling out task information 
    This information goes to the server and the server checks if the information (aka request) is valid
    If the request is valid, the server sends a response. In this case, the response is adding the newTask to the database and gives a success message
    Request: Client to Server, Response: Server to client
*/

export async function GET(request: NextRequest) {

    const tasks = await prisma.task.findMany()

    return NextResponse.json(tasks, { status: 201 })
}

