import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/home/Home";
import Education from "./components/education/Education"
import PersonalDetails from './components/PersonalDetails/PersonalDetails';
import Experience from "./components/experience/Experience";
import Project from "./components/project-info/Project";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Skills from "./components/skills/Skills"
import Resume from "./components/resume_page/Resume"
import { ResumeProvider } from "./context/ResumeContext";

function App() {
  return (
    <ResumeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal" element={<PersonalDetails />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/project" element={<Project />} />
        <Route path="skills" element={<Skills />} />
        <Route path="/education" element={<Education />} />
        <Route path="resume" element={<Resume/>} />
      </Routes>
    </Router>
    </ResumeProvider>
  );
}

export default App;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Register.css'

// const Register = () => {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const [errors, setErrors] = useState({
//         username: false,
//         email: false,
//         password: false,
//         confirmPassword: false
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value
//         });
//     };

//     const validateForm = () => {
//         let valid = true;
//         let errorsCopy = { ...errors };

//         if (form.password !== form.confirmPassword) {
//             errorsCopy.confirmPassword = true;
//             valid = false;
//         }

//         Object.keys(form).forEach((key) => {
//             if (!form[key]) {
//                 errorsCopy[key] = true;
//                 valid = false;
//             } else {
//                 errorsCopy[key] = false;
//             }
//         });

//         setErrors(errorsCopy);
//         return valid;
//     };

//     const onRegister = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             // Perform registration logic here
//             console.log('Form submitted successfully', form);
//             navigate('/login'); // Redirect to login on success
//         } else {
//             console.log('Form validation failed');
//         }
//     };

//     return (
//         <div className="register_container">
//             <div className="register_form">
//                 <div className="register_heading">Register</div>
//                 <form onSubmit={onRegister}>
//                     <div>
//                         <input
//                             type="text"
//                             className="inputtext"
//                             name="username"
//                             placeholder="username"
//                             value={form.username}
//                             onChange={handleChange}
//                         />
//                         {errors.username && <span className="error">Username is required</span>}
//                     </div>
//                     <div>
//                         <input
//                             className='register_input'
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="email"
//                             value={form.email}
//                             onChange={handleChange}
//                         />
//                         {errors.email && <span className="error">Email is required</span>}
//                     </div>
//                     <div>
//                         <input
//                             className='register_input'
//                             type="password"
//                             id="password"
//                             name="password"
//                             placeholder="password"
//                             value={form.password}
//                             onChange={handleChange}
//                         />
//                         {errors.password && <span className="error">Password is required</span>}
//                     </div>
//                     <div>
//                         <input
//                             className='register_input'
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             placeholder="confirm password"
//                             value={form.confirmPassword}
//                             onChange={handleChange}
//                         />
//                         {errors.confirmPassword && <span className="error">Passwords must match</span>}
//                     </div>
                    
//                     <div className="register_btn">
//                         <button className="submit" type="submit" disabled={!form.username || !form.email || form.password !== form.confirmPassword}>
//                             Register
//                         </button>
//                     </div>
//                 </form>
//                 <div className="signinText">
//                     <span style={{ color: 'black' }}>Already have an account?</span>
//                     <span style={{ margin: '4px' }}>
//                         <Link to="/login">Sign In</Link>
//                     </span>
//                 </div>
//             </div>
//             <div className="InfoContainer">
//                 <div className="header">
//                     <img src="resume.png" alt="Your CV" />
//                     <span>Your CV</span>
//                 </div>
//                 <div className="info">
//                     <span>Make a CV to define yourself the right way. Meet </span>
//                     <span>thousands of job announcements and employers</span>
//                     <span> by the help of your profile with a private extension, </span>
//                     <span> which you can share in all social </span>
//                     <span>media environments.</span>
//                 </div>
//                 <footer className="footer">
//                     <button className="login" onClick={() => navigate('/login')}>Login</button>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default Register;

