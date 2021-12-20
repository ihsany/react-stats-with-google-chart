import React, {useState, useEffect} from 'react'
import {Routes, Route, BrowserRouter, Link, Navigate, Outlet} from "react-router-dom";
import { useNavigate, useLocation } from 'react-router';
import Navbar from "./components/Navbar"
import LoginForm from './components/LoginForm';
import MetricChart from './components/MetricChart';
import MetricForm from './components/MetricForm';
import utils from './utils';

function App() {

  const AdminModule = () => {
    let location = useLocation();
    let user = utils.getSessionObject('user');
    return (user && user.isAuthanticated) ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />
  }

  const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<MetricChart />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminModule />}>
          <Route path="" element={<MetricForm />} />
        </Route>
      </Routes>
    )
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );

}

export default App;
