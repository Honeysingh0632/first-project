import React,{useEffect,useState} from "react";
import { Link, } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { FaEdit } from "react-icons/fa";


const BookSugguestData = ({id}) => {

    const [data,Setdata] =useState([]);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:8000/getbook').then((result) => {
            result.json().then((res) => {
    
                console.log("result",res)
                Setdata(res)
            })
        })
    },[])

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/user/${id}`);
            setUsers(users.filter(user => user._id !== id)); // Update state after deletion
           
            toast.success('User deleted successfully  ')
            window.location.reload()
           

            
        } catch (error) {
            console.error( error);
        }
    };
   

      

    return(
        <>
         <div className="side-left ">
        <h1 class="text-center fs-1 ms-4 "> Book Sugguest Details</h1>
            <div className="container-fluid ms-3  ">
            <div className="row">
            <table class="table  table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col" className="text-info" >#</th>
                                        <th scope="col"className="text-info">id</th>
                                        <th scope="col" className="text-info">Your Name</th>
                                        <th scope="col" className="text-info">Your Email</th>
                                        <th scope="col" className="text-info">Book Name</th>
                                        <th scope="col" className="text-info">Author Name</th>
                                        <th scope="col" className="text-info"> Update </th>
                                        <th scope="col" className="text-info"> delete </th>
                                       
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((value ,index) => 
                                          <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td >{value._id}</td>
                                        <td >{value.name}</td>
                                        <td >{value.email}</td>
                                        <td >{value.bookname}</td>
                                        <td >{value.authorname}</td>
                                        <td >
                                            <button className="btn btn-success">
                                                <Link className="link" to={`/AdminPanel/updatebook/${value._id}/edit`}><i className="fs-5 me-1 link"><FaEdit/></i>Edit</Link> </button></td>
                                     
                                        <td >
                                            <button className="btn btn-danger"
                                        onClick={() => deleteUser(value._id)}> <i className="fs-5 me-1"><MdDeleteForever/></i>Delete</button></td>
                                        
                                        </tr>
                                        )} 
                                    </tbody>
                                    </table>
            </div>
            </div>
          </div>
          {/* {data1.map((value) => 
         <table className="border border-danger">
            
            <tr className="border border-danger">
                <th>User Id</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Book name</th>
                <th>Author name</th>
            </tr>
            <tr>
                <td>{value._id}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.bookname}</td>
                <td>{value.authorname}</td>
            </tr>
          </table>
        )}
          */}
        </>
    )
}
export default BookSugguestData