'use client';

import React, { useState, useEffect, ChangeEventHandler } from 'react'
import { Button, Table, Flex, TableBody } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import axios from 'axios';
import { EnumValues, object } from 'zod';
import TaskRow from './taskRow';


const EditPage = () => {
    
    interface TaskForm {
        id: number;
        title: string;
        description: string;
        due: Date;
        status: EnumValues;
    }
 
    const [tasks, setTasks] = useState<TaskForm[]>([])
    const [filteredTask, setFilteredTasks] = useState<TaskForm[]>([])
    // look up the javascript for how to filter an array
    // then instead of looping through tasks, loop through filtered
    const [isediting, setIsEditing] = useState(false);
    // create useState variables for all inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // useState was having an issue with Date type (due) and Enum type (status)
    // const [due, setDue] = useState('');
    // const [status, setStatus] = useState('');

    //this works to show the data in the table
    useEffect(() => {
        axios.get(`/api/tasks`).then(function(response) {
            setTasks(response.data);
        });
    }, []);

    // console.log(tasks[0])

    

    // this has been moved to the taskRow.tsx doc
    // // i can update title or update title and description, but not description alone
    // const updateTask = async (index: number) => {
	// 	const dbData = await axios.get(`/api/tasks/${tasks[index].id}`)
    //     const task = dbData.data // the task data from the database is now assigned to the const task
        
    //     if (isediting) {
    //         const data = {
    //             title,
    //             description,
    //         }
    //         axios.patch(`/api/tasks/${tasks[index].id}`, data).then(response => console.log("success"))
    //         .catch((error) => console.error("There was an error updating the task", error)
    //         )
    //     }
    //     setIsEditing(!isediting)
    // };

    return (
        <Table.Body>
            {tasks.map((task) => (
                <TaskRow task={task} key={task.id}/>
            ))}
        </Table.Body>
    )
}


export default EditPage
