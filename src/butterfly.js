import React from 'react';

const Butterfly = ({ width = 48, height = 48 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left wing */}
    <ellipse cx="20" cy="32" rx="16" ry="24" fill="#b25bb2" fillOpacity="0.8" />
    <ellipse cx="20" cy="32" rx="12" ry="18" fill="#f8ea7e" fillOpacity="0.7" />
    {/* Right wing */}
    <ellipse cx="44" cy="32" rx="16" ry="24" fill="#b25bb2" fillOpacity="0.8" />
    <ellipse cx="44" cy="32" rx="12" ry="18" fill="#f8ea7e" fillOpacity="0.7" />
    {/* Body */}
    <rect x="29" y="20" width="6" height="24" rx="3" fill="#23222b" />
    {/* Antennae */}
    <path d="M32 20 Q28 10 24 16" stroke="#23222b" strokeWidth="2" fill="none" />
    <path d="M32 20 Q36 10 40 16" stroke="#23222b" strokeWidth="2" fill="none" />
    {/* Head */}
    <circle cx="32" cy="18" r="4" fill="#23222b" />
  </svg>
);

export default Butterfly; 