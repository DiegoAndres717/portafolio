import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ onCardClick }) => {
  return (
    <div
      className="grid grid-cols-1 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center 
    items-center xs:h-screen xl:h-screen mx-auto max-w-xs xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md
     sm:max-w-screen-sm"
    >
      {cards.map((card) => (
        <Link
          onClick={onCardClick}
          key={card.img}
          href="#"
          className="h-60 w-42 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {card.title}
          </h5>
          <figure className="flex justify-center items-center">
            <Image
              src={card.img}
              width={card.w}
              height={card.h}
              alt={card.title}
            />
          </figure>
        </Link>
      ))}
    </div>
  );
};
const cards = [];
cards.push({
  title: "Reactjs",
  img: "/react-2.svg",
  w: "150",
  h: "150",
});
cards.push({
  title: "Nextjs",
  img: "/next-js.svg",
  w: "150",
  h: "150",
});
cards.push({
  title: "Node.Js",
  img: "/nodejs-2.svg",
  w: "150",
  h: "150",
});
cards.push({
  title: "MongoDB",
  img: "/mongodb-icon-1.svg",
  w: "150",
  h: "150",
});
cards.push({
  title: "JavaScript",
  img: "/javascript-1.svg",
  w: "150",
  h: "150",
});

export default Card;
