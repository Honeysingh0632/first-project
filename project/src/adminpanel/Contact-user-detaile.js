import React,{useEffect, useState} from "react";





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

        // const deleteuser = async (id) => {


        //     try {
                 
        //         const response = await fetch(`http://localhost:8000/user/delete/${id}`,
        //         {
        //             method:'DELETE'
                   
    
        //         }
                

        //     )
        //     const data = await response.json();
        //     console.log(`user after delete${data}`);
        //     console.log(data)
           

        //     if(response.ok){
        //         ContactUser();
        //     }

            
        //     } catch (error) {
                
        //     }
        //  }


    return(
        <>

      

        <div className="side-right">
            <h1 class="text-center fs-1 ms-4 "> Contact User Details</h1>
              <div className="side-right-1">
                  <div className="container-fluid ms-3">
                    <div className="row">
                    <table class="table table-light table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">id</th>
                                        <th scope="col">Your Name</th>
                                        <th scope="col">Your Email</th>
                                        <th scope="col">Your Number</th>
                                        <th scope="col">Message</th>
                                        {/* <th scope="col">Update</th>
                                        <th scope="col">Delete</th> */}
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
                                        {/* <td > <button className="btn btn-primary">update</button></td>
                                        <td ><button className="btn btn-danger"
                                        onClick={() => { deleteuser(value._id)}}>Delete</button></td> */}


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