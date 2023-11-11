import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import UserList from './UserList';
import MessageAlert from '../partials/MessageAlert';
import { useInactivityTracker } from '../tools/activity';
import '../../../css/main.css';

function Main() {
    const navigate = useNavigate();
    const [cookie, _, removeCookie] = useCookies();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    useInactivityTracker(() => {
        setIsAlertOpen(true);
    }, () => {
        removeCookie('test_token');
        removeCookie('test_user');
        navigate('/login');
    });

    return (
        <DashboardLayout userData={cookie.test_user}>
            <UserList></UserList>
            <MessageAlert
                title="Inactivity Alert"
                text="You've been incative for 5 minutes. In 10 minutes account session will be expired automatically."
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                timeout={10}
            />
        </DashboardLayout>
    );
}

export default Main;