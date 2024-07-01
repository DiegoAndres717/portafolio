'use client';
import Card from "@/components/Card";
/* import Layout from "@/components/Layout"; */
import Proyecto from "@/components/Proyecto";
import React, { useState } from "react";

function Proyects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <Card onCardClick={handleCardClick} />
        <Proyecto
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedProject={selectedProject}
        />
      </div>
    </>
  );
}

export default Proyects;
