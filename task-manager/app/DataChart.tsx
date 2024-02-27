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


const DataChart = async() => {

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

    useEffect(() => {
        if (data.length > 0) {

            const ctx = document.getElementById('myChart') as HTMLCanvasElement;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Open", "In Progress", "Closed"],
                    datasets: [{
                        data: [1, 2, 3]
                        // FIGURE OUT HOW TO ADD THE COUNT OF EACH TASK TYPE TO THE LABEL
                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        // borderColor: 'rgba(75, 192, 192, 1)',
                        // borderWidth: 1
                    }]
                }
            });
        }
    }, [data]);


    return (
        <div>
            <canvas id="myChart" width="100" height="100"></canvas>
        </div>
    )
}

export default DataChart;