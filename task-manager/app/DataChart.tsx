import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { EnumValues } from 'zod';

interface TaskForm {
    id: number;
    title: string;
    description: string;
    due: Date;
    status: EnumValues;
}


const DataChart = () => {

    const [tasks, setTasks] = useState<TaskForm[]>([]);

    // Had to reuse this function on multiple pages to get the list of tasks from the DB to manipulate on each page
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

    // Create variables to edit the count of. These variables are the ones input in the data chart
    let openCount = 0
    let inProgressCount = 0
    let closedCount = 0

    // Loop through the list of tasks and count each task that falls into each category
    function filterByStatus(task: any) {
        if (Number.isFinite(task.id) && task.status === "OPEN"){
            openCount++;
            return true
        } else if (Number.isFinite(task.id) && task.status === "IN_PROGRESS"){
            inProgressCount++;
            return true
        } else if (Number.isFinite(task.id) && task.status === "CLOSED") {
            closedCount++;
            return true
        }
    }

    tasks.filter(filterByStatus);

    // Creating the chart. Start by deleting any previous instances of the chart (this solved a bug that forced me to manually
    // reload the page 4 or 5 times if I wanted to see an updated chart)
    // Then create a new chart, using the count variables above as the inserted data (to make it dynamic)
    useEffect(() => {
        if (tasks.length > 0) {

            const ctx = document.getElementById('myChart') as HTMLCanvasElement;

            if (ctx instanceof HTMLCanvasElement) {
                const ctx1 = ctx.getContext('2d');

                if (ctx1) {
                    const existingChart = Chart.getChart(ctx1);

                    // If an existing chart instance is found, destroy it
                    if (existingChart) {
                        existingChart.destroy();
                    }
                }
            }

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Open", "In Progress", "Closed"],
                    datasets: [{
                        data: [openCount, inProgressCount, closedCount],
                        backgroundColor: ['rgb(34 197 94)', 'rgb(56 189 248)', 'rgb(252 165 165)'],
                        borderColor: 'rgb(156 163 175)',
                        borderWidth: 1
                    }]
                }
            });
        }
    }, [tasks]);

    return (
        <div className='w-full h-full flex justify-center'>
            <canvas id="myChart" className='w-1/2 h-1/2 flex justify-center'></canvas>
        </div>
    )
}

export default DataChart;