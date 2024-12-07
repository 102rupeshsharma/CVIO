import React, { useContext, useState } from "react";
import CvioContext from "../../hoc/provider/cvioProvider";
import Header from "../Header/Header";
import "./WorkExperience.css";
import "./WorkExperience.interface";
import "react-datepicker/dist/react-datepicker.css";
import { SyntheticEvent } from "../../interfaces/Cvio.inteface";
import { IWorkExperienceDetails } from "./WorkExperience.interface";
import { IWorkExperience } from "../../hoc/provider/cvioProvider.interface";
import { JOURNEY_STAGES } from "../../constants/Common.constants";

const Experience = () => {
  const { workExperience, setWorkExperience, setJourneyStage } = useContext(CvioContext);
  const [localWorkExperience, setLocalWorkExperience] = useState<Array<IWorkExperience>>(workExperience);
  const [touchedFields, setTouchedFields] = useState<Array<IWorkExperienceDetails>>([]);
  const [errors, setErrors] = useState<Array<IWorkExperienceDetails>>([]);

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    if (name === "company" && !value) errorMessage = "*Enter company name";
    if (name === "position" && !value) errorMessage = "*Enter position";
    if (name === "city" && !value) errorMessage = "*Enter city";
    if (name === "description" && !value) errorMessage = "*Enter job description";
    return errorMessage;
  };

  const handleChange = (e: SyntheticEvent, index: number) => {
    const { name, value } = e.target;
    const updatedExperience = [...localWorkExperience];
    updatedExperience[index][name] = value;
    setLocalWorkExperience(updatedExperience);

    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [name]: validateField(name, value) };
      return newErrors;
    });
  };

  const handleBlur = (e: SyntheticEvent, index: number) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);

    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [name]: errorMessage };
      return newErrors;
    });

    setTouchedFields((prevTouched) => {
      const newTouched = [...prevTouched];
      newTouched[index] = { ...newTouched[index], [name]: true };
      return newTouched;
    });
  };

  const addMore = () => {
    setLocalWorkExperience([
      ...localWorkExperience,
      { company: "", position: "", startDate: "", endDate: "", city: "", description: "" }
    ]);
    setErrors([...errors, {}]);
    setTouchedFields([...touchedFields, {}]);
  };

  const remove = (index: number) => {
    const updatedList = [...localWorkExperience];
    updatedList.splice(index, 1);
    setLocalWorkExperience(updatedList);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);

    const updatedTouched = [...touchedFields];
    updatedTouched.splice(index, 1);
    setTouchedFields(updatedTouched);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const validationErrors = localWorkExperience.map((exp) => {
      return {
        // company: validateField("company", exp.company),
        // position: validateField("position", exp.position),
        // startDate: validateField("startDate", exp.startDate),
        // endDate: validateField("endDate", exp.endDate),
        // city: validateField("city", exp.city),
        // description: validateField("description", exp.description)
      };
    });

    setErrors(validationErrors);

    const isValid = validationErrors.every((error) =>
      Object.values(error).every((err) => !err)
    );

    if (isValid) {
      setWorkExperience(localWorkExperience);
      setJourneyStage(JOURNEY_STAGES.PROJECT);
    }
  };

  return (
    <>
      <Header />
      <div className="main_container">
        <p className="work_heading">Experience</p>
        <div className="ed_container">
          <form onSubmit={handleSubmit}>
            {localWorkExperience.map((detail, i) => (
              <div className="work_sub_container" key={i}>
                <div>
                  <input
                    type="text"
                    name="company"
                    value={detail.company}
                    onChange={(e) => handleChange(e, i)}
                    onBlur={(e) => handleBlur(e, i)}
                    placeholder="Company Name"
                    className="work_inputtext"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="position"
                    value={detail.position}
                    onChange={(e) => handleChange(e, i)}
                    onBlur={(e) => handleBlur(e, i)}
                    placeholder="Position"
                    className="work_inputtext"
                  />
                </div>

                <div className="work_date_Container">
                  <input
                    type="month"
                    name="startDate"
                    value={detail.startDate}
                    onChange={(e) => handleChange(e, i)}
                    className="work_inputtext"
                    placeholder="Start date"
                  />
                  <input
                    type="month"
                    name="endDate"
                    value={detail.endDate}
                    onChange={(e) => handleChange(e, i)}
                    className="work_inputtext"
                    placeholder="End date"
                  />
                </div>

                <div className="work_city">
                  <input
                    type="text"
                    name="city"
                    value={detail.city}
                    onChange={(e) => handleChange(e, i)}
                    onBlur={(e) => handleBlur(e, i)}
                    placeholder="City"
                    className="work_inputtext"
                  />
                </div>

                <div className="work_textarea">
                  <textarea
                    name="description"
                    value={detail.description}
                    onChange={(e) => handleChange(e, i)}
                    onBlur={(e) => handleBlur(e, i)}
                    cols={98}
                    rows={9}
                    style={{ resize: "vertical" }}
                    placeholder="Summary"
                    id="work_textarea"
                  ></textarea>
                </div>

                <div>
                  {localWorkExperience.length > 1 && (
                    <button type="button" className="add_remove" onClick={() => remove(i)} disabled={localWorkExperience.length <= 1}>
                      Remove
                    </button>
                  )}
                  {i === localWorkExperience.length - 1 && (
                    <button type="button" className="add_remove" onClick={addMore}>
                      Add More
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="work_btn_container">
              <button
                type="button"
                className="work_btn"
                onClick={() => setJourneyStage(JOURNEY_STAGES.PERSONAL_DETAILS)}
              >
                Back
              </button>
              <button type="submit" className="work_btn">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Experience;
