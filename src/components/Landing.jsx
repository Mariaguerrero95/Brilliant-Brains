import { Link } from "react-router-dom";
import "../scss/layout/_landing.scss";
import laptop from "../images/laptop-code-solid.svg";

function Landing() {
  return (
    <>
      <div className="landing-container">
        <div className="logo-landing-container">
          <img src={laptop} alt="logo" />
        </div>
        <header className="landing-header">
          <h1>BRILLIANT BRAINS 💡</h1>
        </header>
        <h2>
          ¡Comparte tu pasión! Cuenta tu idea al mundo de la forma más atractiva
          posible.
        </h2>
        <div className="link-container">
          <Link to="/main">
            <h3>ENTRAR</h3>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
