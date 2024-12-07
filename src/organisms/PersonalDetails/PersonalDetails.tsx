import React, { useContext, useState } from "react";
import CvioContext from "../../hoc/provider/cvioProvider";
import Header from "../Header/Header";
import "./PersonalDetails.css";
import "./Personalerror.interface"
import { ICvioContextProps, IPersonalDetails } from "../../hoc/provider/cvioProvider.interface";
import { SyntheticEvent } from "../../interfaces/Cvio.inteface";
import { JOURNEY_STAGES } from "../../constants/Common.constants";

const PersonalDetails = () => {
  const { personalDetails, setPersonalDetails, setJourneyStage } = useContext(CvioContext) as ICvioContextProps;
  const [localPersonalDetails, setlocalPersonalDetails] = useState<IPersonalDetails>(personalDetails);
  const [touchedFields, setTouchedFields] = useState<IErrors>({});
  const [errors, setErrors] = useState<IErrors>({});

  // const validateField = (name: string, value: string) => {
  //   let fieldError = "";

  //   if (name === "fullName" && !value.trim()) {
  //     fieldError = "Enter your full name";
  //   } else if (name === "linkdinProfileUrl" && !value.trim()) {
  //     fieldError = "Enter your LinkedIn profile URL";
  //   } else if (name === "email" && !value.includes("@")) {
  //     fieldError = "Enter a valid email";
  //   } else if (name === "phone" && value.length !== 10) {
  //     fieldError = "Enter a valid 10-digit phone number";
  //   } else if (name === "description" && !value.trim()) {
  //     fieldError = "Describe yourself";
  //   } else if (name === "city" && !value.trim()) {
  //     fieldError = "Enter your city";
  //   } else if (name === "state" && !value.trim()) {
  //     fieldError = "Enter your state";
  //   }

  //   return fieldError;
  // };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setPersonalDetails(localPersonalDetails);
      setJourneyStage(JOURNEY_STAGES.WORK_EXPERIENCE);
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target;
    setlocalPersonalDetails({
      ...localPersonalDetails,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      // [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e: SyntheticEvent) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // const fieldError = validateField(name, value);
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: fieldError,
    // }));
  };

  const validate = () => {
    let formErrors: { [key: string]: string } = {};
    Object.keys(localPersonalDetails).forEach((fieldName: string) => {
      // const fieldError = validateField(fieldName, localPersonalDetails[fieldName]);
      // if (fieldError) formErrors[fieldName] = fieldError;
    });
    return formErrors;
  };

  return (
    <>
      <Header />

      <div className="main_container">
        <p className="Per_heading">Personal Details</p>

        <div className="Per_container">
          <form onSubmit={handleSubmit}>
            <div className="Per_sub_container">
              <div>
                <input
                  type="text"
                  name="fullName"
                  className={`Per_input ${errors.fullName && touchedFields.fullName ? "error" : ""}`}
                  placeholder={errors.fullName && touchedFields.fullName ? errors.fullName : "Full Name"}
                  value={localPersonalDetails.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="linkdinProfileUrl"
                  className={`Per_input ${errors.linkdinProfileUrl && touchedFields.linkdinProfileUrl ? "error" : ""}`}
                  placeholder={errors.linkdinProfileUrl && touchedFields.linkdinProfileUrl ? errors.linkdinProfileUrl : "LinkedIn Profile URL"}
                  value={localPersonalDetails.linkdinProfileUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={errors.email && touchedFields.email ? errors.email : "Email"}
                  className={`Per_input ${errors.email && touchedFields.email ? "error" : ""}`}
                  value={localPersonalDetails.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={errors.phone && touchedFields.phone ? errors.phone : "Phone Number"}
                  className={`Per_input ${errors.phone && touchedFields.phone ? "error" : ""}`}
                  value={localPersonalDetails.phone}
                  onChange={handleChange}
                  maxLength={10}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  placeholder={errors.city && touchedFields.city ? errors.city : "City"}
                  className={`Per_input ${errors.city && touchedFields.city ? "error" : ""}`}
                  value={localPersonalDetails.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="state"
                  placeholder={errors.state && touchedFields.state ? errors.state : "State"}
                  className={`Per_input ${errors.state && touchedFields.state ? "error" : ""}`}
                  value={localPersonalDetails.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="Per_textarea">
                <textarea
                  id="Per_textarea"
                  name="description"
                  cols={79}
                  rows={9}
                  placeholder={errors.description && touchedFields.description ? errors.description : "Professional Summary"}
                  className={`Per_textarea ${errors.description && touchedFields.description ? "error" : ""}`}
                  value={localPersonalDetails.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

            </div>

            <div className="Per_btn_container">
              <button className="Per_nextBtn" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
