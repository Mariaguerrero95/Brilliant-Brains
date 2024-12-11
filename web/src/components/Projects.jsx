import Header from "./Header";
import Hero from "./Hero";
import Preview from "./Preview";
import "../scss/components/Projects.scss";
import Footer from "./Footer";

function Projects({ project, projectsDetails }) {
  return (
    <div className="projectColor">
      <Header />
      <Hero />
      <div className="previewGrid">
        {projectsDetails.map((preview) => {
          return <Preview project={preview} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
export default Projects;
