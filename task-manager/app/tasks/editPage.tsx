import React, { useState, useEffect } from 'react'
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const EditPage = async() => {
    
    // had to look at prisma documentation to get this "findMany()." Refer there for other features
    // tasks is a variable that contains all the data in the table. See note below for tasks.map
    const tasks = await prisma.task.findMany()

    // function handleEdit() {
    //     const data = {

    //     }
    // }


    return (
        <>
            <div className='ml-4'>
                <Button><Link href='/tasks/new'>New Task</Link></Button>
            </div>

            <Table.Root className='mt-4'>

                {/* tasks.map(task) is a function that goes through every line of data. Task.XXX calls the data
                with that specific header. This function has an issue showing date types, so task.due.toDateString() 
                is needed to turn the date type to a string type*/}
                <Table.Body>
                    {tasks.map((task) =>
                        <Table.Row>
                            <Table.RowHeaderCell>
                                <input
                                  type="date"
                                  id="due"
                                  value={task.due.toDateString()}>
                                </input>
                            </Table.RowHeaderCell>
                            <Table.Cell>
                                <input type="radio" name="radio">OPEN</input>
                                <input type="radio" name="radio">IN PROGRESS</input>
                                <input type="radio" name="radio">CLOSED</input>
                            </Table.Cell>
                            {/* <Table.RowHeaderCell>{task.due.toDateString()}</Table.RowHeaderCell> */}
                            <Table.Cell>{task.status}</Table.Cell>
                            <Table.Cell>{task.title}</Table.Cell>
                            <Table.Cell>{task.description}</Table.Cell>
                            <Table.Cell>
                                <Flex gap="2">
                                    <Button 
                                      className='w-1/2'>
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

export default EditPage
