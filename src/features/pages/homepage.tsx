import { About, Experience, Hero, ProjectsSection, Skills } from "../sections";
import AchievementsSection from "../sections/achievements";

const Homepage = () => {
	return (
		<>
			<Hero />
			<About />
			<Skills />
			<Experience />
			<ProjectsSection />
			<AchievementsSection />
		</>
	);
};

export default Homepage;
