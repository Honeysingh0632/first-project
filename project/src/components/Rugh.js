import React, { useState,useRef,useEffect } from "react";
import "./Nvabar.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { baseurl } from "../Config/config";
import { TbPasswordUser } from "react-icons/tb";



const Rugh = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [data, setData] = useState(null); // Initialize as null or empty object
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${baseurl}/singleuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            console.log("API Result:", result); // Log to check data structure
            
            // Check if `message` exists in result
            if (result && result.message) {
                setData(result.message); // Set data to `message` object
            } else {
                setError("No data found in response"); // Set error if `message` is missing
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message); // Update error state
        }
    };

    fetchData();
}, []);

  


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
              
                <div className="dropdown-menu text-start p-3">
                  <p className="text-light fs-4 "><CgProfile />
                  <Link to='/user' className="link"> My Profile</Link></p>
                  {data ? (
                                   <p className="text-light fs-4">
                                      <h3>{data.firstName} {data.lastName}</h3>
                                       <p><strong>Email:</strong> {data.email}</p>
                                           
                                   </p>
                                     
                                            
                                           
                                           
                                       
                                    ) : (
                                      <p className="text-light">
                                      
                                       <p ><Link to="/signup" className="text fs-4">Register or Log in</Link></p>
                                           
                                   </p>
                                    )}
                  
                  
                  <p className="text-light fs-3 "> <IoSettingsOutline/> <Link to="/Editprofile" 
                   className="text fs-4 link text-hov">Edit profile</Link></p>

                 <p className="text-light fs-3"> <TbPasswordUser/> <Link to="/Changepassword" 
                   className="text fs-4 link text-hov">Change Password</Link></p>

                 

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
