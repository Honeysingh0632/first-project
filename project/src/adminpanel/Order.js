import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseurl } from "../Config/config";
import Skelton from "../skeltonloading/Skelton";
import { Link } from "react-router-dom";


const Order = () => {
    const [paymentData, setPaymentData] = useState([]); // Full payment data
    const [visibleIndex, setVisibleIndex] = useState(0); // Index of the currently visible card
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Track errors

    // Fetch payment data on component mount
    useEffect(() => {
        const fetchPaymentData = async () => {
            const token = localStorage.getItem("token");
            try {
                setLoading(true);
                const response = await axios.get(`${baseurl}/payment/details`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setPaymentData(response.data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch payment details");
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, []);

    // Delete an order by ID
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseurl}/test/delete/${id}`);
            setPaymentData(paymentData.filter((item) => item._id !== id)); // Update state after deletion
            toast.success("Order deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete the order");
        }
    };

    // Handle scroll to load the next card
    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            if (visibleIndex < paymentData.length - 1) {
                setVisibleIndex((prev) => prev + 1);
            }
        }
    }, [visibleIndex, paymentData]);

    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="container mt-4">
            <h1 className="text-center fs-3">Order Details</h1>
            {error ? (
                <p className="text-danger text-center">{error}</p>
            ) : loading ? (
                <p className="text-center mt-4">Loading payment data...</p>
            ) : paymentData.length > 0 ? (
                <div className="row justify-content-center text-center">
                    {paymentData.slice(0, visibleIndex + 1).map((payment, index) => (
                        <div
                            key={payment._id}
                            className="card p-3 mt-4 col-lg-4 text-center ms-5 h-100"
                        >
                            <h5 className="mt-3">Book Details</h5>
                            <p><strong>Order ID:</strong> {payment.razorpay_order_id}</p>
                            <img
                                src={`${baseurl}${payment.bookDetails.image}`}
                                alt={payment.bookDetails.name}
                                style={{ width: 200, height: 200, borderRadius: "8px", marginTop: "16px" }}
                                className="m-auto"
                            />
                            <p><strong>Name:</strong> {payment.bookDetails.name}</p>
                            <p><strong>Author:</strong> {payment.bookDetails.author}</p>
                            <p><strong>Price:</strong> ${payment.bookDetails.price}</p>
                            <p><strong>Description:</strong> {payment.bookDetails.description}</p>
                            <p><strong>Quantity:</strong> {payment.quantity}</p>
                            <p><strong>Total Price:</strong> ${payment.totalPrice}</p>
                            <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                            <p><strong>Order Status:</strong> {payment.bookDetails.orderStatus || "Pending"}</p>
                             <button className="btn btn-success  btn-sm mb-2">
                                                <Link
                                                  className="link text-light"
                                                  to={`/AdminPanel/updateorder/${payment._id}/edit`}
                                                >
                                                  Update Order
                                                </Link>
                                              </button>
                            
                            <button
                                className="btn btn-outline-danger btn-sm "
                                onClick={() => deleteUser(payment._id)}
                            >
                                Delete Now
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                // <p className="text-center mt-4">No orders available</p>
                <Skelton/>
            )}
        </div>
    );
};

export default Order;
