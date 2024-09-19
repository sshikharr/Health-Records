import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Health Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/signin" className="hover:underline">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
