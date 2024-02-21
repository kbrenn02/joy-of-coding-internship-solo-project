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
    const [open, setOpen] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [closed, setClosed] = useState(0);

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

    // useEffect(() => {
        if (data.length > 0) {
            const statuses = data.map((task) => task.status.toString())

            let i=0;
            while (i<statuses.length) {
                if (statuses[i] == "OPEN") {
                    setOpen(open+1);
                } else if (statuses[i] == "IN_PROGRESS") {
                    setInProgress(inProgress+1);
                } else if (statuses[i] == "CLOSED") {
                    setClosed(closed+1)
                }
                i++;
                console.log("current i value", i)
            }

            console.log("status1", statuses)
        }
    // }, [data]);

    console.log("open1", open)
    console.log(inProgress)
    console.log(closed)

    useEffect(() => {
        if (data.length > 0) {
            // const ids = data.map((task) => task.id);
            // const statuses = data.map((task) => task.status.toString())

            // for (let i=0; i<statuses.length; i++) {
            //     if (statuses[i] == "OPEN") {
            //         setOpen(open+1);
            //     } else if (statuses[i] == "IN_PROGRESS") {
            //         setInProgress(inProgress+1);
            //     } else if (statuses[i] == "CLOSED") {
            //         setClosed(closed+1)
            //     }
            // }

            console.log("open2", open)
            console.log(inProgress)
            console.log(closed)

            const ctx = document.getElementById('myChart') as HTMLCanvasElement;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Open", "In Progress", "Closed"],
                    datasets: [{
                        data: [open, inProgress, closed]
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