import React, {useEffect, useState} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
    const [jwtToken, setJwtToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClassName, setAlertClassName] = useState("d-none");

    const navigate = useNavigate();

    const logOut = () => {
        setJwtToken("");
        setIsAdmin(false)
        setAlertClassName("alert-success");
        setAlertMessage("You have been logged out");
        navigate("/login");
    }

    useEffect(() => {
        // TODO: Refresh code
        if(jwtToken === "") {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            }

            fetch("/refresh", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        setJwtToken(data.access_token);
                    }
                })
                .catch((error) => {
                    console.log("user is not logged in", error);
                })
        }
    }, [jwtToken])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="mt-3">Course Schedule Management</h1>
                </div>
                <div className="col text-end">
                    {jwtToken === ""
                        ? <Link to="/login"><a href="#!"><span className="badge bg-success">Login</span></a></Link>
                        : <a href="#!" onClick={logOut}><span className="badge bg-danger">Logout</span></a>
                    }
                </div>
                <hr className="mb-3"></hr>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <nav>
                        <div className="list-group">
                            <Link to="/" className="list-group-item list-group-item-action">
                                Home
                            </Link>
                            <Link
                                to="/new"
                                className="list-group-item list-group-item-action"
                            >
                                Add a new course
                            </Link>
                            <Link
                                to="/update"
                                className="list-group-item list-group-item-action"
                            >
                                Update an existing course
                            </Link>
                            <Link
                                to="/cancel"
                                className="list-group-item list-group-item-action"
                            >
                                Cancel a course
                            </Link>
                            <Link
                                to="/courses"
                                className="list-group-item list-group-item-action"
                            >
                                View all courses
                            </Link>
                            {jwtToken !== "" && isAdmin &&
                                <>
                                    <Link
                                        to="/manage"
                                        className="list-group-item list-group-item-action"
                                    >
                                        Manage
                                    </Link>
                                </>
                            }
                        </div>
                    </nav>
                </div>
                <div className="col-md-10">
                    <Alert
                        message={alertMessage}
                        className={alertClassName}
                    />
                    <Outlet context={{
                        jwtToken, setJwtToken, setIsAdmin, setAlertClassName, setAlertMessage,
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default App;