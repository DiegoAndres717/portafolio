import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Proyecto from "@/components/Proyecto";
import React, { useState } from "react";

function Proyects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  return (
    <Layout
      title={"Proyects"}
      description={"Estos son mis proyectos, todo mi aprendizaje"}
      rel={"icon"}
      href={"/logo.png"}
    >
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <Card onCardClick={handleCardClick} />
        <Proyecto
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedProject={selectedProject}
        />
      </div>
    </Layout>
  );
}

export default Proyects;
