import { useNavigate } from "react-router-dom";
import folder from "../assets/folder.png";
import "./../css/home.css";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <nav>
        <h2 className="logo">BookNest</h2>

        <ul>
          <li>Home</li>

          <li>How it Works</li>

          <li>FAQ</li>

          <li>Pricing</li>
        </ul>

        <button>Login</button>
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
