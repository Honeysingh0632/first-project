import React,{useState,useEffect} from "react";
import { Link, } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import './adminstyle.css';
import { baseurl } from "../Config/config";

const Allbook = () => {

    const [data,Setdata] =useState([]);
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 2;


    const indexOfLastPage = currentPage * itemsPerPage; // Get the index of the last transaction
    const indexOfFirstPage = indexOfLastPage - itemsPerPage; // Get the index of the first transaction
    const CurrentPage = data.slice(indexOfFirstPage, indexOfLastPage); // Get the transactions for the current page
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    

   

    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token
  
        try {
          const response = await fetch(`${baseurl}/addbook`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log(data); 
          Setdata(data);// Handle data as needed
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
  
      fetchData();
    }, []);



    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseurl}/addbook/delete/${id}`);
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
        <div className="row">{CurrentPage.length > 0 ? (
                                    CurrentPage.map((value,index) => (
                                        <div className="  card-book2 p-3 mt-5 col-lg-3 text-center ">
                        

                        {value.image && (
            <img src={`${baseurl}${value.image}`} alt={value.AddBookname} width="200"  className="add-book-card"/>
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
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan="9">No data found</td>
                                            </tr>
                                        )}
                                                        
            
        
                {/* {data.map((value) =>
                
                
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
               
                )} */}
            </div>
            <div className='text-center'>
        <button className='btn btn-primary mt-2 ' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className=' btn btn-light ms-2'
          >
            {index + 1}
          </button>
        ))}
        <button  className='btn btn-primary ms-2 mt-2' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
        </div>
        
        </>

       
    )
    
}

export default Allbook;