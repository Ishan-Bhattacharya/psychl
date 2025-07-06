import React, { useState } from 'react';
import './App.css';
import butterfly from './assets/butterfly.png';
import { useNavigate } from 'react-router-dom';
import { registerPatient } from './scripts/apiPatient';

const RegisterPatient = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    username: '',
    email: '',
    phone_number: '',
    age: '',
    address: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted({ ...form });
    setError(null);
    // Prepare patient data as per API schema
    const patientData = {
      username: form.username,
      password: form.password,
      email: form.email,
      phone_number: form.phone_number,
      name: form.name,
      role: 'patient',
      gender: form.gender,
      bio_data: {
        age: Number(form.age),
        address: form.address,
      },
    };
    try {
      await registerPatient(patientData);
      navigate('/learn');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <img src={butterfly} alt="Butterfly" className="butterfly-img" />
          <h1 className="psychl-title">PsychL</h1>
        </div>
        <h2 className="register-title">Register as patient/learner</h2>
        <div className="register-frame">
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-label">Name</label>
            <input className="register-input" name="name" value={form.name} onChange={handleChange} />
            <label className="register-label">Gender</label>
            <input className="register-input" name="gender" value={form.gender} onChange={handleChange} />
            <label className="register-label">Username</label>
            <input className="register-input" name="username" value={form.username} onChange={handleChange} />
            <label className="register-label">Email Id</label>
            <input className="register-input" name="email" value={form.email} onChange={handleChange} />
            <label className="register-label">Phone Number</label>
            <input className="register-input" name="phone_number" value={form.phone_number} onChange={handleChange} />
            <label className="register-label">Age</label>
            <input className="register-input" name="age" value={form.age} onChange={handleChange} />
            <label className="register-label">Address</label>
            <input className="register-input" name="address" value={form.address} onChange={handleChange} />
            <label className="register-label">Password</label>
            <input className="register-input" type="password" name="password" value={form.password} onChange={handleChange} />
            <button className="register-btn" type="submit">Register</button>
          </form>
          {error && <div style={{color:'red',textAlign:'center',marginTop:'1rem'}}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient; 