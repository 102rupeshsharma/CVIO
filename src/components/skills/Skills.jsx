import React, { useState, useContext } from 'react';
import Header from "../header/Header";
import { useNavigate } from 'react-router-dom';
import './Skills.css';
import { ResumeContext } from '../../context/ResumeContext';

const Skills = () => {
  const navigate = useNavigate();
  const { skills, setSkills } = useContext(ResumeContext);
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

  const deleteSkill = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleInputChange = (event) => {
    setSkillValue(event.target.value);
    // Clear error message when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (skills.length === 0) {
      setError('*Add at least one skill');
    } else {
      setError('');
      navigate('/education');
    }
  };

  return (
    <>
      <Header />
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
            {skills.map((skill, index) => (
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
              onClick={() => navigate('/project')}
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
    </>
  );
};

export default Skills;
