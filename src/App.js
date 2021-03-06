import React from "react";
import './index.css';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Levels from "./components/Levels/Levels";
import Level from "./components/Level/Level";
import Leaderboards from "./components/Leaderboards/Leaderboards";
import Achievements from "./components/Achievements/Achievements";
import {Flip, ToastContainer} from "react-toastify";
import Settings from "./components/Settings/Settings";
import Account from "./components/Account/Account";
import Solutions from "./components/Solutions/Solutions";
import AuthVerify from "./components/AuthVerify/AuthVerify";

function App() {

    const handleExit = () => {
        localStorage.removeItem('code_spell_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('code_spell_expiration');
        setTimeout(() => window.location.replace("/"), 2000);
    }

    let logged_in = localStorage.hasOwnProperty("code_spell_token");

    let toastContainer = <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme={"light"}
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
    style={{color: "#000000"}}/>;

    if (!logged_in) {
        return (<div style={{backgroundImage: "url(/Background_2.png)",
            backgroundRepeat:"no-repeat", backgroundSize:"cover", height: "100vh", width: "100vw"}}>
            <Container className="justify-content-center d-flex">
                <Router>
                    <Routes>
                        <Route path="/" element={<SignUp />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="*" element={<SignUp />}/>
                    </Routes>
                </Router>
            </Container>
            {toastContainer}
        </div>
        );
    }

  return (
      <div style={{backgroundImage: "url(/Background_2.png)",
          backgroundRepeat:"no-repeat", backgroundSize:"cover", minHeight: "100vh", minWidth: "100vw"}}>
          <Row className="mx-5">
              <Router>
                  <Routes>
                      <Route  path="/" element={<Dashboard />}/>
                      <Route  path="/solutions" element={<Solutions />}/>
                      <Route  path="/levels" element={<Levels />}/>
                      <Route  path="/levels/:levelId" element={<Level />}/>
                      <Route  path="/leaderboards" element={<Leaderboards />}/>
                      <Route  path="/achievements" element={<Achievements />}/>
                      <Route  path={"/settings"} element={<Settings />}/>
                      <Route  path={"/account"} element={<Account />}/>
                      <Route path="*" element={<Dashboard />}/>
                  </Routes>
                  <AuthVerify logout={handleExit}/>
              </Router>
          </Row>
          {toastContainer}
      </div>
    );
}

export default App;
