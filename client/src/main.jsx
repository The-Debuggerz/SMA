import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Navbar from './components/Navbar/Navbar';
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AboutPage from "./components/AboutPage/AboutPage";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/LoginPage/Login";
ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<Navbar/>
     <Routes>
      
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<RegisterPage/>} />
      <Route path="/about" element={<AboutPage/>} />
    </Routes>
  </BrowserRouter>);
