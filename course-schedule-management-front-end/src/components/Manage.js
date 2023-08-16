import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";

const Manage = () => {
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
        return () => {
        };
    }, []);

    return(
        <>
            <div className="text-center">
                <h2>Manage Users</h2>
                <hr />
                {/* if admin is true, display the following */}
                {admin ? (
                    <>
                        <h3>Manage</h3>
                        <hr />
                        <Link
                            to="/manage/users"
                            className="list-group-item list-group-item-action"
                        >
                            View users
                        </Link>
                    </>
                ) : (
                    <>
                        <h3>Not authorized</h3>
                        <hr />
                    </>
                )}
            </div>
        </>
    )
}

export default Manage;