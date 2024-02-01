import React, { useState, useEffect } from 'react'
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const EditPage = async (id: number) => {
    
    // had to look at prisma documentation to get this "findMany()." Refer there for other features
    // tasks is a variable that contains all the data in the table. See note below for tasks.map
    const tasks = await prisma.task.findMany()

    // const InputField = ({value, handleChange}:{value:number, handleChange: (e: React.ChangeEvent<HTMLInputElement>)}
    //     return (
    //         <input
    //         onChange={handleChange}
    //         defaultValue={value}
    //         >
    //         </input>
    //     )
    // )



    // function handleEdit() {
    //     const data = {
    //         id,
    //         title,
    //         description,
    //         status,
    //         due,
    //         createdAt,
    //         updatedAt
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
                                  defaultValue={task.due.toDateString()}>
                                </input>
                            </Table.RowHeaderCell>
                            {/* <Table.Cell className='columns'>
                                <input type="radio" name="radio">OPEN</input>
                                <input type="radio" name="radio">IN PROGRESS</input>
                                <input type="radio" name="radio">CLOSED</input>
                            </Table.Cell> */}
                            {/* <Table.RowHeaderCell>{task.due.toDateString()}</Table.RowHeaderCell> */}
                            <Table.Cell>
                                <input
                                    type="text"
                                    id="status"
                                    defaultValue={task.status}>
                                </input>
                            </Table.Cell>
                            <Table.Cell>
                                <input
                                    type="text"
                                    id="title"
                                    defaultValue={task.title}>
                                </input>
                            </Table.Cell>
                            <Table.Cell>
                                <input
                                    type="text"
                                    id="description"
                                    defaultValue={task.description}>
                                </input>
                            </Table.Cell>
                            <Table.Cell>
                                <Flex gap="2">
                                    <Button 
                                      className='w-1/2'>
                                        Save
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
