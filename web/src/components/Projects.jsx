import Header from "./Header";
import Hero from "./Hero";
import Preview from "./Preview";
import "../scss/components/Projects.scss";
import Footer from "./Footer";
import { useEffect } from "react";

function Projects() {
  useEffect(() => {
    fetch("http://localhost:3001/projects/list").then((res) =>
      res.json().then((data) => {
        const dataProjects = data.message;
      })
    );
  }, []);

  return (
    <div className="projectColor">
      <Header />
      <Hero />
      <div className="previewGrid">
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </div>
      <Footer />
    </div>
  );
}
export default Projects;
