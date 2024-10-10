import React,{useState,useEffect} from "react";
import { Link, } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import './adminstyle.css';

const Allbook = () => {

    const [data,Setdata] =useState([]);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:8000/addbook').then((result) => {
            result.json().then((res) => {
    
                console.log("result",res)
                Setdata(res)
            })
        })
    },[])

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/addbook/delete/${id}`);
            setUsers(users.filter(user => user._id !== id)); // Update state after deletion
           
            toast.success('User deleted successfully  ')
            window.location.reload()
           

            
        } catch (error) {
            console.error( error);
        }
    };


    return(
        <>
       
         <div className="container mt-4">
        <div className="row">
            
        
                {data.map((value) =>
                
                
                    <div className="  card-book2 p-3 mt-5 col-lg-3 text-center ">
                        

                        {value.image && (
            <img src={`http://localhost:8000${value.image}`} alt={value.AddBookname} width="200"  className="add-book-card"/>
          )}

                         <p>{value.AddBookname}</p>
                        
                         <p>{value.AddAuthorname}</p>
                         <p>{value.bookdesc}</p>
                         <p>{value.bookprice}$</p>
                       
                         <p > Old price :{value.bookoldprice} $</p>
                         <p> Book Rating :{value.bookrating}/5</p>
                       <br/>
                       <div className="">
                         <button className="btn btn-success btn-sm   " > <Link className="link text-light  " to={`/AdminPanel/update/addbook/${value._id}/edit`} >update book</Link>
                       </button>
                       
                       <button className="btn btn-outline-danger btn-sm  ms-2" onClick={() => deleteUser(value._id)} > Delete Now</button>
                       </div>
                      

                    </div>
               
                )}
            </div>
        </div>
        
        </>

       
    )
    
}

export default Allbook;