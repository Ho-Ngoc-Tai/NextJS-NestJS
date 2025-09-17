"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/stores";
import { fetchUsersRequest, selectUsers, selectUserLoading, selectUserError } from "@/app/stores/dashboard/user/userSlice";
import UsersTable from "@/app/components/containers/auth/users/UsersTable";

export default function UsersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectUsers);
    const loading = useSelector(selectUserLoading);
    const error = useSelector(selectUserError);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return <UsersTable users={users} />;
}
