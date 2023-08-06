import { Outlet } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mt-3">Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
