// HomePage
'use client';

import { Flex } from "@radix-ui/themes";
import axios from 'axios';
import { EnumValues } from 'zod';
import React, { useState, useEffect } from 'react';

interface TaskForm {
    id: number;
    title: string;
    description: string;
    due: Date;
    status: EnumValues;
}

export default function Home() {

    const [tasks, setTasks] = useState<TaskForm[]>([])

    useEffect(() => {
        axios.get(`/api/tasks`).then(function(response) {
            setTasks(response.data);
        });
    }, []);

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

    const listOfTasks = () => {
        tasks.sort(sortByDateAsc);}

    console.log(tasks[0])

    return (
        <div className="h-screen">
        {/* Need to center the title "welcome to task manager" */}
            <div className="flex justify-center h-16 text-3xl font-extrabold">Welcome to the Task Manager</div>
            <Flex gap="2" className="w-full h-full">
                <div className="bg-red-400 w-1/2 h-full border border-gray-light rounded-xl shadow">
                    Div 1
                </div>
                <div className="bg-orange-400 w-1/2 h-full border border-gray-light rounded-xl shadow">
                    Div 2
                </div>
            </Flex>       
        </div>
    );
}
