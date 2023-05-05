import React from "react";
import CardProyect from "./CardProyect";

function Proyecto({ isModalOpen, onClose }) {
  if (!isModalOpen) return null;
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
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <CardProyect />
          <CardProyect />
          <CardProyect />
        </div>
      </div>
    </div>
  );
}

export default Proyecto;

