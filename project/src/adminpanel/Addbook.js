import React,{useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Addbook =() => {


    const [formData,newset] =useState(
         {  
             AddBookname:"",
            AddAuthorname:"",
            image:null,
            bookdesc:"",
            bookprice:"",
            bookoldprice:"",
            bookrating:""})
    
    const navigate =useNavigate();

    // const submit = async(e)=> {
    //     e.preventDefault()
    //     console.log(set)
    
    //     try {
    //         const response = await fetch ("http://localhost:8000/addbook",
    //             {method:'POST',
    //                 headers:{'Content-type':'application/json'},
    //                 body:JSON.stringify(set)}) 
    //                 toast.success('add book Successfully  ')
    //                 navigate('/AdminPanel');

    
    //             if(!response.ok){
    //              console.log("error")
    
    //             }else {
    //                 const data = await response.json()
    //                 console.log('success',data)
    //                 // alert('submit data')
    //             }
    //     } catch{
    //         console.log('error')
    //     }
    // }
   

    const submit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('AddBookname', formData.AddBookname);
        data.append('AddAuthorname', formData.AddAuthorname);
        data.append('image', formData.image);
        data.append('bookdesc', formData.bookdesc);
        data.append('bookprice', formData.bookprice);
        data.append('bookoldprice', formData.bookoldprice);
        data.append('bookrating', formData.bookrating);

    
        try {
          const res = await axios.post('http://localhost:8000/addbook', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
           
          });
          console.log(res.data); 
          toast.success('add book Successfully  ')
          navigate('/AdminPanel');
        } catch (err) {
        //   console.error(err);
        }
      };

    const handelchange = e => {
        newset({ ...formData, [e.target.name]: e.target.value });
      };

const handleFileChange = e => {
    newset({ ...formData, image: e.target.files[0] });
  };

       

    return(
        <>
        <div className="p-2">

        <h1 className="ms-5 mt-2">Add book</h1>
        <form className="ms-5 mt-4">
            
                <label for="Name" className="set-text"> Book Title</label><br/>
                <input name="AddBookname" required id="AddBookname" type="text"
                 value= {formData.AddBookname} onChange={handelchange} className="form-control" ></input>

                <label for="email"  className="set-text">Author name</label><br/>
                <input name="AddAuthorname" required id="AddAuthorname" type="text"
                  value= {formData.AddAuthorname} onChange={handelchange}  className="form-control"></input>

                <label for="file"  className="set-text">Image Link paste here</label>
              <input name="image" required  type="file"   onChange={handleFileChange}  
              className="form-control"></input> 

                <label for="bookdesc"  className="set-text">Book Description</label>
                <input name="bookdesc" required  type="text"  value= {formData.bookdesc} 
                onChange={handelchange}  className="form-control"></input>

            

               <label for="bookprice"  className="set-text">book price</label>
                <input name="bookprice" required  type="text"   value= {formData.bookprice} 
                onChange={handelchange}  className="form-control"></input>

                <label for="bookoldprice"  className="set-text">book old price</label>
                <input name="bookoldprice" required type="text"   value= {formData.bookoldprice} 
                onChange={handelchange}  className="form-control"></input>

                <label for="bookrating"  className="set-text">book rating</label>
                <input name="bookrating" required  type="number"   value= {formData.bookrating} 
                onChange={handelchange}  className="form-control"></input>
     
     {/*
                <label for="message"  className="set-text">Active  field</label>
                <div class="form-check">

                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label class="form-check-label" for="flexRadioDefault1">
                Active 
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Deactive
                </label>
                </div> */}
                


               <button type="submit"  className="btn btn-success mb-2" onClick={submit} >Add book</button>
                 </form>

        </div>
       
                
        </>
    )
}

export default Addbook;