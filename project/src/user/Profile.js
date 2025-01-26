import React from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbPasswordUser } from 'react-icons/tb';
import Navbar from '../components/Navbar';
import Rugh from '../components/Rugh';
import Footer from '../components/Footer';
import { FaShoppingCart } from 'react-icons/fa';

function Profile() {
    const { data, isLoading } = useAuth(); // Correct use of useAuth hook

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <Rugh />

            <div className="container text-dark">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="text-start p-3">
                            {data ? (
                                <>
                                    <h3 className="text-dark">{data.firstName} {data.lastName}</h3>
                                    <p className="text-dark">
                                        <strong>Email:</strong> {data.email}
                                    </p>
                                </>
                            ) : (
                                <p className="text-light">
                                    <Link to="/signup" className="text fs-4">Register or Log in</Link>
                                </p>
                            )}

                            <p className="text-dark fs-4">
                                <CgProfile /> <Link to='/user' className="link text-hov text-dark">My Profile</Link>
                            </p>
                            <p className="text-dark fs-3">
                                <IoSettingsOutline /> <Link to="/Editprofile" className="text text-dark fs-4 link text-hov">Edit Profile</Link>
                            </p>
                            <p className="text-dark fs-3">
                                <TbPasswordUser /> <Link to="/Changepassword" className="text text-dark fs-4 link text-hov">Change Password</Link>
                            </p> 
                              <p className="text-dark fs-3"> <FaShoppingCart/> <Link to="/OrderList" 
                                               className="text text-dark fs-4 link text-hov">OrderS</Link></p>
                        </div>
                    </div>

                    {/* <div className="col-lg-6">
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={require('../components/images/books.jpeg')} alt="Book 1" className="book1" />
                                </div>
                                <div className="col-lg-3">
                                    <img src={require('../components/images/book2.jpeg')} alt="Book 2" className="book1" />
                                </div>
                                <div className="col-lg-3">
                                    <img src={require('../components/images/books3.jpeg')} alt="Book 3" className="book1" />
                                </div>
                                <div className="col-lg-3">
                                    <img src={require('../components/images/books4.jpeg')} alt="Book 4" className="book1" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Profile;
