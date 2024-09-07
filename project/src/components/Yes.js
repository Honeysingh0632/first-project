import React, { useState } from 'react';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-dropdown">
            <button className="profile-button" onClick={toggleDropdown}>
                Profile
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li><a href="/profile">My Profile</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            )}
        </div>
    );
};

export default ProfileDropdown;
