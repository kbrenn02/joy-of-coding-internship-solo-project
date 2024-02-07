import React, { useState, useEffect, ChangeEventHandler } from 'react'
import { Button, Table, Flex, TableBody } from '@radix-ui/themes';
import { EnumValues, object } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface TaskForm {
    id: number;
    title: string;
    description: string;
    due: Date;
    status: EnumValues;
}

const TaskRow = (task: any) => {

    const [isediting, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.task.title);
    const [description, setDescription] = useState(task.task.description);
    const [due, setDue] = useState(task.task.due);
    const [status, setStatus] = useState(task.task.status);
    
    
    const updateTask = async () => {
        setIsEditing(!isediting)
    };

    // date is automatically in GMT -- switch to local time before pushing. Convert PST to GMT then push (so 12am PST, submit 8am GMT)
    // drop down with only enum values for status
    const saveTask = async () => {
        if (isediting) {
            const data = {
                title,
                description,
                status,
                due
            }
            console.log(data)
            axios.patch(`/api/tasks/${task.task.id}`, data).then(response => console.log("success"))
            .catch((error) => console.error("There was an error updating the task", error)
            )
        }
        setIsEditing(!isediting)
    }


    // this works as a delete function. Was having issues with the refresh, so I had it send the user to the homepage
    // after deleting a task
    const router = useRouter();
    const removeTask = async () => {
		try {
			await axios.delete(`/api/tasks/${task.task.id}`);
			router.refresh();
            router.push('/');
		} catch (error) {
			console.error('The following error occurred:', error);
		}
	};


    return (
        <Table.Row>
            <Table.RowHeaderCell>
                        {/* {currentDate.toDateString()} {task.due.toDateString()} for some reason it works with currentDate but not task.due */}
                        {/* {stringDate} */}
                        {/* {task.due.toDateString()} */}
                { isediting ? 
                <span>
                    <input value={due} type="date" onChange = {(e) => (setDue(e.target.value))}/>
                    <p>Current Due: {new Date(due).toDateString()}</p>
                </span> : <span>{new Date(due).toDateString()}</span>
                }
                        {/* {JSON.stringify(task.due)} find right syntax to make it show the date */}
            </Table.RowHeaderCell>
            <Table.Cell>
                { isediting ? 
                <select
                    value={status}
                    onChange = {(e)=>setStatus(e.target.value)}>
                    <option>OPEN</option>
                    <option>IN_PROGRESS</option>
                    <option>CLOSED</option>
                </select>
                : <span>{status}</span>
                }
            </Table.Cell>
            <Table.Cell>
                { isediting ? 
                <span>
                    <input value={title} onChange = {(e) => (setTitle(e.target.value))}/>
                </span> : <span>{title}</span>
                }
            </Table.Cell>
            <Table.Cell>
                { isediting ? 
                    <span className='w-16'>
                        <input className='w-full' value={description} onChange = {(e) => (setDescription(e.target.value))}/>
                    </span> : <span className='w-16'>{description}</span>
                }
            </Table.Cell>
            <Table.Cell>
                <Flex gap="3">
                    <Button 
                    className='w-1/2'
                    onClick={() => updateTask()}>
                        Edit
                    </Button>
                    <Button 
                    className='w-1/2' 
                    color="red"
                    onClick={() => removeTask()}>
                        Delete
                    </Button>
                    <Button 
                    className='w-1/2'
                    color="green"
                    onClick={() => saveTask()}>
                        Save
                    </Button>
                </Flex>
            </Table.Cell>
        </Table.Row>
    )
}

export default TaskRow