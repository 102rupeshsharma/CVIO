import React, { useContext, useRef } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import styles from "./Resume.module.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Resume = () => {
  const { PersonalDetails, workExperience, Project, skills, Education } =
    useContext(ResumeContext);
  const resumeRef = useRef();

  const downloadResume = () => {
    const resumeElement = resumeRef.current;

    html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF("portrait", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Example.pdf");
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div id={styles.Cv_container}>
          <div className={styles.cv_content} ref={resumeRef}>
            <div className={styles.name}>
              <span>{PersonalDetails.fullname}</span>
            </div>

            <div className={styles.basicInfo}>
              <div className={styles.contact}>
                <span id="phone">+91 {PersonalDetails.phone}</span>
                <p className={styles.gmail}>
                  <a
                    href={`mailto:${PersonalDetails.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {PersonalDetails.email}
                  </a>
                </p>
                <div className={styles.location}>
                  <span id={styles.city}>
                    {PersonalDetails.city},{" "}
                    <span id={styles.state}>{PersonalDetails.state}</span>
                  </span>
                </div>
              </div>

              {PersonalDetails.linkdinprofileurl && (
                <div className={styles.social}>
                  <a
                    href={PersonalDetails.linkdinprofileurl}
                    className={styles.LinkdInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {PersonalDetails.linkdinprofileurl}
                  </a>
                </div>
              )}
            </div>

            {PersonalDetails.description && (
              <div className={styles.summary}>
                {PersonalDetails.description}
              </div>
            )}

            {skills && skills.length > 0 && (
              <>
                <p className={styles.headers}>SKILLS</p>
                <div className={styles.skills}>
                  {skills.map((skill, index) => (
                    <span style={{ fontSize: "20px" }} key={index}>
                      {skill} &nbsp;{" "}
                    </span>
                  ))}
                </div>
               
              </>
            )}
             <hr />

            {/* Work Experience */}
            {workExperience.length > 0 && (
              <>
                <p className={styles.headers}>WORK EXPERIENCE</p>
                <div className={styles.companyInfo}>
                  {workExperience.map((detail, index) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>
                          <span className={styles.details}>
                            <strong>Company:</strong> {detail.company}
                          </span>
                        </p>
                        <span>
                          {detail.startDate} - {detail.endDate}
                        </span>
                      </div>
                      <p>
                        <strong>Position:</strong> {detail.position}
                      </p>
                      <p style={{ marginTop: "8px" }}>
                        <strong>Location:</strong> {detail.city}
                      </p>
                      <p style={{ marginTop: "7px" }}>
                        <strong>Description:</strong> {detail.description}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
                
              </>
            )}
            <hr />

            {/* Project */}
            {Project.length > 0 && (
              <>
                <p className={styles.headers}>PROJECT</p>
                <div className={styles.projectInfo}>
                  {Project.map((project, index) => (
                    <div key={index}>
                      <p>
                        <span className={styles.details}>
                          <strong>Title:</strong> {project.projectTitle}
                        </span>
                      </p>
                      <p style={{ marginTop: "8px" }}>
                        <strong>ProjectUrl:</strong>{" "}
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.projectUrl}
                        </a>
                      </p>
                      <p style={{ marginTop: "8px" }}>
                        <strong>Description:</strong>{" "}
                        {project.projectDescription}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
              </>
            )}
            <hr />

            {/* Education */}
            {Education.length > 0 && (
              <>
                <p className={styles.headers}>EDUCATION</p>
                <div className={styles.collegeInfo}>
                  {Education.map((education, index) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className={styles.details}>
                          <strong>Degree:</strong> {education.degree}
                        </span>
                        <span>
                          {education.startDate} - {education.endDate}
                        </span>
                      </div>
                      <p className={styles.details}>
                        <strong>School:</strong> {education.school}
                      </p>
                      <p>
                        <strong>Location:</strong> {education.city}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
                <hr />

                <p className={styles.headers}>Personal Details</p>
                <div className={styles.personalInfo}>
                  <div className={styles.email}>
                    <strong>Email-Id: </strong>
                    <span>
                      <a
                        href={`mailto:${PersonalDetails.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {PersonalDetails.email}
                      </a>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.downlordbtn}>
          <button className={styles.download} onClick={downloadResume}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Resume;
