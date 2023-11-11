import {Routes, Route} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import LazyLoading from './helpers/LazyLoading';
import ProtectedRoute from './helpers/ProtectedRoute';
import PublicRoute from './helpers/PublicRoute';

function App() {
    const [cookie] = useCookies();
    return (
        <Routes>
            <Route element={<ProtectedRoute token={cookie.test_token} />}>
                <Route path="/" element={<LazyLoading><Main/></LazyLoading>} />
            </Route>
            <Route element={<PublicRoute token={cookie.test_token} />}>
                <Route path="/login" element={<LazyLoading><Login/></LazyLoading>} />
                <Route path="/sign-up" element={<LazyLoading><SignUp/></LazyLoading>} />
            </Route>
            <Route path="/*" element={<LazyLoading><NotFound/></LazyLoading>} />
        </Routes>
    );
}

export default App;