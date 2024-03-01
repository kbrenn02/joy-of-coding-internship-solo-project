import React, { useState } from 'react'
import { Button, Table, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const TaskRow = (task: any) => {

    // useState variables for each title in the database so that I can update them with the user's edited input
    const [isediting, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.task.title);
    const [description, setDescription] = useState(task.task.description);
    const [due, setDue] = useState(task.task.due);
    const [status, setStatus] = useState(task.task.status);
    
    
    const updateTask = async () => {
        setIsEditing(!isediting)
    };

    // Date is automatically in GMT -- switch to local time before pushing. Convert PST to GMT then push (so 12am PST, submit 8am GMT)
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


    // Effective delete function. I was having issues with the refresh, so I send the user to the homepage after deleting a task
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
                {/* Date */}
                { isediting ? 
                <span>
                    <input value={due} type="date" onChange = {(e) => (setDue(e.target.value))}/>
                    <p>Current Due: {new Date(due).toDateString()}</p>
                </span> : <span>{new Date(due).toDateString()}</span>
                }
            </Table.RowHeaderCell>
            <Table.Cell>
                {/* Status */}
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
                {/* Title of task */}
                { isediting ? 
                <span>
                    <input value={title} onChange = {(e) => (setTitle(e.target.value))}/>
                </span> : <span>{title}</span>
                }
            </Table.Cell>
            <Table.Cell>
                {/* Description of task */}
                { isediting ? 
                    <span className='w-16'>
                        <input className='w-full' value={description} onChange = {(e) => (setDescription(e.target.value))}/>
                    </span> : <span className='w-16'>{description}</span>
                }
            </Table.Cell>
            <Table.Cell>
                {/* Buttons to Edit / Delete / Save */}
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