import React, { useEffect, useState } from 'react';

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            fetch('https://localhost:8000/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserDetails(data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
        }
    }, []);

    if (!userDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            {/* Display other user details as needed */}
            {userDetails.map((value) =>
            <p>{value.email}</p>
            )}
        </div>
    );
}

export default UserProfile;
