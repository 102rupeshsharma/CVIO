import React, { useState, useContext } from 'react';
import Header from "../Header/Header";
import './Skills.css';
import CvioContext from '../../hoc/provider/cvioProvider';
import { SyntheticEvent } from '../../interfaces/Cvio.inteface';
import { JOURNEY_STAGES } from '../../constants/Common.constants';

const Skills = () => {
  const { skills, setSkills, setJourneyStage } = useContext(CvioContext);
  const [skillValue, setSkillValue] = useState('');
  const [error, setError] = useState('');

  const addSkill = () => {
    if (skillValue.length < 2) {
      setError('*Add at least one valid skill');
    } else if (skills.includes(skillValue)) {
      setError('*Skill already added');
    } else {
      setSkills([...skills, skillValue]);
      setSkillValue('');
      setError('');
    }
  };

  const deleteSkill = (skillToDelete: string) => {
    setSkills(skills.filter((skill: string) => skill !== skillToDelete));
  };

  const handleInputChange = (event: SyntheticEvent) => {
    setSkillValue(event.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (skills.length === 0) {
      setError('*Add at least one skill');
    } else {
      setError('');
      setJourneyStage(JOURNEY_STAGES.EDUCATION)
    }
  };

  return (
    <>
      <Header />
      <div className="main_container">
      <div className="skill_heading">Skills</div>

      <div className="skill_container">
        <form onSubmit={handleSubmit}>
          <div className="skill_sub_container">
            <div className="skills_input_container">
              <input
                type="text"
                className="skill_input"
                placeholder="Skills"
                name="skill"
                value={skillValue}
                onChange={handleInputChange}
                aria-label="Input for adding a skill"
              />
              {error && <small className="error_message">{error}</small>}
            </div>
            <button
              disabled={skillValue.length < 2}
              type="button"
              className="skill_addbtn"
              onClick={addSkill}
            >
              Add
            </button>
          </div>

          <div className="skills">
            {skills.map((skill: string, index: number) => (
              <span key={index} className="skills_tag">
                {skill}
                <button
                  type="button"
                  className="delete-skill"
                  onClick={() => deleteSkill(skill)}
                  aria-label={`Delete ${skill}`}
                >
                  x
                </button>
              </span>
            ))}
          </div>

          <div className="skill_btn_container">
            <button
              type="button"
              onClick={() => setJourneyStage(JOURNEY_STAGES.PROJECT)}
              className="skill_btn"
            >
              Back
            </button>
            <button
              type="submit"
              className="skill_btn"
            >
              Next
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default Skills;
