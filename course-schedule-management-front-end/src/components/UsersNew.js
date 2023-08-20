import Input from "./form/Input";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import MultiInput from "./form/MultiInput";

const UsersNew = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("basic");

    const [admin, setAdmin] = useState(false);
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

    useEffect(() => {
        handleAdminCheck();
        return () => {
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // build the request payload
        let payload = {
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
        const authenticateUrl = `${backendUrl}/new-user`;

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
                    navigate("/manage/users");
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
        <div>
            <div className="text-center">
                <h2>Users</h2>
                <div className="col text-end">
                    <Link to={`/manage/users`}><span className="badge bg-primary">Back</span></Link>
                </div>
                <hr />
                {/* if admin is true, display the following */}
                {admin ? (
                    <>
                        <h3><label htmlFor="createUser">Create new user</label></h3>
                        <form onSubmit={handleSubmit} id="createUser">
                            <Input
                                title="Username"
                                type="username"
                                className="form-control"
                                name="username"
                                autoComplete="username-new"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <Input
                                title="Password"
                                type="password"
                                className="form-control"
                                name="password"
                                autoComplete="password-new"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Input
                                title="Confirm Password"
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                autoComplete="password-new"
                                onChange={(event) => setPasswordConfirm(event.target.value)}
                            />
                            <Input
                                title="Email"
                                type="email"
                                className="form-control"
                                name="email"
                                autoComplete="email-new"
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
                                value="Create User"
                            />
                        </form>
                        <hr />
                    </>
                    ) : (
                    <div className="text-center">
                    <h2>Unauthorized</h2>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default UsersNew;