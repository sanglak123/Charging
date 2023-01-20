import React from 'react';
import { formatMoney } from '../../db/config/formatMoney';

function Dashboard(props) {
    return (
        <div id='public_dashboard'>
            <div className='public_hearder'>
                <div className='hearder_item'>
                    <h4><i classname="fa fa-code-branch me-2"></i> Đại Lý</h4>
                    <h1>09</h1>
                </div>

                <div className='hearder_item'>
                    <h4><i classname="fa fa-user-friends me-2"></i>Clients</h4>
                    <h1>218</h1>
                </div>

                <div className='hearder_item'>
                    <h4><i classname="fa fa-cookie-bite me-2"></i>Doanh Thu</h4>
                    <h1>{formatMoney(94582)}</h1>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;