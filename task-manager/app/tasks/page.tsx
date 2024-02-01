// 'use client';
/* currently getting circular errors. If I don't have "use client", I get the following error
        "You're importing a component that needs useState. It only works in a Client Component, 
        but none of its parents are marked with "use client", so they're Server Components by default."
    but if I do have "use client", I get:
        "Error: async/await is not yet supported in Client Components, only Server Components. This error 
        is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
*/

import React, { useState } from 'react'
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import EditTask from './editTask';

const TasksPage = async() => {
    
    // had to look at prisma documentation to get this "findMany()." Refer there for other features
    // tasks is a variable that contains all the data in the table. See note below for tasks.map
    const tasks = await prisma.task.findMany()

    // const updateTaskResult = await EditTask(5, "IN_PROGRESS")
    // console.log(JSON.stringify(updateTaskResult, null, 5))

    // async function handleDelete(idToDelete: number) {
    //     const deleteTask = await prisma.task.delete({
    //             where: {
    //             id: idToDelete,
    //             },
    //         })
    //     console.log("delete button pushed")
    // }

    // const deleteTask = await prisma.task.delete({
    //     where: {
    //       id: 2,
    //     },
    //   })

    // const [editing, setEditing] = useState(false);
    // console.log(editing)
    var editing = false


    return (
        <>
            <div className='ml-4'>
                <Button><Link href='/tasks/new'>New Task</Link></Button>
            </div>

            <Table.Root className='mt-4'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Task Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                {/* tasks.map(task) is a function that goes through every line of data. Task.XXX calls the data
                with that specific header. This function has an issue showing date types, so task.due.toDateString() 
                is needed to turn the date type to a string type*/}
                <Table.Body>
                    {tasks.map((task) =>
                        <Table.Row>
                            {/* edit the due date row */}
                            <Table.RowHeaderCell>
                                {editing ? <input defaultValue={task.due.toDateString()}></input> : <span>{task.due.toDateString()}</span>}
                            </Table.RowHeaderCell>
                            {/* edit the status row */}
                            <Table.Cell>
                                {editing ? <input defaultValue={task.status}></input> : <span>{task.status}</span>}
                            </Table.Cell>
                            {/* edit the title row */}
                            <Table.Cell>
                                {editing ? <input defaultValue={task.title}></input> : <span>{task.title}</span>}
                            </Table.Cell>
                            {/* edit the description row */}
                            <Table.Cell>
                                {editing ? <input defaultValue={task.description}></input> : <span>{task.id}</span>}
                            </Table.Cell>
                            <Table.Cell>
                                <Flex gap="2">
                                    <Button 
                                      className='w-1/2'>
                                      {/* onClick={() => handleEdit()}> */}
                                        Edit
                                    </Button>
                                    <Button 
                                      className='w-1/2' 
                                      color="red">
                                      {/* onClick={() => {}}> */}
                                        Delete
                                    </Button>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>

        </>
    )
}

export default TasksPage
