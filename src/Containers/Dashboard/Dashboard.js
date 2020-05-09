import React from "react"
import Navbar from '../Navbar/Navbar'

class Dashboard extends React.Component
{
    render()
    {
        return <React.Fragment>
            <Navbar handleLogout = {this.props.handleLogout}/>
        </React.Fragment>
    }
}

export default Dashboard;