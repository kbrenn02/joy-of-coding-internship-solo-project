'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import EditPage from './editPage';


// This page is the task page that shows the table with all the info in the database
const TasksPage = () => {
    
    const [inputs, setInputs] = useState('');

    return (
        <>
        {/* New Task button and Filtering options */}
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

        {/* Headers for the table. The last header is blank but creates a column for the Edit/Delete/Save buttons to live in */}
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
