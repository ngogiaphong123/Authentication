import { useState, useEffect } from 'react';
import axios from 'axios';
const baseURL = "http://localhost:8080";
const PrivateScreen = ({ history }) => {
    const [error, setError] = useState('');
    const [privateData, setPrivateData] = useState('');
    useEffect(() => {
        if (!localStorage.getItem('authToken')) history.push('/');
        const fetchPrivateData = async () => {
            const config = {
                header : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${localStorage.getItem('authToken')}`
                }
            }
            try {
                const {data} = await axios.get(`${baseURL}/api/private`, config);
                setPrivateData(data);
            } catch (error) {
                localStorage.removeItem('authToken');
                setError("You are not authorized to view this page.");
            }
        }
        fetchPrivateData();
    },[history]);
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        history.push('/');
    }
    return (
        error ? <span className = "error-message">{error}</span>:
        <>
            <div style = {{background : "green", color : "white"}}> {privateData}</div>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default PrivateScreen