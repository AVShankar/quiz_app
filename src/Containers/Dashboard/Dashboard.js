import React from "react"
import Navbar from '../Navbar/Navbar'
import User from '../../Components/User/User'
import Admin from '../../Components/Admin/Admin'

class Dashboard extends React.Component
{
    render()
    {
        return <React.Fragment>
            <Navbar handleLogout = {this.props.handleLogout}/>
            {localStorage.getItem('admin') === "true" ? <Admin /> : <User />}
        </React.Fragment>
    }
}

export default Dashboard;