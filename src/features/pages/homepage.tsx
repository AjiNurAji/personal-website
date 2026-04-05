import { About } from "../sections/about";
import { Experience } from "../sections/experience";
import { Hero } from "../sections/hero";
import { ProjectsSection } from "../sections/projects";

const Homepage = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <ProjectsSection />
    </>
  );
};

export default Homepage