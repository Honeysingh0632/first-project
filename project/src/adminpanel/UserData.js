import React, { useEffect, useState } from "react";

const UserData = () => {

    const [data,Setdata] =useState([]);
  

    useEffect(() => {
    fetch('http://localhost:8000/get').then((result) => {
        result.json().then((res) => {

            console.log("result",res)
            Setdata(res)
        })
    })
    },[])

    return(
        <>

<div className="side-right">
            <h1 class="text-center fs-1 ms-4 ">User Details</h1>
              <div className="side-right-1">
                  <div className="container-fluid ms-3">
                    <div className="row">
                     
                              <table class="table  table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">id</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col"> Email</th>
                                       
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