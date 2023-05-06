import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Footer from "./Footer";

function Layout({ children, title, description, rel, href, as }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Head>
        <link rel={rel} href={href} as={as}/>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 font-sans sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="border-2 border-solid rounded-full border-pink-500 self-center text-2xl font-semibold whitespace-nowrap text-blue-800 dark:text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-800">
            <span className="p-1 bg-gradient-to-br from-purple-400 via-pink-500 to-green-500 text-white font-xs font-Montserrat rounded-full">
              &lt;/&gt;
            </span>
            Disa
          </span>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Download CV
            </button>
            <button
              data-collapse-toggle="navbar-cta"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className={`${!isOpen ? 'absolute w-full left-0 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:justify-center md:space-x-8 md:mt-0 md:border-0 md:bg-opacity-0' : 'hidden'} `}>
              <li>
                <Link
                  href="/"
                  className={`${
                    router.route === "/" && "md:text-blue-700 md:bg-white bg-blue-700 text-white md:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 md:hover:text-blue-700`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${
                    router.route === "/about" && "md:text-blue-700 md:bg-white bg-blue-700 md:hover:text-blue-500 text-white"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`${
                    router.route === "/services" && "md:text-blue-700 md:bg-white bg-blue-700 text-white md:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/proyects"
                  className={`${
                    router.route === "/proyects" && "md:text-blue-700 md:bg-white bg-blue-700 text-white md:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Proyects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`${
                    router.route === "/contact" && "md:text-blue-700 md:bg-white bg-blue-700 text-white md:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
Layout.defaultProps = {
  title: "Diego Andres Salas",
  description: "Portafolio de Diego Andres Salas como desarrollador fronted",
};

export default Layout;
