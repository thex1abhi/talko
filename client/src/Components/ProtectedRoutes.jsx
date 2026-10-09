

import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ user, loading, children }) {
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[3f8f8fc] ">
                <div className="w-8 h-8 border-4 broder-purple-500  broder-t-transparent rounded-full animate-spin  ">

                </div>
            </div>
        )
    }

    if (!user) return <Navigate to="/login" replace />

    return children;
};


export default ProtectedRoutes 