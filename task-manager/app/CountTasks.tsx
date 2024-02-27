import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountTasks = () => {

    const [ itemCount, setItemCount] = useState(0);

    useEffect (() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('/api/tasks');
                const items = response.data

                const countResponse = await axios.post('/api/count', {
                    where: {
                        status: 'OPEN'
                    }
                });

                const count = countResponse.data.count;

                setItemCount(count);
            }

            catch(error) {
                console.error("There was an error: ", error)
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            <p>Number of Open items: {itemCount}</p>
        </div>
    )
}

export default CountTasks