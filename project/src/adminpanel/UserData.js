import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const UserData = () => {

    const [data,Setdata] =useState([]);
    const [users, setUsers] = useState([]);
  

    useEffect(() => {
    fetch('http://localhost:8000/get').then((result) => {
        result.json().then((res) => {

            console.log("result",res)
            Setdata(res)
        })
    })
    },[])
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/userdata/${id}`);
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
            <h1 class="text-center fs-1 ms-4 ">User Details</h1>
              <div className="side-right-1">
                  <div className="container-fluid ms-3">
                    <div className="row">
                     
                              <table class="table  table-hover table-bordered">
                                    <thead >
                                        <tr >
                                        <th scope="col" className="text-info">#</th>
                                        <th scope="col" className="text-info">id</th>
                                        <th scope="col" className="text-info">First Name</th>
                                        <th scope="col" className="text-info">Last Name</th>
                                        <th scope="col" className="text-info"> Email</th>
                                        <th scope="col" className="text-info"> Update</th>
                                        <th scope="col" className="text-info"> Delete</th>
                                       
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((value,index) => 
                                          <tr>
                                        <th scope="row">{ index +1}</th>
                                        <td >{value._id}</td>
                                        <td >{value.firstName}</td>
                                        <td >{value.lastName}</td>
                                        <td >{value.email}</td>
                                        {/* <td >{value.password}</td> */}
                                        <td > <button className="btn btn-primary"> 

                                        <Link className="link" to={`/AdminPanel/userupdate/${value._id}/edit`}

                                        ><i className="fs-5 me-1 link"><FaEdit/></i>Edit</Link> </button></td>

                                        <td > <button className="btn btn-danger"
                                        onClick={() => deleteUser(value._id)}><i className="fs-5 me-1"><MdDeleteForever/></i>Delete</button></td> 
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

export default UserData;