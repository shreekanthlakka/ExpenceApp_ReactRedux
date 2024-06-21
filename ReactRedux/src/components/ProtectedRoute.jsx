import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCurrentUser } from "../actions/userActions";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startCurrentUser());
    }, []);

    if (!isLoading && !isAuthenticated) return <Navigate to="/login" />;

    if (isLoading) return <h1>Loading ... </h1>;

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
