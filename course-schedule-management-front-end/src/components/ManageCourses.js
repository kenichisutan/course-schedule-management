import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ManageCourses = () => {
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

    return (
        <>
            <div className="text-center">
                <h2>Manage Courses</h2>
                <div className="col text-end">
                    <Link to={`/manage/`}><span className="badge bg-primary">Back</span></Link>
                </div>
                <hr />
                {/* if admin is true, display the following */}
                {admin ? (
                    <>
                    </>
                ) : (
                    <div className="text-center">
                        <h2>Unauthorized</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default ManageCourses;