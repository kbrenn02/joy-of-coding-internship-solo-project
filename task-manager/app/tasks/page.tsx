import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const TasksPage = () => {
    return (
        <div className='ml-4'>
            <Button><Link href='/tasks/new'>New Task</Link></Button>
        </div>
    )
}

export default TasksPage