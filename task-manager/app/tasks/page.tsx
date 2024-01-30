import React, { useState, useEffect } from 'react'
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const TasksPage = async() => {
    
    // had to look at prisma documentation to get this "findMany()." Refer there for other features
    // tasks is a variable that contains all the data in the table. See note below for tasks.map
    const tasks = await prisma.task.findMany()


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
                    </Table.Row>
                </Table.Header>

                {/* tasks.map(task) is a function that goes through every line of data. Task.XXX calls the data
                with that specific header. This function has an issue showing date types, so task.due.toDateString() 
                is needed to turn the date type to a string type*/}
                <Table.Body>
                    {tasks.map((task) =>
                        <Table.Row>
                            <Table.RowHeaderCell>{task.due.toDateString()}</Table.RowHeaderCell>
                            <Table.Cell>{task.status}</Table.Cell>
                            <Table.Cell>{task.title}</Table.Cell>
                            <Table.Cell>{task.description}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>

        </>
    )
}

export default TasksPage
