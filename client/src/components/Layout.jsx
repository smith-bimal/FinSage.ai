import { Outlet } from 'react-router';
import ChatBot from '../pages/ChatBot';

function Layout() {
    return (
        <div className='relative'>
            <Outlet />
            <div className='fixed bottom-8 right-8 z-50'>
                <ChatBot />
            </div>
        </div>
    );
}

export default Layout;
