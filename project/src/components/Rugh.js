import React, { useState,useRef,useEffect } from "react";
import "./Nvabar.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";


const Rugh = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  


  const handleLogout = () => {
  	localStorage.removeItem("token");

  	window.location.reload();
    toast.info('log out succesfully');


  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };





  return (
    <>

      <nav className="main-nav navbar">
        {/* 1st logo part  */}
        <div className="nav1  ">

          <h1 className="fs-2"> <i className=' me-5 bold-text'><IoBookSharp /></i> Library</h1>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/" className="a2">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="a2">about</NavLink>
            </li>
            <li>
              <NavLink to="/service" className="a2">services</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="a2">contact</NavLink>
            </li>
            <li>
              <NavLink to="/NewAdd" className="a2">New Addition</NavLink>
            </li>
            <li>
              <NavLink to="/BookSugguest" className="a2">Book Sugguest</NavLink>
            </li>
          
            {/* <NavLink to="/User" className="a2">User info</NavLink> */}
            <li>
            
             
            
            </li>
            <div className="profile-dropdown">

            <i className="profile" onClick={toggleDropdown}><CgProfile /></i>
           
            {isOpen && (
              
                <div className="dropdown-menu">
                  <p className="text-light fs-3 "><CgProfile />
                  <Link to='/user' className="link"> My Profile</Link></p>
                  
                  <p className="text-light fs-3"> <IoSettingsOutline/> Edit profile</p>
                   <button onClick={handleLogout} className="logout "><TbLogout2/> Log Out</button> 
                   
                   
                </div> 
            )}
        </div>
          </ul>
         
            </div>
           
           
      
        {/* 3rd social media links */}
        <div className="social-media">
      




          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <i className="icon-white"><GiHamburgerMenu /></i>
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Rugh;
