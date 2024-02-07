import React, { useState, useEffect, ChangeEventHandler } from 'react'
import { Button, Table, Flex, TableBody } from '@radix-ui/themes';
import { EnumValues, object } from 'zod';
import axios from 'axios';


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


    return (
        <Table.Row>
            <Table.RowHeaderCell>
                        {/* {currentDate.toDateString()} {task.due.toDateString()} for some reason it works with currentDate but not task.due */}
                        {/* {stringDate} */}
                        {/* {task.due.toDateString()} */}
                { isediting ? 
                <span>
                    <input value={due} type="date" onChange = {(e) => (setDue(e.target.value))}/>
                </span> : <span>{new Date(due).toDateString()}</span>
                }
                        {/* {JSON.stringify(task.due)} find right syntax to make it show the date */}
            </Table.RowHeaderCell>
            <Table.Cell>
                { isediting ? 
                <span>
                    <input value={status} onChange = {(e) => (setStatus(e.target.value))}/>
                </span> : <span>{status}</span>
                }

                        <select id='intensity'
                                onChange = {(e)=>setStatus(e.target.value)}>
                                <option selected>OPEN</option>
                                <option>IN_PROGRESS</option>
                                <option>CLOSED</option>
                            </select>
                            
                            {/* <select id='intensity'
                                onChange = {(e)=>setIntensityType(e.target.value)}>
                                <option selected={intensityType==='effort'}>Effort</option>
                                <option selected={intensityType==='pace'}>Pace</option>
                            </select> */}
            </Table.Cell>
            <Table.Cell>
                        {/* {task.title} */}
                        {/* editing one task at a time and changing just when in editing mode */}
                        {/* changed this from task.title to just title */}
                { isediting ? 
                <span>
                    <input value={title} onChange = {(e) => (setTitle(e.target.value))}/>
                </span> : <span>{title}</span>
                }
            </Table.Cell>
            <Table.Cell>
                        {/* Issue is that I want to set the value to task.title, but if I set it to just title, then
                        it makes the same title for all rows, instead of changing the title depending on the task */}
            { isediting ? 
                <span>
                    <input value={description} onChange = {(e) => (setDescription(e.target.value))}/>
                </span> : <span>{description}</span>
            }
            </Table.Cell>
            <Table.Cell>
                        <Flex gap="2">
                                <Button 
                                className='w-1/2'
                                onClick={() => updateTask()}>
                                    Edit
                                </Button>
                                <Button 
                                className='w-1/2' 
                                color="red">
                                {/* onClick={() => removeTask(index)}> */}
                                    Delete
                                </Button>
                                <Button 
                                className='w-1/2'
                                onClick={() => saveTask()}>
                                    Save
                                </Button>
                           </Flex>
                       </Table.Cell>
                </Table.Row>
  )
}

export default TaskRow