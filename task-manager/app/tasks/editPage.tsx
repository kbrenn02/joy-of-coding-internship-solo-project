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


const EditPage = (input: any) => {
 
    const [tasks, setTasks] = useState<TaskForm[]>([])

    //this works to show the data in the table based on id number
    useEffect(() => {
        axios.get(`/api/tasks`).then(function(response) {
            setTasks(response.data);
        });
    }, []);

    
    function sortByStatusDes(a: any, b: any) {      
        const A = a.status;
        const B = b.status;
                
        let comparison = 0;
        if (A > B) {
            comparison = -1;
        } else if (A < B) {
            comparison = 1;
        }
        return comparison;
        }

    function sortByDateAsc(a: any, b: any) {      
        const A = a.due;
        const B = b.due;
                
        let comparison = 0;
        if (A > B) {
            comparison = -1;
        } else if (A < B) {
            comparison = 1;
        }
        return comparison * -1; 
        }
    
    function sortDefault(a: any, b: any) {      
        const A = a.id;
        const B = b.id;
                    
        let comparison = 0;
        if (A > B) {
            comparison = -1;
        } else if (A < B) {
            comparison = 1;
        }
        return comparison * -1; 
        }
    
    
    const listOfTasks = (input: any) => {
        if (input == "due") {
            tasks.sort(sortByDateAsc);
        } else if (input == "status") {
            tasks.sort(sortByStatusDes);
        } else if (input == "Filter") {
            tasks.sort(sortDefault)
        }
    }

    listOfTasks(input.input)

    // the tests I needed to perform to find out what I needed to input into the listOfTasks function. I'm sure there's
    // a better way to write the above code, but what I found works so I'm not complaining
    // // console.log(typeof(input))
    // console.log(input.input)
    // console.log(typeof(input.input))
    // // console.log("filtered")
    // console.log(tasks)
    // // console.log(tasks.sort(compare))
    // // console.log(input)



    return (
        <>
            <Table.Body>
                {tasks.map((task) => (
                    <TaskRow task={task} key={task.id}/>
                ))}
            </Table.Body>
        </>
    )
}


export default EditPage
