import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section className="hero">
      <h2 className="title">Brillant Brains</h2>
      <p className="hero__text">
        Escaparate en línea para recoger ideas a través de la tecnología
      </p>
      <Link to="/projects" className="button--link">
       <h3>Ver proyectos</h3>
      </Link>
    </section>
  );
};
export default Hero;
