import React from "react";
import CardProyect from "./CardProyect";
import { proyectosSvelte, proyectosJavaScript, proyectosReact, proyectosNextjs, CARD_STATUS, proyectosNode } from "@/functions/cards";

function Proyecto({ isModalOpen, onClose, selectedProject }) {
  if (!isModalOpen) return null;
  const getProyectosBySelectedProject = () => {
    switch (selectedProject) {
      case CARD_STATUS.React:
        return proyectosReact;
      case CARD_STATUS.Next:
        return proyectosNextjs;
      case CARD_STATUS.Svelte:
        return proyectosSvelte;
      case CARD_STATUS.JavaScript:
        return proyectosJavaScript;
      case CARD_STATUS.Node:
        return proyectosNode;
      default:
        return [];
    }
  };

  const proyectos = getProyectosBySelectedProject();

  return (
    <div>
      <input type="checkbox" id="my-modal" />
      <div
        htmlFor="my-modal"
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-100 p-8 rounded-lg shadow-lg text-center"
        >
          <CardProyect proyectos={proyectos} />
        </div>
      </div>
    </div>
  );
}

export default Proyecto;
