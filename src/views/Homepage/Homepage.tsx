import React, { useContext } from "react";
import Header from "../../organisms/Header/Header";
import './Homepage.css'
import { JOURNEY_STAGES } from "../../constants/Common.constants";
import CvioContext from "../../hoc/provider/cvioProvider";

const HomePage = () => {
  const { setJourneyStage } = useContext(CvioContext);

   function update() {
    setJourneyStage(JOURNEY_STAGES.PERSONAL_DETAILS)
   }
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
            <button className='home_start_btn' onClick={update} >Get Started</button>
          </div>
        </div>
        <div className='home_rightContainer'>
          <img className='home_bg' src="/resumebackground.jpg" alt="resume.jpg" />
        </div>

      </div>
    </>
  );
};

export default HomePage;
// looks good