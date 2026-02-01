'use client';

import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
    adminKey: string;
    setAdminKey: (key: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
    children,
    initialKey = '',
}: {
    children: React.ReactNode;
    initialKey?: string;
}) {
    const [adminKey, setAdminKey] = useState(initialKey);
    return (
        <AdminContext.Provider value={{ adminKey, setAdminKey }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdminKey() {
    const ctx = useContext(AdminContext);
    if (ctx === undefined) {
        throw new Error('useAdminKey must be used within AdminProvider');
    }
    return ctx.adminKey;
}

export function useAdminContext() {
    const ctx = useContext(AdminContext);
    if (ctx === undefined) {
        throw new Error('useAdminContext must be used within AdminProvider');
    }
    return ctx;
}
