import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Courses = () => {
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(false);

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

    useEffect(() => {
        handleAdminCheck();
        retrieveUsers();
        return () => {
        };
    }, []);

    const retrieveUsers = async () => {
        // build the request payload
        const requestOptions = {
            method: 'GET',
            credentials: 'include', // Solve CORS issue
        };

        const backendUrl = 'http://localhost:5000';
        const usersUrl = `${backendUrl}/users`;

        try {
            const response = await fetch(usersUrl, requestOptions)

            const data = await response.json();

            if (response.ok) {
                const usersArray = Object.values(data);
                console.log(data)
                setUsers(data);
            } else {
                console.log("Error in response");
            }
        } catch (error) {
            console.log("Error retrieving users")
        }
    }

    return(
        <>
            <div className="text-center">
                <h2>Users</h2>
                <div className="col text-end">
                    <Link to={`/manage/`}><span className="badge bg-primary">Back</span></Link>
                </div>
                <hr />
                {/* if admin is true, display the following */}
                {admin ? (
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Account Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map( (user) =>
                        <tr key={user.id}>
                            <td>{user.userID}</td>
                            <td>
                                <Link to={`/manage/user/${user.userID}`}>{user.username}</Link>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.accountType}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                ) : (
                    <div className="text-center">
                        <h2>Unauthorized</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default Courses;