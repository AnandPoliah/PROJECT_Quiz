import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import QICON from '../../Files/QICON.jpg';
import { QuizContext } from '../context/QuizContext';

const LoginComponent = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [notification, setNotification] = useState({ message: '', type: '' }); // State for notification
  const { setUsername } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/user/getUser') 
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleLogin = (e) => 
  {
    e.preventDefault();
    const foundUsers = users.filter(user => user.username === loginDetails.username);

    if (foundUsers.length > 0 && foundUsers[0].password === loginDetails.password) 
    {
      setUsername(foundUsers[0].username);
      setNotification({ message: 'Login Successful', type: 'success' });
      setTimeout(() => 
      {
        setNotification({ message: '', type: '' });
        onClose();
        navigate('/');
      }, 2000); // Show notification for 2 seconds before navigating
    } 
    else if (foundUsers.length > 0) 
    {
      setNotification({ message: 'Incorrect Login Details', type: 'error' });
    } 
    else 
    {
      setNotification({ message: 'User not found. Please Sign Up', type: 'error' });
      setTimeout(() => navigate('/signup'), 2000); // Navigate after 2 seconds
    }
  };

  const handleInputChange = (e) => 
  {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className='outerdiv'>
      <div className='innerdiv'>
        <div className='innerdiv01'>
          <img src={QICON} alt='Login Icon' className='imgsrc' />
        </div>
        <div className='innerdiv02'>
          <form onSubmit={handleLogin} className='outerform'>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={loginDetails.username}
              onChange={handleInputChange}
              className='input'
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginDetails.password}
              onChange={handleInputChange}
              className='input'
            />
            <button type="submit" className="button-63">Login</button>
          </form>
          <div className='signup-login'>
            <p>Don't have an account?</p> 
            <p className='para'><button className='signup-button' onClick={() => navigate('/signup')}>Sign Up</button></p>
          </div>
        </div>
      </div>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
