import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Skelton from "../skeltonloading/Skelton";
import { baseurl } from '../Config/config';

function Test() {
    const { id } = useParams(); // Get the book ID from the URL
    const [bookData, setBookData] = useState(null);
    const [quantity, setQuantity] = useState(1); // Initialize quantity state

    // Fetch book details on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `${token}` };

                const response = await axios.get(`${baseurl}/addbook/single/${id}`, { headers });
                setBookData(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
                toast.error("Failed to fetch book data");
            }
        };

        fetchData();
    }, [id]);

    // Initialize Razorpay payment
    const initPayment = (data, book) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Ensure this is set correctly
            amount: data.amount,
            currency: data.currency,
            name: book.AddBookname,
            description: "Test Transaction",
            image: `${baseurl}${book.image}`,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        bookId: book._id,
                        bookDetails: {
                            name: bookData.AddBookname,
                            author: bookData.AddAuthorname,
                            image: bookData.image,
                            price: bookData.bookprice,
                            oldPrice: bookData.bookoldprice,
                            description: bookData.bookdesc,
                        },
                        quantity,
                        totalPrice: book.bookprice * quantity,
                    };

                    const result = await axios.post(`${baseurl}/test/verify`, payload);
                    toast.success("Payment verified successfully");
                    console.log("Payment verification response:", result.data);
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    toast.error("Payment verification failed");
                }
            },
            theme: { color: "#3399cc" },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    // Handle payment initiation
    const handlePayment = async (book) => {
        try {
            const orderUrl = `${baseurl}/test/orders`;
            const totalAmount = book.bookprice * quantity; // Calculate total price
            const { data } = await axios.post(orderUrl, { 
                amount: totalAmount, 
                bookDetails: {
                    name: book.AddBookname,
                    author: book.AddAuthorname,
                    image: book.image,
                    price: book.bookprice,
                }
            });
            initPayment(data.data, book);
        } catch (error) {
            console.error("Error initiating payment:", error);
            toast.error("Error in initiating payment");
        }
    };

    // Handle quantity increment
    const incrementQuantity = () => setQuantity((prev) => prev + 1);

    // Handle quantity decrement
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">BookStore</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/newadd">Explore More</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{ padding: '20px' }}>
                {bookData ? (
                    <div
                        style={{
                            margin: '20px auto',
                            maxWidth: '500px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2>{bookData.AddBookname}</h2>
                        <h4>Author: {bookData.AddAuthorname}</h4>
                        {bookData.image && (
                            <img
                                src={`${baseurl}${bookData.image}`}
                                alt={bookData.AddBookname}
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
                            />
                        )}
                        <p>
                            <strong>Price (per item):</strong> ${bookData.bookprice}
                        </p>
                        <p>
                            <strong>Old Price:</strong> 
                            <span className="text-danger text-decoration-line-through">
                                ${bookData.bookoldprice}
                            </span>
                        </p>
                        <p>
                            <strong>Description:</strong> {bookData.bookdesc}
                        </p>
                        <div>
                            <strong>Quantity:</strong>
                            <div className="d-flex align-items-center mt-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={decrementQuantity}>-</button>
                                <span className="mx-3">{quantity}</span>
                                <button className="btn btn-outline-primary btn-sm" onClick={incrementQuantity}>+</button>
                            </div>
                        </div>
                        <p className="mt-2">
                            <strong>Total Price:</strong> ${bookData.bookprice * quantity}
                        </p>
                        <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => handlePayment(bookData)}
                        >
                            Buy Now
                        </button>
                    </div>
                ) : (
                    <Skelton/>
                )}
            </div>
            <footer className="text-center py-4">
                <p>&copy; 2025 BookStore. All Rights Reserved.</p>
            </footer>
        </>
    );
}

export default Test;
