'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TaskForm {
    title: string;
    description: string;
    due: Date;
}

type FormValues = {
    due: Date;
}

const NewTaskPage = () => {
    const router = useRouter();

    const {register, control, handleSubmit} = useForm<TaskForm>();
    const form = useForm<FormValues>({
        defaultValues: {
            due: new Date(),
        }
    })

    return (
        <form 
            className='max-w-xl space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/tasks', data);
                router.push('/tasks');
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
            <div className='m-4'>
                <label className='p-4 font-bold italic' htmlFor='due'>Select a due date for this task</label>
                <input 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="date"
                  id="due"
                  {...register('due', {
                    valueAsDate: true,
                    required: {
                        value: true,
                        message: "A due date for this task is required."
                    },
                  })}
                />
            </div>
            
            <Button>Submit New Task</Button>
        </form>
    )
}

export default NewTaskPage