import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import Loading from '../components/common/Loading'
import PurchaseHistory from '../components/core/Dashboard/PurchaseHistory'

const Dashboard = () => {
    // All hooks at the top level
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Loading state
    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white flex">
            <Sidebar />
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10 '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
