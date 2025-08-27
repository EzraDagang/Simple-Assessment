import { useEffect, useState } from 'react'

function Testing() {

    const [datas, setData] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await fetch("http://localhost:5000/hello");
                const data = await res.json();
                setMessage(data.message);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchMessage();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5000/users");
                const dataFetched = await res.json();
                setData(dataFetched); // assuming you have a state variable `data`
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Frontend + Backend Test</h1>
            <h2>{message}</h2>
            <ul>
                {datas.map(data => (
                    <li key={data.id}>
                        {data.name} - {data.email}
                    </li>
            ))}
            </ul>
        </div>
    )
}

export default Testing;