import React, { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';



function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate  = useNavigate ();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('User');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setUsername(storedUser); // Set username if logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('isLoggedIn', false); // Remove user from localStorage on logout
    navigate('/login');
    window.location.reload()
  }; 

  return (
    <>
      <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
    </>
  )
}
export default Dashboard;
