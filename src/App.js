import "./App.css";
import Header from "./Layout/Header";
import Content from "./Layout/Content";
import Footer from "./Layout/Footer";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
