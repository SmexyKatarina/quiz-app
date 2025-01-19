import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";

export type Authorization = {
    permissions: string[]
    redirectPath?: string
    children?: ReactElement
}

const ProtectedRoute = ({ permissions, redirectPath, children }: Authorization) => {
    
    const user = useAppSelector(state => state.users);

    if ((!user.username || !permissions.every(x => user.permissions.includes(x))) && !user.permissions.includes("ALL")) {
        return <Navigate to={redirectPath || "/invalid-perms"} replace />
    }

    return children ? children : <Outlet />;
}

export default ProtectedRoute;