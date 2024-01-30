import React, { useState, useEffect } from 'react'
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const TasksPage = async() => {
    
    // had to look at prisma documentation to get this "findMany()." Refer there for other features
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
