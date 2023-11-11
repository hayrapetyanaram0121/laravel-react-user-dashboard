import {Navigate, Outlet} from 'react-router-dom';

const PublicRoute = ({ token, redirectPath = '/' }) => {
    if (token) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;