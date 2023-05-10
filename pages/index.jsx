import Navbar from "@/components/Layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Home() {
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [showMessage, setShowMessage] = useState(1);

  useEffect(() => {
    const messages1 = [
      "👋 ¡Bienvenido! Soy \x1b[1mDiego Andres Salas\x1b[0m, un desarrollador Frontend apasionado",
    ];
    const messages2 = ["¿Necesitas ayuda con tu proyecto web?"];
    const messages3 = ["🚀 Descubre mis proyectos y habilidades en mi portafolio."];
    

    let index = 0;

    const interval = setInterval(() => {
      switch (showMessage) {
        case 1:
          setMessage1(
            (prevText) => prevText + messages1[index].charAt(prevText.length)
          );
          if (message1.length === messages1[index].length) {
            setShowMessage(2);
            setTimeout(() => {
              setMessage1("");
            }, 1500);
          }
          break;
        case 2:
          setMessage2(
            (prevText) => prevText + messages2[index].charAt(prevText.length)
          );
          if (message2.length === messages2[index].length) {
            setShowMessage(3);
            setTimeout(() => {
              setMessage2("");
            }, 1500);
          }
          break;
        case 3:
          setMessage3(
            (prevText) => prevText + messages3[index].charAt(prevText.length)
          );
          if (message3.length === messages3[index].length) {
            clearInterval(interval);
          }
          break;
        default:
          clearInterval(interval);
          break;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [message1.length, message2.length, message3.length, showMessage]);

  return (
    <Navbar title={'Portafolio'} description={'Este portafolio fue creado con Next.js por Diego Andres Salas'}
      rel={'icon'} href={'/logo.png'}
    >
      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-800 animate-out-circle-center`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
              <Image
                src="/img-diego.webp"
                alt="Diego Andres Salas"
                width={400}
                height={400}
              />
              </div>
            </div>
            <div className="chat-bubble">
            {showMessage === 1 && message1}
            {showMessage === 2 && message2}
            {showMessage === 3 && message3}
            </div>
          </div>
          <Link href={"/proyects"} className="cssbuttons-io">
            <span className="relative z-10 inline-flex items-center px-4 py-2 space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                />
              </svg>
              Proyects
            </span>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default Home;

