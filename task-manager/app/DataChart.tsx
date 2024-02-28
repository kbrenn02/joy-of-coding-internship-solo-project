import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { EnumValues } from 'zod';
import prisma from '@/prisma/client';


interface TaskForm {
    id: number;
    title: string;
    description: string;
    due: Date;
    status: EnumValues;
}


const DataChart = () => {

    const [data, setData] = useState<TaskForm[]>([]);

    useEffect(() => {
        const getData = async() => {
            try {
                axios.get(`/api/tasks`).then(function(response) {
                    setData(response.data);
                });
            }
            catch (error){
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    console.log(data)

    let openCount = 0
    let inProgressCount = 0
    let closedCount = 0

    function filterByStatus(daata: any) {
        if (Number.isFinite(daata.id) && daata.status === "OPEN"){
            openCount++;
            return true
        } else if (Number.isFinite(daata.id) && daata.status === "IN_PROGRESS"){
            inProgressCount++;
            return true
        } else if (Number.isFinite(daata.id) && daata.status === "CLOSED") {
            closedCount++;
            return true
        }
    }

    const tasksByID = data.filter(filterByStatus);
    console.log(tasksByID)
    console.log("Status open", openCount, "Status in progress", inProgressCount, "Status closed", closedCount)


    useEffect(() => {
        if (data.length > 0) {

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
                        data: [openCount, inProgressCount, closedCount]
                        // FIGURE OUT HOW TO ADD THE COUNT OF EACH TASK TYPE TO THE LABEL
                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        // borderColor: 'rgba(75, 192, 192, 1)',
                        // borderWidth: 1
                    }]
                }
            });
        }
    }, [data]);

    // Error: Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID 'myChart' can be reused.
    // I get the above error whenever changes are made to the DB


    return (
        <div>
            <canvas id="myChart" width="100" height="100"></canvas>
        </div>
    )
}

export default DataChart;