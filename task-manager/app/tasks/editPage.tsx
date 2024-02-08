'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button } from '@radix-ui/themes';
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
    const [filteredTasks, setFilteredTasks] = useState<TaskForm[]>([])
    // look up the javascript for how to filter an array
    // then instead of looping through tasks, loop through filtered

    //this works to show the data in the table
    useEffect(() => {
        axios.get(`/api/tasks`).then(function(response) {
            setTasks(response.data);
        });
    }, []);

    console.log(typeof(tasks))
    // console.log(typeof(tasks[0].due))
    // console.log(typeof(tasks[0].status))
    // setFilteredTasks(tasks.sort((firstItem, secondItem) => secondItem.id - firstItem.id));
    // console.log("break")
    // console.log(filteredTasks)

    function sortByStatusDes(a: any, b: any) {      
        const A = a.input;
        const B = b.input
        
        let comparison = 0;
        if (A > B) {
          comparison = -1;
        } else if (A < B) {
          comparison = 1;
        }
        
        return comparison;
      }

    function sortByDateAsc(a: any, b: any) {      
        const A = a.input;
        const B = b.input
        
        let comparison = 0;
        if (A > B) {
          comparison = -1;
        } else if (A < B) {
          comparison = 1;
        }
        
        return comparison * -1; 
      }
    
    console.log("filtered")
    console.log(tasks.sort(compare))
               




    return (
        <>
            {/* <button
                onClick={compare()}>
                click
            </button> */}

            <Table.Body>
                {tasks.map((task) => (
                    <TaskRow task={task} key={task.id}/>
                ))}
            </Table.Body>
        </>
    )
}


export default EditPage
