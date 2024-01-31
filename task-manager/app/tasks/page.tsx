import React, { useState } from 'react'
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const TasksPage = async() => {
    
    // had to look at prisma documentation to get this "findMany()." Refer there for other features
    // tasks is a variable that contains all the data in the table. See note below for tasks.map
    const tasks = await prisma.task.findMany()

    const [editing, setEditing] = useState(false);
    console.log(editing)

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
                                {editing ? <input defaultValue={task.description}></input> : <span>{task.description}</span>}
                            </Table.Cell>
                            <Table.Cell>
                                <Flex gap="2">
                                    <Button 
                                      className='w-1/2'
                                      onClick={() => setEditing(true)}>
                                        Edit
                                    </Button>
                                    <Button className='w-1/2' color="red">
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
