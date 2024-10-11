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
import Resume from "./components/preview_page/Resume";
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