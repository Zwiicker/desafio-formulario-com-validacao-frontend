// src/App.jsx
import React from 'react';
import JobApplicationForm from './JobApplicationForm.jsx'; // Importa o componente do formulário

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 p-4">
      <JobApplicationForm />
    </div>
  );
};

export default App;
