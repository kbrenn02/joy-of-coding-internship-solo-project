'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewTaskPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Title'>

            </TextField.Input>
        </TextField.Root>
        <TextField.Input placeholder='Due Date > YYYY-MM-DD'>

        </TextField.Input>
        <TextArea placeholder='Description'>

        </TextArea>
        <Button>Submit New Task</Button>
    </div>
  )
}

export default NewTaskPage