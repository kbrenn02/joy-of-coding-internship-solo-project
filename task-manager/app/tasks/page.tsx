'use client';
/* currently getting circular errors. If I don't have "use client", I get the following error
        "You're importing a component that needs useState. It only works in a Client Component, 
        but none of its parents are marked with "use client", so they're Server Components by default."
    but if I do have "use client", I get:
        "Error: async/await is not yet supported in Client Components, only Server Components. This error 
        is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
*/

import React, { useState, useEffect } from 'react';
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import EditPage from './editPage';


const TasksPage = () => {
    
    const [inputs, setInputs] = useState('');


    return (
        <>
            {/* <div className='ml-4'>
                <Button><Link href='/tasks/new'>New Task</Link></Button>
            </div> */}

            <Flex gap="3">
                    <Button 
                    className='ml-4'>
                        <Link href='/tasks/new'>New Task</Link>
                    </Button>
                    <select
                        defaultValue={"Filter"}
                        onChange = {(e)=>setInputs(e.target.value)}>
                        <option>Filter</option>
                        <option>due</option>
                        <option>status</option>
                    </select>
            </Flex>

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

                <EditPage input={inputs}/>  
            </Table.Root>
            
        </>
    )
}

export default TasksPage
