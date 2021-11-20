import React from 'react'
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
            </nav>
        </header>
    )
}
