import {useState} from "react";
import Input from "./form/Input";
import {useNavigate, useOutletContext} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setJwtToken } = useOutletContext()
    const { setIsAdmin } = useOutletContext()
    const { setAlertClassName } = useOutletContext()
    const { setAlertMessage } = useOutletContext()

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("username: " + username + ", password: " + password);

        // build the request payload
        let payload = {
            username: username,
            password: password,
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
        const authenticateUrl = `${backendUrl}/authenticate`;

        let access_token = "";

        fetch(authenticateUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    navigate("/");

                    // Perform admin authentication fetch here, after access_token is available
                    let adminPayload = {
                        access_token: data.access_token,
                    }
                    const authenticateAdminUrl = `${backendUrl}/admin_authenticate`;
                    const adminRequestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(adminPayload)
                    }
                    fetch(authenticateAdminUrl, adminRequestOptions)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            if (data.error) {
                                setIsAdmin(false);
                            } else {
                                setIsAdmin(true);
                            }
                        })
                        .catch((error) => {
                            setAlertClassName("alert-danger");
                            setAlertMessage("Error: " + error);
                        })
                }
            })
            .catch((error) => {
                setAlertClassName("alert-danger");
                setAlertMessage("Error: " + error);
                return;
            })
    }

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
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
                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
        </div>
    );
}

export default Login;