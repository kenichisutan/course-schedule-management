import React, {useEffect, useState} from "react";
import {Link, useNavigate, useOutletContext, useParams} from "react-router-dom";
import Input from "./form/Input";
import MultiInput from "./form/MultiInput";

const UserEdit = (props) => {
    const [user, setUser] = useState({});
    let { id } = useParams();

    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");

    const { setAlertClassName } = useOutletContext()
    const { setAlertMessage } = useOutletContext()

    const navigate = useNavigate();

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
                setUsername(data[0].username);
                setPassword(data[0].password);
                setPasswordConfirm(data[0].password);
                setEmail(data[0].email);
                setAccountType(data[0].accountType);
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
            setUsername(user.username);
            setEmail(user.email);
            setAccountType(user.accountType);
            setLoading(false);
        }
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // if any fields are empty, replace with values in user
        if (username === "") {
            setUsername(user.username);
        }
        if (email === "") {
            setEmail(user.email);
        }
        if (accountType === "") {
            setAccountType(user.accountType);
        }

        // build the request payload
        let payload = {
            id: id,
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            email: email,
            accountType: accountType,
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
        const authenticateUrl = `${backendUrl}/user-edit`;

        fetch(authenticateUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    navigate("/manage/user/" + id);
                }
            })
            .catch((error) => {
                setAlertClassName("alert-danger");
                setAlertMessage("Error: " + error);
            })
    }

    const accountTypeOptions = [
        {value: "basic", label: "Basic"},
        {value: "admin", label: "Admin"},
    ];

    return (
        <div className="text-center">
            <h2>Editing user</h2>
            <div className="col text-end">
                <Link to={`/manage/user/${user.userID}`}><span className="badge bg-primary">Back</span></Link>
            </div>
            <hr />
            {loading ? (
                <div>Loading...</div>
            ) : (
                (admin ? (
                    <>
                        <form onSubmit={handleSubmit}>
                        <Input
                            title="Username"
                            type="username"
                            className="form-control"
                            name="username"
                            autoComplete="username-new"
                            placeholder={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <Input
                            title="Password"
                            type="password"
                            className="form-control"
                            name="password"
                            autoComplete="password-new"
                            placeholder="Leave blank to retain current password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Input
                            title="Confirm Password"
                            type="password"
                            className="form-control"
                            name="confirm-password"
                            autoComplete="password-new"
                            placeholder="Leave blank to retain current password"
                            onChange={(event) => setPasswordConfirm(event.target.value)}
                        />
                        <Input
                            title="Email"
                            type="email"
                            className="form-control"
                            name="email"
                            autoComplete="email"
                            placeholder={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                            <MultiInput
                                title="Account Type"
                                type="accountType"
                                className="form-control"
                                onChange={(event) => setAccountType(event.target.value)}
                                options={accountTypeOptions}
                                value={accountType}
                            />
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Edit User"
                        />
                        </form>
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

export default UserEdit;