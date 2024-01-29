import React, { useState, useEffect } from 'react'
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import axios from 'axios'

const TasksPage = () => {
    // const url = 'mysql://root:Kevin176-434-100-08@localhost:3306/task-manager';
    // const [data, setData] = useState([])

    // const fetchInfo = () => { 
    //     return axios.get(url).then((response) => setData(response.data));
    //   }
      
    //   useEffect(() => { 
    //         fetchInfo(); 
    //   }, [])
    
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

                {/* <Table.Body>
                    {data.map((data) =>
                        <Table.Row>
                            <Table.RowHeaderCell>{data.due}</Table.RowHeaderCell>
                            <Table.Cell>{data.status}</Table.Cell>
                            <Table.Cell>{data.title}</Table.Cell>
                            <Table.Cell>{data.description}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body> */}
            </Table.Root>

        </>
    )
}

export default TasksPage
