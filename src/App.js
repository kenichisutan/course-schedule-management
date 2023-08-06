import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="mt-3">Course Schedule Management</h1>
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
                        </div>
                    </nav>
                </div>
                <div className="col-md-10">
                    {/* This is where the matched child route components will be rendered */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;