import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Proyecto from "@/components/Proyecto";
import React, { useState } from "react";

function Proyects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout title={'Proyects'} description={'Estos son mis proyectos, todo mi aprendizaje'}>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
       <Card onCardClick={() => setIsModalOpen(true)} />
       <Proyecto isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Layout>
  );
}

export default Proyects;