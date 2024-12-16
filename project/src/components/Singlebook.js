import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';
import Rugh from './Rugh';
import Navbar from './Navbar';
import Footer from './Footer';

function Singlebook() {
    const { id } = useParams(); 
    const [bookData, setBookData] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const headers = {
                    Authorization: `${token}`, 
                };

                const response = await axios.get(`${baseurl}/addbook/single/${id}`, { headers });
                setBookData(response.data); 
            } catch (error) {
                console.error("Error fetching the data", error);
                toast.error("Failed to fetch book data");
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Navbar />
            <Rugh />

            <div style={{ padding: '20px' }} className='on-mobile'>
                {bookData ? (
                    <div style={{ textAlign: 'left', margin: '20px auto', maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <h2>{bookData.AddBookname}</h2>
                        <h4>Author: {bookData.AddAuthorname}</h4>
                        {bookData.image && (
                            <img 
                                src={`${baseurl}${bookData.image}`} 
                                alt={bookData.AddBookname} 
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} 
                            />
                        )}
                        <p><strong>Description:</strong> {bookData.bookdesc}</p>
                        <p><strong>Price:</strong> ${bookData.bookprice}</p>
                        <p><strong>Old Price:</strong> ${bookData.bookoldprice}</p>
                        <p><strong>Rating:</strong> {bookData.bookrating} / 5</p>
                    </div>
                ) : (
                    <p>Loading book details...</p>
                )}
            </div>

            <div className="container on-desktop ">
                <div className="row">
                    <div className="col-lg-6 mt-5 text-center">
                        {bookData ? (
                            <>
                                <h2 className='' style={{marginTop:150}}>{bookData.AddBookname}</h2>
                                <h4>Author: {bookData.AddAuthorname}</h4>
                                <p><strong>Description:</strong> {bookData.bookdesc}</p>
                                <p className="text-success"><strong>Price:</strong> ${bookData.bookprice}</p>
                                <p className="text-danger text-decoration-line-through"><strong>Old Price:</strong> ${bookData.bookoldprice}</p>
                                <p><strong>Rating:</strong> {bookData.bookrating} / 5</p>

                                <div className='mt-5'>
                                    <button className=' buttonx1'><Link to="/NewAdd" className="link">Explore More</Link></button>
                                   
                                </div>
                            </>
                        ) : (
                            <p>Loading book details...</p>
                        )}
                    </div>
                    <div className="col-lg-6 mt-5">
                        {bookData?.image && (
                            <img 
                                src={`${baseurl}${bookData.image}`} 
                                alt={bookData.AddBookname} 
                                style={{ width: 500, borderRadius: '8px', marginBottom: '16px', height:"auto" }} 
                            />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Singlebook;
