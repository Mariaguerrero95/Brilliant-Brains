import Header from "./Header";
import Hero from "./Hero";
import Preview from "./Preview";
import "../scss/components/Projects.scss";
import Footer from "./Footer";

function Projects({ projectsDetails }) {
  projectsDetails.map();
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
