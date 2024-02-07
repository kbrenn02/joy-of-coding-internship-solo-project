import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema, patchTaskSchema } from "../../../validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";


// function to delete a record
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


// function to update a record
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
            due: new Date(body.due),
            status: body.status
        }
    })

    console.log(updateTask)

    return NextResponse.json(updateTask)
}


// function to get just 1 record (as opposed to all, which the other file pulls with findMany())
export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
    //Fetch from DB the task with the specified id
    const task = await prisma.task.findUnique({
        where: {id: parseInt(params.id)}
    })
    //If not found return 404
    //Else return actual data
    if (!task)
        return NextResponse.json({error: "round not found"}, {status: 404})
 
 
    return NextResponse.json(task)
 }
 