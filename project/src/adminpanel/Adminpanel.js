import React,{useEffect, useState} from "react";

import { Link, Outlet, Router  } from 'react-router-dom';






const Admin = () => {


    return(
        <>
   
         

       
       
        <div className="admin border border-primary">
            
            <div className="sidebaar-1 border  w-20 p-3">
            <h1 className="bold-text">Admin Pannel </h1>
                <h5>Contact User Details</h5>
                 <Link to="ContactUser"> Click here</Link> <br></br>
                 <h5>Book Sugguest Details</h5>
                 <Link to="BookSugguestData"> Click here</Link><br></br>
                 <h5>User Details</h5>
                 <Link to="UserData">Click here</Link>
                 <h5>Add books</h5>
                 <Link to="Addbook">Click here</Link>
                


            </div>
            <div className="sidebaar-2">
            <Outlet/>
            </div>
       
       
     
       
      </div>  
        
        
            

         
        
       

        </>
    )
}

export default Admin;
