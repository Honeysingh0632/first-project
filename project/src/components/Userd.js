import React, { useEffect, useState } from 'react';

const Userd = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await fetch('/api/user/details', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }

                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                {user ? <li>Welcome, {user.name}</li> : <li>Login</li>}
            </ul>
        </nav>
    );
};

export default Userd;
