import { About, Experience, Hero, ProjectsSection } from "../sections";
import AchievementsSection from "../sections/achievements";

const Homepage = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <ProjectsSection />
      <AchievementsSection />
    </>
  );
};

export default Homepage;
