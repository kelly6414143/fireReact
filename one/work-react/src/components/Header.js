import React from 'react'
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <header className="App-header">
                HEADER
            </header>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
            <Link to="/register">Register</Link>
        </div>
        
    );
}
