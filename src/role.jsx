import React, { useState } from 'react';
import './App.css';
import butterfly from './assets/butterfly.png';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const [dropdownValue, setDropdownValue] = useState('Yes');
  const [role, setRole] = useState('doctor');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nextRole = 'doctor';
    if (dropdownValue === 'Yes') {
      nextRole = 'doctor';
    } else {
      nextRole = 'patient';
    }
    setRole(nextRole);
    if (nextRole === 'doctor') {
      navigate('/register-professional');
    } else {
      navigate('/register-patient');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <img src={butterfly} alt="Butterfly" className="butterfly-img" />
          <h1 className="psychl-title">PsychL</h1>
        </div>
        <div className="role-frame">
          <form className="role-form" onSubmit={handleSubmit}>
            <label className="role-label">Are you a professional?</label>
            <select className="role-input" value={dropdownValue} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No I am not</option>
            </select>
            <button className="login-btn" type="submit">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Role;
