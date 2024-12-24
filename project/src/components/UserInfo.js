import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import { baseurl } from '../Config/config';
import Rugh from './Rugh';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const {data,isLoadind}=useAuth()
    if (isLoadind) {
        return <h1>Loading...</h1>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            setMessage("New password and confirm password do not match")
          
            return;
        }

        try {
            const response = await axios.put(`${baseurl}/forgotpassword/${data._id}`, { 
                oldPassword, 
                password: newPassword 
            });
            toast.success(response.data.message);
            setMessage(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password");
            setMessage(error.response?.data?.message || "Failed to update password");
        }
    };

    return (
        <>
        <Rugh />
        <Navbar />
        <h1 className="contact-text text-center fs-1 mt-5">Change Password</h1>
        <p className="text-center mb-5">
        Change password. Change your  Account password. In order to change your password, you need to be signed in. Continue to sign in. Search. Clear search.
        </p>
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName" className="set-text">Old Password</label><br />
                        <input
                           
                            type="password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    required 
                            className="input1"
                        /><br /><br />

                        <label htmlFor="lastName" className="set-text">New password</label><br />
                        <input
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                            className="input1"
                        /><br /><br />

                        <label htmlFor="email" className="set-text">Confirm Password</label><br />
                        <input
                           type="password" 
                           value={confirmPassword} 
                           onChange={(e) => setConfirmPassword(e.target.value)} 
                           required 
                            className="input1"
                        /><br /><br />

                        <button type="submit" className="btn btn-success">Change Password</button>
                    </form>

                     {message && <p className="mt-3 text-success">{message}</p>}

                    {/*{data ? (
                        <div className="mt-4">
                            <h3>{data.firstName} {data.lastName}</h3>
                            <p><strong>Email:</strong> {data.email}</p>
                        </div>
                    ) : (
                        <p className="mt-4 text-danger">
                            <Link to="/signup" className="text fs-3">Register or Log in</Link>
                        </p>
                    )} */}
                </div>

                <div className="col-lg-6">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-3">
                                <img src={require('./images/books.jpeg')} alt="Book 1" className="book1" />
                            </div>
                            <div className="col-lg-3">
                                <img src={require('./images/book2.jpeg')} alt="Book 2" className="book1" />
                            </div>
                            <div className="col-lg-3">
                                <img src={require('./images/books3.jpeg')} alt="Book 3" className="book1" />
                            </div>
                            <div className="col-lg-3">
                                <img src={require('./images/books4.jpeg')} alt="Book 4" className="book1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />

        {/* <form onSubmit={handleSubmit}>
            <label>
                Old Password:
                <input 
                    type="password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    required 
                />
            </label>
            <br />
            <label>
                New Password:
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                />
            </label>
            <br />
            <label>
                Confirm Password:
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
            </label>
            <br />
            <button type="submit">Update Password</button>
        </form> */}
       </>
    );
};

export default ForgotPassword;
