import React, { useState, useEffect} from 'react'

// to fix this whole page, just wanted to have outline present


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
  
  
    const [data, setData] = useState([]); 
 
    useEffect(() => { 
        fetch('/api/data') 
        .then(response => response.json()) 
        .then(data => setData(data)); 
    }, []); 
    
    return ( 
        <div> 
        {data.map(item => ( 
            <div key={item.id}> 
            <h2>{item.title}</h2> 
            <p>{item.description}</p> 
            </div> 
        ))} 
        </div> 
    ); 
}

export default dataTable