'use client';

import React, { useState, useEffect, ChangeEventHandler } from 'react'
import { Button, Table, Flex, TableBody } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import axios from 'axios';
import { EnumValues, object } from 'zod';

const EditPage = () => {
    
    interface TaskForm {
        id: number;
        title: string;
        description: string;
        due: Date;
        status: EnumValues;
    }
 
    const [tasks, setTasks] = useState<TaskForm[]>([])
    const [isediting, setIsEditing] = useState(false);

    //this works to show the data in the table (but it's unstructured)
    useEffect(() => {
        axios.get(`/api/tasks`).then(function(response) {
            setTasks(response.data);
        });
    }, []);

    const currentDate = new Date();
    console.log(tasks[0])

    const removeTask = async (index: number) => {
		try {
			await axios.delete(`/api/tasks/${tasks[index].id}`);
			const newTasks = [...tasks];
			newTasks.splice(index, 1);
			setTasks(newTasks);
		} catch (error) {
			console.error('did not work:', error);
		}
	};

    // const updateTask = async (index: number) => {
	// 	if (isediting) {
    //         const data = {
    //             title,
    //             description,
    //             due,
    //             status
    //         }
    //         axios.patch(`/api/tasks/${tasks[index].id}`, data).then(response => console.log("success"))
    //         .catch((error) => console.error("There was an error updating the task", error)
    //         )
    //     }
        
    //     setIsEditing(!isediting)
    // };

    const EditField = ({value, fieldType, handleChange}:{value : any, fieldType : any, handleChange : ChangeEventHandler<HTMLInputElement>}) => {
        return (
            <input
              id="status"
              type = {fieldType}
              onChange={handleChange}
              defaultValue={value}>
            </input>
        )
    }

/*
    const handleChange = (event:any) => {
        data.status = event;
        console.log(data)
    }
    //  <EditField value={task.status} fieldType="string" handleChange={handleChange}/>
*/

    return (
        <Table.Body>
            {tasks.map((task, index) => (
                <Table.Row key={index}>
                    <Table.RowHeaderCell>
                        {currentDate.toDateString()} {/* {task.due.toDateString()} for some reason it works with currentDate but not task.due*/}
                    </Table.RowHeaderCell>
                    <Table.Cell>
                        {task.status}
                        {index} {/* Will need to remove this */}
                    </Table.Cell>
                    <Table.Cell>
                        {task.title}
                    </Table.Cell>
                    <Table.Cell>
                        {task.description}
                    </Table.Cell>
                    <Table.Cell>
                        <Flex gap="2">
                                <Button 
                                className='w-1/2'>
                                {/* onClick={() => updateTask(index)}> */}
                                    { isediting ? "Save" : "Edit"}
                                </Button>
                                <Button 
                                className='w-1/2' 
                                color="red"
                                onClick={() => removeTask(index)}>
                                    Delete
                                </Button>
                           </Flex>
                       </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    )
        }




//     return (
//         <>
//             <div className='ml-4'>
//                 <Button><Link href='/tasks/new'>New Task</Link></Button>
//             </div>

//             <Table.Root className='mt-4'>

//                 {/* tasks.map(task) is a function that goes through every line of data. Task.XXX calls the data
//                 with that specific header. This function has an issue showing date types, so task.due.toDateString() 
//                 is needed to turn the date type to a string type*/}
//                 <Table.Body>
//                     {tasks.map((task) =>
//                         <Table.Row>
//                             <Table.RowHeaderCell>
//                                 <input
//                                   type="date"
//                                   id="due"
//                                   defaultValue={task.due.toDateString()}>
//                                 </input>
//                             </Table.RowHeaderCell>
//                             {/* <Table.Cell className='columns'>
//                                 <input type="radio" name="radio">OPEN</input>
//                                 <input type="radio" name="radio">IN PROGRESS</input>
//                                 <input type="radio" name="radio">CLOSED</input>
//                             </Table.Cell> */}
//                             {/* <Table.RowHeaderCell>{task.due.toDateString()}</Table.RowHeaderCell> */}
//                             <Table.Cell>
//                                 <input
//                                     type="text"
//                                     id="status"
//                                     defaultValue={task.status}>
//                                 </input>
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <input
//                                     type="text"
//                                     id="title"
//                                     defaultValue={task.title}>
//                                 </input>
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <input
//                                     type="text"
//                                     id="description"
//                                     defaultValue={task.description}>
//                                 </input>
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <Flex gap="2">
//                                     <Button 
//                                       className='w-1/2'>
//                                         Save
//                                     </Button>
//                                     <Button className='w-1/2' color="red">
//                                         Delete
//                                     </Button>
//                                 </Flex>
//                             </Table.Cell>
//                         </Table.Row>
//                     )}
//                 </Table.Body>
//             </Table.Root>

//         </>
//     )
// }


export default EditPage
