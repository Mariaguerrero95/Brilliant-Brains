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
  {projectsDetails.map((preview, index) => (
    <Preview
      key={index} // Agrega una clave única
      nameProjectUser={preview.name}
      sloganProjectUser={preview.slogan}
      techProjectUser={preview.technologies}
      authorProjectUser={preview.autor}
      jobProjectUser={preview.job}
      descProjectUser={preview.desc}
      demoProjectUser={preview.demo}
      repoProjectUser={preview.repo}
      imageProjectUser={preview.image}
      imageAuthorUser={preview.photo}
    />
  ))}
</div>

      <Footer />
    </div>
  );
}
export default Projects;
