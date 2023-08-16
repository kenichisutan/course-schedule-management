import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {timetableDataFall} from "../data/TimetableDataFall";

const Courses = () => {
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        retrieveUsers();
    }, [])

    return(
        <>
            <div className="text-center">
                <h2>Users</h2>
                <div className="col text-end">
                    <Link to={`/manage/`}><span className="badge bg-primary">Back</span></Link>
                </div>
                <hr />
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
            </div>
        </>
    )
}

export default Courses;