import React from 'react';
import { Link } from "react-router-dom";

const Navbar= () =>{
  return (
    <nav>
        <Link to="/">Metrics Dashboard</Link>
        {" | "}
        <Link to="/admin">Scientist Login</Link>
    </nav>
  );
}

export default Navbar;