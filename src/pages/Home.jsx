import { useState } from "react";
import { useNavigate } from "react-router-dom";
import folder from "../assets/folder.png";
import "./../css/home.css";

function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <nav>
        <h2 className="logo">BookNest</h2>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>Home</li>

          <li>How it Works</li>

          <li>FAQ</li>

          <li>Pricing</li>

          <li>
            <button>Login</button>
          </li>
        </ul>
      </nav>

      <div className="hero">
        <div className="left">
          <h1>Organize your files and keep them safe, everywhere!</h1>

          <p>We offer secure storage, ensuring your data is protected.</p>

          <button className="start" onClick={() => navigate("/dashboard")}>
            Get Started
          </button>
        </div>

        <div className="right">
          <img src={folder} alt="folder" />
        </div>
      </div>
    </div>
  );
}

export default Home;
