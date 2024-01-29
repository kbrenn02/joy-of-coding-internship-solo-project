import React from 'react'

const dataTable = () => {
    const express = require('express'); 
    const mysql = require('mysql'); 
    const app = express(); 
     
    const connection = mysql.createConnection({ 
      host: 'localhost', 
      user: 'root', 
      password: 'password', 
      database: 'mydatabase' 
    }); 
     
    app.get('/api/data', (req, res) => { 
      const sql = 'SELECT * FROM mytable'; 
      connection.query(sql, (error, results) => { 
        if (error) throw error; 
        res.send(results); 
      }); 
    }); 
     
    app.listen(3001, () => { 
      console.log('Server running on port 3001'); 
    }); 
  
  
    return (
        <div>dataTable</div>
    )
}

export default dataTable