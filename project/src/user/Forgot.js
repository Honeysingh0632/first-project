import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';
import { IoBookSharp } from "react-icons/io5";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
	const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseurl}/api/password-reset`, { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset email");
        }
    };

    return (
        <>
         <div className="container login-main1 mt-2 ">
            <div className="row">
                <div className="col-lg">
               
                    
                    <div className="container  login-main m-auto mt-4  p-5 ">
                        <div className="left-31  ">
                                <h1 className="text-center fs-3 left-4-tx"> <i className='  log-i'><IoBookSharp /></i> Library</h1>

                                <h1 className="text-center mt-3">Forgot Password <span className="hi-1">!</span></h1>

                                <p className="text-center ">Enter your Credentials to access your account</p>

                        </div>
                        <div className="right-3 w-50 ">

                            <div className="show-div">
                            <h1 className="text-center fs-3"> <i className='  log-i'><IoBookSharp /></i> Library</h1>

                                <h1 className="text-center mt-1">Welcome Back<span className="hi-1">!</span></h1>

                                <p className="text-center ">Enter your Credentials to access your account</p>
                            </div>
                            <h1 className='' >Change or reset your password</h1>
                            <p>You can change your password for security reasons or reset it if you forget it. Your Google Account password is used to access many Google products, like Gmail and YouTube.</p>
                                <form  className="mt-5 ">
                                    <label for="email" className="label">Email</label><br />

                                    <input name="email" id="email" 
                                  
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                
                                     className="input-login1 mt-3 "
                                     ></input>
                                        <br /><br />

                                   
                               

                                     <br/>
                                   
                                     {error && <div className={styles.error_msg}>{error}</div>}

                                    <button className="login mt-2 w-50" onClick={handleSubmit} type="submit">Send Link</button>

                                    <br />
                                <h6 className='mt-2'>or</h6>
                                <br />
                                <div className="other-login">
                                    <p className="border bordre-dark yup p-2 me-4"> <img className="google-icon " src={require('./images/google.jpeg')} />Continue with google</p>
                                    <p className="border bordre-dark p-2"><img className="google-icon " src={require('./images/apple.jpeg')} />Continue with apple</p>

                                </div>

                                <div className="d-flex mt-4 link-1 ">
                                    <p >Don't have an account</p>
                                    <Link to="/signup" className="link-0 ms-2 ">sign up</Link>
                                </div> 
                                
                                 

                                </form>
                               
                               

                               
                        </div>
                        {/* <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <button type="submit">Send Reset Email</button>
        </form> */}
                    
                        
                       
                    </div>
                </div>
            </div>
        </div>
        </>
       
    );
};

export default ForgotPassword;
