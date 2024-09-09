import React,{useEffect, useState} from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";





const ContactUser = () => {

    const [data,Setdata] =useState([]);
    const [users, setUsers] = useState([]);
  

        useEffect(() => {
        fetch('http://localhost:8000/contact/get/user').then((result) => {
            result.json().then((res) => {

                console.log("result",res)
                Setdata(res)
            })
        })
        },[])

        const deleteUser = async (id) => {
            try {
                await axios.delete(`http://localhost:8000/contact/${id}`);
                setUsers(users.filter(user => user._id !== id)); // Update state after deletion
               
                toast.success('User deleted successfully  ')
                window.location.reload()
                // navigate('/AdminPanel/BookSugguestData')
    
                
            } catch (error) {
                console.error( error);
            }
        };

    return(
        <>

      

        <div className="side-right">
            <h1 class="text-center fs-1 ms-4 "> Contact User Details</h1>
              <div className="side-right-1">
                  <div className="container-fluid ms-3">
                    <div className="row">
                    <table class="table  table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col" className="text-info">#</th>
                                        <th scope="col" className="text-info">id</th>
                                        <th scope="col" className="text-info">Your Name</th>
                                        <th scope="col" className="text-info">Your Email</th>
                                        <th scope="col" className="text-info">Your Number</th>
                                        <th scope="col" className="text-info">Message</th>
                                        {/* <th scope="col">Update</th>*/}
                                        <th scope="col" className="text-info">Delete</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((value,index) => 
                                          <tr>
                                        <th scope="row">{index +1}</th>
                                        <td >{value._id}</td>
                                        <td >{value.name}</td>
                                        <td >{value.email}</td>
                                        <td >{value.phone}</td>
                                        <td >{value.message}</td>
                                        {/* <td > <button className="btn btn-primary">update</button></td>*/}
                                        <td > <button className="btn btn-danger"
                                        onClick={() => deleteUser(value._id)}> <i className="fs-5 me-1"><MdDeleteForever/></i>Delete</button></td> 


                                        </tr>
                                        )}
                                    </tbody>
                                    </table>
                </div>
            </div>
        </div>
        </div>
        
        </>

    )
}

export default ContactUser;