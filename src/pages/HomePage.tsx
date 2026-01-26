import React from "react";
import Hero from "../sections/Hero";
import ItemSection from "../sections/ItemSection";
import AboutSection from "../sections/AboutSection";
import Promo from "../sections/Promo";
import Circles from "../sections/Circles";
import WorkStages from "../sections/WorkStages";
import HouseForm from "../sections/HouseForm";
import AllProjects from "../sections/AllProjects";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ItemSection />
      <Circles />
      <AllProjects />
      <AboutSection />
      <Promo />
      <HouseForm />
      <WorkStages />
    </>
  );
};

export default HomePage;
