import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardProyect = ({proyectos}) => {
  const min = 0;
  const max = 0;
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {proyectos?.map((card, index) => (
            <div className="card-proyect" key={index}>
            <div className="header">
              <h2 className="text-blue-700 font-bold">{card.title}</h2>
              <Image
                src={card?.img}
                alt={card?.title}
                width={card.w}
                height={card.h}
              />
            </div>
            <div className="content">
              <button className="hover:border-2 hover:rounded-lg font-bold py-2 px-4 rounded inline-flex items-center">
                <Link href="#" className="social-button github">
                  <svg
                    className="cf-icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-2.5 0 19 19"
                  >
                    <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path>
                  </svg>
                </Link>
                Código
              </button>
              <button className="hover:border-2 hover:rounded-lg font-bold py-2 px-4 rounded inline-flex items-center">
                <Link href="#" className="social-button github">
                  <Image
                    src={"/react-2.svg"}
                    alt="Reactjs"
                    width={30}
                    height={20}
                  />
                </Link>
                Página
              </button>
          </div>
      </div>
        ))}
    </div>
  );
};

export default CardProyect;
