import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import { SyntheticEvent } from '../../interfaces/Cvio.inteface';
import { IRegisterForm, IRegisterFormErrors } from './Register.interface';

const Register = () => {
    const [form, setForm] = useState<IRegisterForm>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<IRegisterFormErrors>({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const handleChange = (e: SyntheticEvent) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validateForm = () => {
        let valid = true;
        let errorsCopy = { ...errors };

        if (form.password !== form.confirmPassword) {
            errorsCopy.confirmPassword = true;
            valid = false;
        }

        Object.keys(form).forEach((key) => {
            if (!form[key]) {
                errorsCopy[key] = true;
                valid = false;
            } else {
                errorsCopy[key] = false;
            }
        });

        setErrors(errorsCopy);
        return valid;
    };

    const onRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        if (validateForm()) {
            fetch(process.env.REACT_APP_REGISTER_URL as string, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username:form.username,
                    email: form.email,
                    password: form.password
                })
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error ("Login Failed!");
                }
                return response.json();
            })
            .then(data => {
                console.log("Received JSON data : ", data)

                if (data.message === "User registered successfully") {
                    toast.success("Registration Successfull!");
                    document.location.href = "/login";
                }
                else {
                    toast.error("Failed to register!");
                }
            })
            .catch(error => {
                toast.error("Error in registration!");
            });
        } else {
            toast.error("Failed to register");
        }
    };

    return (
        <>
        <div className='register_main_container'>
        <div className="register_container">
            <div className="register_form">
                <div className="register_heading">Register</div>
                <form onSubmit={onRegister}>
                    <div>
                        <input
                            type="text"
                            className='text_input'
                            name="username"
                            placeholder="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span className="error">Username is required</span>}
                    </div>
                    <div>
                        <input
                            className='text_input'
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div>
                        <input
                            type="password"
                            className='text_input'
                            name="password"
                            placeholder="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    <div>
                        <input
                            className='text_input'
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="error">Passwords must match</span>}
                    </div>
                    
                    <div className="register_btn">
                        <button className="submit" type="submit" disabled={!form.username || !form.email || form.password !== form.confirmPassword}>
                            Register
                        </button>
                    </div>
                </form>
                <div className="signinText">
                    <span style={{ color: 'black' }}>Already have an account?</span>
                    <span style={{ margin: '4px' }}>
                        <Link to="/login">Sign In</Link>
                    </span>
                </div>
            </div>
            <div className="InfoContainer">
                <div className="header">
                    <img src="resume.png" alt="Your CV" />
                    <span>Your CV</span>
                </div>
                <div className="info">
                    <span>Make a CV to define yourself the right way. Meet </span>
                    <span>thousands of job announcements and employers</span>
                    <span> by the help of your profile with a private extension, </span>
                    <span> which you can share in all social </span>
                    <span>media environments.</span>
                </div>
                <footer className="footer">
                    <button className="login" onClick={() => document.location.href = "/login"}>Login</button>
                </footer>
            </div>
        </div>
        </div>
        </>
    );
};

export default Register;