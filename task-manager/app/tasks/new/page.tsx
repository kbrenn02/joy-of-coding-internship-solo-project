'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

interface TaskForm {
    title: string;
    description: string;
    due: Date;
}


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewTaskPage = () => {
    const router = useRouter();

    /* issue: I can get the date but because the Calendar is an imported component, it can't follow the 
        instructions from the video to push the data to the database. If I have this data, how would I push this
        or should I give up and just make it a string object
    */
    const [dueDate, onChange] = useState<Value>(new Date());
    console.log(dueDate)

    const {register, control, handleSubmit} = useForm<TaskForm>();

    return (
        <form 
            className='max-w-xl space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/tasks', data);
                router.push('/tasks')
            })}>
            
            {/* Title input */}
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')}>

                </TextField.Input>
            </TextField.Root>

            {/* Description input */}
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
            />
            

            {/* Due date input */}
            <h2 className='font-bold underline underline-offset-2'>Select a due date for this task</h2>
            <Calendar onChange={onChange} value={dueDate}/> 
            
            <Button>Submit New Task</Button>
        </form>
    )
}

export default NewTaskPage