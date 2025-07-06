import React, { useState } from 'react';
import './App.css';
import butterfly from './assets/butterfly.png'; // You need to add a butterfly image to src/assets
import { useNavigate } from 'react-router-dom';
import { loginUser } from './scripts/apiLogin';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await loginUser(username, password);
      navigate('/learn');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <img src={butterfly} alt="Butterfly" className="butterfly-img" />
          <h1 className="psychl-title">PsychL</h1>
          <div className="psychl-subtitle">Link & Learn</div>
        </div>
        <div className="login-frame">
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username" className="login-label">Username</label>
            <input id="username" type="text" className="login-input" value={username} onChange={e => setUsername(e.target.value)} />
            <label htmlFor="password" className="login-label">Password</label>
            <input id="password" type="password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} />
            <div className="login-btns">
              <button className="login-btn" type="submit">Login</button>
              <button className="register-btn" type="button" onClick={() => navigate('/role')}>Register</button>
            </div>
            {error && <div style={{color:'red',textAlign:'center',marginTop:'1rem'}}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
