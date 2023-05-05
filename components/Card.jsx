import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({onCardClick}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen space-y-4 space-x-4">
      {cards.map((card) => (
        <Link
          onClick={onCardClick}
          key={card.img}
          href="#"
          className="h-60 w-50 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
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
