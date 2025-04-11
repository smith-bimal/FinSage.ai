import { Link } from 'react-router';

function HeaderFile() {
    return (
        <header className="bg-gray-900 text-gray-200 p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">Financial Time Machine</h1>
            <nav className="space-x-4">
                <Link to="/" className="hover:text-blue-400">Dashboard</Link>
                <Link to="/new-simulation" className="hover:text-blue-400">New Simulation</Link>
            </nav>
        </header>
    );
}

export default HeaderFile;
