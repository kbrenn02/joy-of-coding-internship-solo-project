import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema, patchTaskSchema } from "../../validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";

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


export async function PATCH(request: NextRequest, {params} : { params : {id : string }}) {
    const body = await request.json();
    console.log(body)
    const validation = patchTaskSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const task = await prisma.task.findUnique({
        where: {id : parseInt(params.id)}
    })
    console.log("API retrieved task: ", task)

    if(!task)
        return NextResponse.json({error: "Invalid task"}, {status: 404})

    const updateTask = await prisma.task.update({
        where: {id : task.id},
        data: {
            title: body.title, 
            description: body.description, 
            due: body.due,
            status: body.status
        }
    })

    console.log(updateTask)

    return NextResponse.json(updateTask)
}


export async function DELETE(request: NextRequest, {params}:{params: {id:string}}) {
    // fetch task from db
    const task = await prisma.task.findUnique({
        where: { id : parseInt(params.id)}
    })

    // error if round not found
    if(!task)
        return NextResponse.json({ error : "Task not found" }, { status : 404})

    // delete the user
    const deleteTask = await prisma.task.delete({
        where: {id: task.id}
    })

    return NextResponse.json({})
}