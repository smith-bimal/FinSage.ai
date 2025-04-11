import { Outlet } from 'react-router';

function Layout() {
    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    );
}

export default Layout;
