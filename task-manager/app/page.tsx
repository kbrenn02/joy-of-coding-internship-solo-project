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
        tasks.sort(sortByDateAsc);};

    listOfTasks();
    console.log(tasks)

    let openCount = 0
    let notOpen = 0

    function filterByStatus(task: any) {
        if (Number.isFinite(task.id) && task.title === "Task 2"){
            openCount++;
            return true
        } else {
            notOpen++;
            return false
        }
    }

    const tasksByID = tasks.filter(filterByStatus);
    console.log(tasksByID)
    console.log(typeof(tasks))
    
    console.log(tasks.filter(filterByStatus))
    

    const arr = [
        { id: 15, pop: "hello" },
        { id: -1, pop: "bye" },
        { id: 0, pop: "hi" },
        { id: 3, pop: "hey" },
        { id: 12.2, pop: "he" },
        {},
        { id: null },
        { id: NaN },
        { id: "undefined" },
      ];

      console.log(arr)
      console.log(typeof(arr))
      
      let invalidEntries = 0;
      
      function filterByID(item:any) {
        if (Number.isFinite(item.id) && item.id !== 0 && item.pop === "hey") {
          return true;
        }
        invalidEntries++;
        return false;
      }
      
      const arrByID = arr.filter(filterByID);
      console.log(arrByID)

    return (
        <div className="h-screen">
        {/* Need to center the title "welcome to task manager" */}
            <div className="flex justify-center h-16 text-3xl font-extrabold">Welcome to your Task Manager</div>
            <Flex gap="2" className="w-full h-full">
                <div className="bg-white w-1/2 h-full p-4 border border-gray-light rounded-xl shadow">
                    <DataChart />
                </div>
                <div className="bg-orange-400 w-1/2 h-full p-4 border border-gray-light rounded-xl shadow">
                    {/* getting an "Unhandled Runtime Error" after making an update to the tasks on the table*/}
                    {/* 2/26: getting an "Unhandled Runtime Error" and now it doesn't show anything from the task*/}
                    {/* <div>{new Date(tasks[0].due).toDateString()}</div>
                    <div>{tasks[0].title}</div>
                    <div>{tasks[0].description}</div>
                    <div>{tasks[0].status}</div> */}
                    Placeholder
                </div>
            </Flex>       
        </div>
    );
}
