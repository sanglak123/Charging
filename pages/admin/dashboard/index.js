import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiAdmin } from '../../../CallApi/ApiAdmin';
import Clients from '../../../components/dashboardViews/Clients';
import Dashboard from '../../../components/dashboardViews/Dashboard';
import Prices from '../../../components/dashboardViews/Prices';
import { LoadDataAdminSuccess } from '../../../redux/slice/AdminSlice';


function AdminDashboard(props) {
    const dispatch = useDispatch();
    //Admin Data
    useEffect(() => {
        const GetAdminData = async () => {
            await ApiAdmin.Data.GetAdminData(dispatch, LoadDataAdminSuccess);
        };
        GetAdminData();
    })
    const [views, setViews] = useState("Dashboard")
    const handleRenderViews = () => {
        switch (views) {
            case "Clients":
                return <Clients />
            case "Prices":
                return <Prices />

            default:
                return <Dashboard />

        }
    }
    return (
        <div id='dashboard' className='d-flex'>

            <div className='dashboard_controller'>
                <div className='dashboard_controller_content'>

                    <div className='logo d-flex'>
                        <div id='logo_247'>
                            <h1>DOITHE<span>24/7</span></h1>
                            <span className='website'>www.doithe247.com.vn</span>
                        </div>
                        <i classname="fa fa-angle-double-left"></i>
                    </div>

                    <div className='menu'>
                        <span>Menu</span>

                        <div onClick={() => setViews("Dashboard")} className='menu_item'>
                            <i className="fa fa-house-damage"></i>
                            <p>Dashboard</p>
                        </div>

                        <div onClick={() => setViews("Clients")} className='menu_item'>
                            <i className="fa fa-users"></i>
                            <p>Clients</p>
                        </div>

                        <div onClick={() => setViews("Prices")} className='menu_item'>
                            <i className="fa fa-chart-line"></i>
                            <p>Prices</p>
                        </div>

                        <div onClick={() => setViews("Prices")} className='menu_item'>
                            <i className="fab fa-facebook-messenger"></i>
                            <p>Messenger</p>
                        </div>

                        <div  className='menu_item'>
                            <i className="fa fa-external-link-alt"></i>
                            <p>Logout</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className='dashboard_views'>
                <div className='views_bar'>
                    <p>Menu / {views}</p>
                    <Link href={"/"}>
                        <i className="fa fa-long-arrow-alt-left me-2"></i>
                        Back to home
                    </Link>
                </div>
                <div className='views_item'>
                    {
                        handleRenderViews()
                    }
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;