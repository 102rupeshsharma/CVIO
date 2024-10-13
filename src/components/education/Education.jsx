import React, { useState, useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import "./Education.css";
import "react-datepicker/dist/react-datepicker.css";

const Education = () => {
  const { Education, setEducation } = useContext(ResumeContext);
  const [localEducation, setLocalEducation] = useState(Education);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...localEducation];
    updatedEducation[index][name] = value;
    setLocalEducation(updatedEducation);
    
    // Clear specific error when a field is updated
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [name]: "" };
      return newErrors;
    });
  };

  const handleBlur = (index, e) => {
    validateField(index, e);
  };

  const validateField = (index, e) => {
    const { name, value } = e.target;
    const newErrors = [...errors];

    if (!value) {
      if (name === "school") newErrors[index] = { ...newErrors[index], school: "Enter college name" };
      if (name === "degree") newErrors[index] = { ...newErrors[index], degree: "Enter degree" };
      if (name === "city") newErrors[index] = { ...newErrors[index], city: "Enter city" };
      if (name === "description") newErrors[index] = { ...newErrors[index], description: "Enter description" };
    } else {
      newErrors[index] = { ...newErrors[index], [name]: "" }; // Clear error for the field if value is present
    }

    setErrors(newErrors);
  };

  const addMore = () => {
    setLocalEducation([
      ...localEducation,
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ]);

    setErrors([...errors, {}]); // Add a new blank error object for the new education entry
  };

  const remove = (index) => {
    const updatedList = [...localEducation];
    updatedList.splice(index, 1);
    setLocalEducation(updatedList);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  // Function to validate the entire form
  const validateForm = () => {
    const formErrors = localEducation.map((edu) => {
      const errorObj = {};
      if (!edu.school) errorObj.school = "Enter college name";
      if (!edu.degree) errorObj.degree = "Enter degree";
      if (!edu.city) errorObj.city = "Enter city";
      if (!edu.description) errorObj.description = "Enter description";
      return errorObj;
    });

    setErrors(formErrors);
    return formErrors.every((error) => Object.keys(error).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setEducation(localEducation);
      navigate("/resume");
    }
  };

  return (
    <>
      <Header />
      <div className="main_container">
      <div className="ed_heading">Education Info</div>
      <div className="ed_container">
        <form onSubmit={handleSubmit}>
          {localEducation.map((detail, i) => (
            <div key={i} className="ed_sub_container">
              {/* School Input */}
              <div>
                <input
                  type="text"
                  name="school"
                  className="ed_input"
                  placeholder="College"
                  value={detail.school}
                  onChange={(e) => handleChange(i, e)}
                  onBlur={(e) => handleBlur(i, e)} // Validate on blur
                />
                {errors[i]?.school && <small className="error-message">{errors[i].school}</small>}
              </div>

              {/* Degree Input */}
              <div>
                <input
                  type="text"
                  name="degree"
                  className="ed_input"
                  placeholder="Degree"
                  value={detail.degree}
                  onChange={(e) => handleChange(i, e)}
                  onBlur={(e) => handleBlur(i, e)} // Validate on blur
                />
                {errors[i]?.degree && <small className="error-message">{errors[i].degree}</small>}
              </div>

              {/* Start and End Date Inputs */}
              <div className="ed_date_Container">
                <input
                  type="month"
                  name="startDate"
                  className="ed_input"
                  placeholder="Start date"
                  value={detail.startDate}
                  onChange={(e) => handleChange(i, e)}
                  onBlur={(e) => handleBlur(i, e)} // Validate on blur
                />
                
                <input
                  type="month"
                  name="endDate"
                  className="ed_input"
                  placeholder="End date"
                  value={detail.endDate}
                  onChange={(e) => handleChange(i, e)}
                  onBlur={(e) => handleBlur(i, e)} // Validate on blur
                />
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  className="ed_input"
                  placeholder="City"
                  value={detail.city}
                  onChange={(e) => handleChange(i, e)}
                  onBlur={(e) => handleBlur(i, e)} // Validate on blur
                />
                {errors[i]?.city && <small className="error-message">{errors[i].city}</small>}
              </div>

              {/* Description Textarea */}
              <div className="ed_textarea">
                <textarea
                  name="description"
                  id="ed_textarea"
                  cols="95"
                  rows="5"
                  style={{ resize: "vertical" }}
                  placeholder="Description: e.g. Graduated with High Honors"
                  value={detail.description}
                  onChange={(e) => handleChange(i, e)}
                  onBlur={(e) => handleBlur(i, e)} // Validate on blur
                ></textarea>
                {errors[i]?.description && <small className="error-message">{errors[i].description}</small>}
              </div>

              {/* Add/Remove Buttons */}
              <div className="ed_button_container">
                {localEducation.length > 1 && (
                  <button
                    type="button"
                    className="ed_add_remove"
                    onClick={() => remove(i)}
                  >
                    Remove
                  </button>
                )}
                {i === localEducation.length - 1 && (
                  <button type="button" className="ed_add_remove" onClick={addMore}>
                    Add More
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Back and Next Buttons */}
          <div className="ed_btn_container">
            <button
              type="button"
              onClick={() => navigate("/skills")}
              className="ed_button"
            >
              Back
            </button>
            <button
              type="submit"
              className="ed_button"
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

export default Education;
