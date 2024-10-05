import React from "react";
import Header from "../header/Header"
import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    
  return (
    <>
      <Header />

      <div className='home_container'>

        <div className='home_leftcontainer'>

          <div className='home_heading'>
            Build Your Resume Easily To Get Job Ready.
          </div>

          <div className='home_subHeading'>
            Build your resume to get hired by the world's top companies.
          </div>

          <div>
            <button className='home_start_btn' onClick={() => navigate('/personal')}>Get Started</button>
          </div>

        </div>

        <div className='home_rightContainer'>
          <img className='home_bg' src="background.jpg" alt="resume.jpg" />
        </div>

      </div>
    </>
  );
};

export default Home;
