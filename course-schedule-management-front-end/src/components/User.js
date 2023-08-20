import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const User = () => {
    const [user, setUser] = useState({});
    let { id } = useParams();

    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleAdminCheck = async () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include', // Solve CORS issue
        };

        const backendUrl = 'http://localhost:5000';
        const adminUrl = `${backendUrl}/admin`;

        try {
            const response = await fetch(adminUrl, requestOptions)

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                setAdmin(data.success);
            } else {
                setAdmin(false);
            }
        } catch (error) {
            setAdmin(false)
        }
    };

    const retrieveUser = async () => {
        // build the request payload
        const payload = {
            id: id
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Solve CORS issue
            body: JSON.stringify(payload)
        };

        const backendUrl = 'http://localhost:5000';
        const usersUrl = `${backendUrl}/user`;

        try {
            const response = await fetch(usersUrl, requestOptions)
            const data = await response.json();

            if (response.ok && Array.isArray(data) && data.length > 0) {
                console.log(data[0]); // Log the received user data
                setUser(data[0]);     // Set the user state
            } else {
                console.log("Data fetch error:", data);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        handleAdminCheck();
        retrieveUser();
    }, [id]);

    // Wait for user data to load before rendering
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setLoading(false);
        }
    }, [user]);

    return(
        <div className="text-center">
            <h2>Users</h2>
            <div className="col text-end">
                <Link to={`/manage/user/${user.userID}/edit`}><span className="badge bg-primary">Edit user</span></Link>
                <Link to={`/manage/users`}><span className="badge bg-primary">Back</span></Link>
            </div>
            <hr />
            {loading ? (
                <div>Loading...</div>
            ) : (
                (admin ? (
                <>
                <div className="text-start">
                    <h2>{user.username}</h2>
                    <small><em>{user.email}, ({user.accountType})</em></small>
                </div>
                </>
                ) : (
                    <div className="text-center">
                        <h2>Unauthorized</h2>
                    </div>
                ))
            )}
        </div>
    )
}

export default User;