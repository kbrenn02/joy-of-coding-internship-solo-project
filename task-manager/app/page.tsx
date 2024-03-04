// HomePage
// When trying to deploy on Vercel, it either would fail at the initial build or it would build and display a 404 error
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
    const [filterList, setFilterList] = useState<TaskForm[]>([])

    // Get the list of tasks from the database to work with for displaying the next due task
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

    // Sort the list of tasks in ascending ordering, so the next due task is the first element in the array
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

    // Update the homepage "Next Due Task" every time the page is refreshed/the task list in the database is updated
    // This function takes the reordered list (see Sort function above) and filters it for only OPEN and IN_PROGRESS tasks
    useEffect(() => {
        let nextTask = []
        function displayNextTask(task: any) {
        if (task.status === "OPEN" || task.status === "IN_PROGRESS") {
            nextTask.push(task);
            return true
        }
    }
        setFilterList(tasks.filter(displayNextTask))
    }, [tasks]);

    // Because I sorted and filtered the list, the first element in the array is the next OPEN/IN_PROGRESS task, 
    // therefore, I can just call the first element as my variables to display

    return (
        <div className="h-screen">
            <div className="flex justify-center h-16 text-3xl font-extrabold">Welcome to your Task Manager</div>
            <Flex gap="2" className="w-full h-full">
                <div className="bg-cyan-100 w-1/2 h-1/2 p-4 border border-gray-light rounded-xl shadow">
                    <DataChart />
                </div>
                <div className="w-1/2 h-full p-4 border border-gray-light rounded-xl shadow">
                    {filterList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Due Date</h3>
                                    <h5>{new Date(filterList[0].due).toDateString()}</h5>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="text-xl font-bold mb-1">Status</h3>
                                    <h5 className="text-xl tracking-widest font-bold text-violet-800">{filterList[0].status}</h5>
                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div>
                                    <h3 className="mb-2 text-xl font-bold">Task</h3>
                                    <h5>{filterList[0].title}</h5>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="mb-2 text-xl font-bold">Task Description</h3>
                                    <h5>{filterList[0].description}</h5>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Due Date</h3>
                                    <h5  className="italic">updating...</h5>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="text-xl font-bold mb-1">Status</h3>
                                    <h5 className="italic">updating...</h5>
                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div>
                                    <h3 className="mb-2 text-xl font-bold">Task</h3>
                                    <h5 className="italic">updating...</h5>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="mb-2 text-xl font-bold">Task Description</h3>
                                    <h5 className="italic">updating...</h5>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Flex>       
        </div>
    );
}
