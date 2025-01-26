import React,{useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../Config/config";

const Banner =() => {


    const [formData,newset] =useState(
         {  
           
            image:null,
          })
    
    const navigate =useNavigate();


    const submit = async e => {
        e.preventDefault();
        const data = new FormData();
     
        data.append('image', formData.image);
   

    
        try {
          const res = await axios.post(`${baseurl}/post/banner`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
           
          });
          console.log(res.data); 
          toast.success('add book Successfully  ')
          navigate('/AdminPanel/Bannerlist');
        } catch (err) {
           console.error(err);
        }
      };

    // const handelchange = e => {
    //     newset({ ...formData, [e.target.name]: e.target.value });
    //   };

const handleFileChange = e => {
    newset({ ...formData, image: e.target.files[0] });
  };

       

    return(
        <>
        <div className="p-2">

        <h1 className="ms-5 mt-2">Add Banner</h1>
        <form className="ms-5 mt-4">
            
             

                <label for="file"  className="set-text">Add Banner here</label>
              <input name="image" required  type="file"   onChange={handleFileChange}  
              className="form-control"></input> 

               <button type="submit"  className="btn btn-success mt-2" onClick={submit} >Add book</button>
              
                 </form>

        </div>
       
                
        </>
    )
}

export default Banner;