import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema, patchTaskSchema } from "../../../validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";

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


/*
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
}*/