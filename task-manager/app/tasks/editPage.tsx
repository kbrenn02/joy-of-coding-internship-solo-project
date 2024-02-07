'use client';

import React, { useState, useEffect } from 'react';
import { Table } from '@radix-ui/themes';
import axios from 'axios';
import { EnumValues } from 'zod';
import TaskRow from './taskRow';

    
interface TaskForm {
    id: number;
    title: string;
    description: string;
    due: Date;
    status: EnumValues;
}


const EditPage = () => {
 
    const [tasks, setTasks] = useState<TaskForm[]>([])
    const [filteredTask, setFilteredTasks] = useState<TaskForm[]>([])
    // look up the javascript for how to filter an array
    // then instead of looping through tasks, loop through filtered

    //this works to show the data in the table
    useEffect(() => {
        axios.get(`/api/tasks`).then(function(response) {
            setTasks(response.data);
        });
    }, []);

    return (
        <Table.Body>
            {tasks.map((task) => (
                <TaskRow task={task} key={task.id}/>
            ))}
        </Table.Body>
    )
}


export default EditPage
