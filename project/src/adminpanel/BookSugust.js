import React,{useEffect,useState} from "react";

import axios from "axios";

const BookSugguestData = ({id}) => {

    const [data,Setdata] =useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/getbook').then((result) => {
            result.json().then((res) => {
    
                console.log("result",res)
                Setdata(res)
            })
        })
    },[])

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/books/delete/${id}`);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleDelete = () => {
        deleteItem(id);
        console.log(id);
    };

    return(
        <>
         <div className="side-left ">
        <h1 class="text-center fs-1 ms-4 "> Book Sugguest Details</h1>
            <div className="container-fluid ms-3  ">
            <div className="row">
            <table class="table table-light table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">id</th>
                                        <th scope="col">Your Name</th>
                                        <th scope="col">Your Email</th>
                                        <th scope="col">Book Name</th>
                                        <th scope="col">Author Name</th>
                                        {/* <th scope="col">delete Name</th> */}
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
                                     
                                        {/* <td >
                                            <button className="btn btn-danger"
                                        onClick={() => { handleDelete(value._id)}}>Delete</button></td> */}
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