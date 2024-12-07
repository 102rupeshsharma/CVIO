import React from "react";
import UserJourney from "./views/UserJourney/UserJourney";
import {CvioProvider} from "./hoc/provider/cvioProvider";

function App() {
  return (
    <CvioProvider>
       <UserJourney />
    </CvioProvider>
  );
}

export default App;