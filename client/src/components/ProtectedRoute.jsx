import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * ProtectedRoute component that wraps routes requiring authentication.
 * Redirects to home page if user is not logged in.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {React.ReactNode} Children if authenticated, otherwise Navigate to home
 */
export default function ProtectedRoute({ children }) {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}
