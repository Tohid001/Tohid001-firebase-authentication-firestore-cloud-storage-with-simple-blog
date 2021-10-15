import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className="navbar">
            <h1>The Syed's Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/contact" style={{
                    color:"white",
                    backgroundColor:"#f1356d",
                    borderRadius:"8px"
                }}>New Blog</Link>
            </div>

        </div>
    )
}

export default NavBar
