'use client';

import React, { useState, useEffect, ChangeEventHandler } from 'react'
import { Button, Table, Flex, TableBody } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import EditTask from './editTask';
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

    // had to look at prisma documentation to get this "findMany()." Refer there for other features
    // tasks is a variable that contains all the data in the table. See note below for tasks.map
 // this works to print the results in the console but I can't use it   
    const [tasks, setTasks] = useState<TaskForm[]>([])
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
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

    const updateTask = async (index: number) => {
		if (isediting) {
            const data = {
                title,
                description,
                due,
                status
            }
            axios.patch(`/api/tasks/${tasks[index].id}`, data).then(response => console.log("success"))
            .catch((error) => console.error("There was an error updating the task", error)
            )
        }
        
        setIsEditing(!isediting)
    };

    // const data = {
    //             id: 5,
    //             title : "test 4",
    //             description : "pls work as a patch",
    //             status : "IN_PROGRESS",
    //             due : "2024-02-25 07:32:17.743",
    //             createdAt : Date.now(),
    //             updatedAt : Date.now()
    //         }

    var idToDelete = 5

    axios.delete(`/api/tasks',${idToDelete}`)
      .then(response => {
        console.log(`Deleted post with ID ${idToDelete}`);
      })
      .catch(error => {
        console.error(error);
      });

    var value = "string"

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



    function handleEdit() {
        if (editing) {
            const data = {
                id,
                title,
                description,
                status,
                due,
                createdAt,
                updatedAt
            }
            console.log(data, task.id)
            axios.patch(
                `/api/tasks/${task.id}`, data
            )
                .then(
                    response => console.log(response.data)
                )
                .catch((error) => console.error("There was an error updating the round:", error));
        }

        setEditing(!editing)
    }
    */
    // function handleEdit(data) => {
    //     axios.patch('/api/tasks', data)
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });}

      // this works to delete
    // var idToDelete = 5
    // const handleDelete = async(taskID: number) => {
    //     const deleteTask = await prisma.task.delete({
    //         where: {
    //         id: taskID,
    //         },
    //     })}

    // const updateTaskResult = await EditTask(5, "OPEN")
    // console.log(JSON.stringify(updateTaskResult, null, 5))


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

    //  <EditField value={task.status} fieldType="string" handleChange={handleChange}/>

    // return (
    //     <Table.Body>
    //         {tasks.map((task) =>
    //             <Table.Row>
    //                 {/* edit the due date row */}
    //                 <Table.RowHeaderCell>
    //                     {editing ? <input defaultValue={task.due.toDateString()}></input> : <span>{task.due.toDateString()}</span>}
    //                 </Table.RowHeaderCell>
    //                 {/* edit the status row */}
    //                 <Table.Cell>
    //                     {editing ? <input defaultValue={task.status}></input> : <span>{task.status}</span>}
    //                 </Table.Cell>
    //                 {/* edit the title row */}
    //                 <Table.Cell>
    //                     {editing ? <input defaultValue={task.title}></input> : <span>{task.title}</span>}
    //                 </Table.Cell>
    //                 {/* edit the description row */}
    //                 <Table.Cell>
    //                     {editing ? <input className='bg-slate-200 p-1' defaultValue={task.description}></input> : <span>{task.description}</span>}
    //                 </Table.Cell>
    //             </Table.Row>
    //             )}
    //     </Table.Body>
    // )
    return (
        <Table.Body>
            {tasks.map((task, index) => (
                <Table.Row key={index}>
                    <Table.RowHeaderCell>
                        {currentDate.toDateString()} {/* {task.due.toDateString()} for some reason it works with currentDate but not task.due*/}
                    </Table.RowHeaderCell>
                    <Table.Cell>
                        {task.status}
                        {index}
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
                                className='w-1/2'
                                onClick={() => updateTask(index)}>
                                    Edit
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
