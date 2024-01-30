import React, { useState, useEffect} from 'react'
import { Table } from '@radix-ui/themes';
import axios from 'axios';
import prisma from '@/prisma/client';

// to fix this whole page, just wanted to have outline present

const dataTable = async () => {
    // const express = require('express'); 
    // const mysql = require('mysql'); 
    // const app = express(); 
     
    // const connection = mysql.createConnection({ 
    //   host: 'localhost', 
    //   user: 'root', 
    //   password: 'Kevin176-434-100-08', 
    //   database: 'task-manager' 
    // }); 
     
    // app.get('/api/tasks', (req, res) => { 
    //   const sql = 'SELECT * FROM mytable'; 
    //   connection.query(sql, (error, results, fields) => { 
    //     if (error) throw error; 
    //     res.send(results); 
    //   }); 
    // }); 
     
    // app.listen(3001, () => { 
    //   console.log('Server running on port 3001'); 
    // }); 
  
  
    // const [data, setData] = useState([]); 
 
    // useEffect(() => { 
    //     fetch('/api/tasks') 
    //     .then(response => response.json()) 
    //     .then(data => setData(data)); 
    // }, []); 
    
    // const dataD = axios.get('/api/tasks');
    // console.log(dataD)

    const tasks = await prisma.task.findMany()
    console.log(tasks)
    console.log("hello world")

    return ( 
        <Table.Body>
            {/* {dataD.map(() =>
                <Table.Row>
                    <Table.RowHeaderCell>{data.due}</Table.RowHeaderCell>
                    <Table.Cell>{data.status}</Table.Cell>
                    <Table.Cell>{data.title}</Table.Cell>
                    <Table.Cell>{data.description}</Table.Cell>
                </Table.Row>
            )} */}
        </Table.Body> 
    ); 
}

export default dataTable