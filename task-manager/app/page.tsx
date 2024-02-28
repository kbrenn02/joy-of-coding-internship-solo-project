// HomePage
'use client';

import { Flex } from "@radix-ui/themes";
import axios from 'axios';
import { EnumValues } from 'zod';
import React, { useState, useEffect } from 'react';
import DataChart from "./DataChart";

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
        const getTasks = async() => {
            try {
                axios.get(`/api/tasks`).then(function(response) {
                    setTasks(response.data);
                });
            }
            catch (error){
                console.error("Error fetching data:", error);
            }
        };

        getTasks();
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
        tasks.sort(sortByDateAsc);};

    listOfTasks();
    console.log(tasks);

    let nextTask = []
    function displayNextTask(task: any) {
        if (task.status === "OPEN" || task.status === "IN_PROGRESS") {
            nextTask.push(task);
            return true
        }
    }
    
    const filterList = tasks.filter(displayNextTask)
    console.log(filterList)
    console.log(filterList[0])

    

    return (
        <div className="h-screen">
        {/* Need to center the title "welcome to task manager" */}
            <div className="flex justify-center h-16 text-3xl font-extrabold">Welcome to your Task Manager</div>
            <Flex gap="2" className="w-full h-full">
                <div className="bg-white w-1/2 h-1/2 p-4 border border-gray-light rounded-xl shadow">
                    <DataChart />
                </div>
                <div className="bg-orange-400 w-1/2 h-full p-4 border border-gray-light rounded-xl shadow">
                    {/* getting an "Unhandled Runtime Error" after making an update to the tasks on the table*/}
                    {/* 2/26: getting an "Unhandled Runtime Error" and now it doesn't show anything from the task*/}
                    <div>{new Date(filterList[0].due).toDateString()}</div>
                    <div>{filterList[0].title}</div>
                    <div>{filterList[0].description}</div>
                    <div>{filterList[0].status}</div>
                    Placeholder
                </div>
            </Flex>       
        </div>
    );
}
