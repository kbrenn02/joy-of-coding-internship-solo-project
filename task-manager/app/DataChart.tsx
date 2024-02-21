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

    useEffect(() => {
        if (data.length >0) {
            const ids = data.map((task) => task.id);
            const statuses = data.map((task) => task.status)

            const ctx = document.getElementById('myChart') as HTMLCanvasElement;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ids,
                    datasets: [{
                        label: "Data Category",
                        data: statuses,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
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