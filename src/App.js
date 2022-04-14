import './index.css';
import {SmallPanel} from "./components/SmallPanel/SmallPanel";
import {faPlug} from "@fortawesome/free-solid-svg-icons";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import {Dashboard} from "./components/Dashboard/Dashboard";
import {Navbar} from "./components/Navbar/Navbar";
import {Levels} from "./components/Levels/Levels";

function App() {
  return (
      <div style={{backgroundImage: "url(/Background_2.png)",
          backgroundRepeat:"no-repeat", backgroundSize:"cover", height: "100vh", width: "100vw"}}>
          <Container>
              <Row className="mx-5">
                  <Navbar />
              </Row>
              <Row className="mx-5">
                  <Router>
                      <Routes>
                          <Route  path="/" element={<Dashboard />}/>
                          <Route  path="/levels" element={<Levels />}/>
                      </Routes>
                  </Router>
              </Row>
          </Container>

      </div>

  );
}

export default App;
