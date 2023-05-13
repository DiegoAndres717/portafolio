import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
      <nav className="bg-white border-gray-200 dark:bg-gray-900 font-Montserrat sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="border-2 border-solid rounded-full border-blue-300 self-center text-2xl font-semibold whitespace-nowrap text-blue-400 text-transparent bg-clip-text bg-gradient-to-r from-pink-800 via-blue-900 to-blue-400">
            <span className="p-1 bg-gradient-to-br from-blue-300 via-blue-600 to-blue-700 text-white font-xs font-Montserrat rounded-full">
              &lt;/&gt;
            </span>
            Disa
          </span>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 "
            >
              Download CV
            </button>
            <button
              data-collapse-toggle="navbar-default"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="navbar-default"
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
            className={`${!isOpen && 'hidden'} w-full xl:block xl:w-auto`} id="navbar-default"
          >
            <ul className={`absolute w-full left-0 font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 xl:relative xl:p-0 xl:flex-row xl:space-x-8 xl:mt-0 xl:border-0 xl:bg-white`}>
              <li>
                <Link
                  href="/"
                  className={`${
                    router.route === "/" && "xl:text-blue-700 xl:bg-white bg-blue-700 text-white xl:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded xl:bg-transparent xl:p-0 xl:hover:text-blue-700`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${
                    router.route === "/about" && "xl:text-blue-700 xl:bg-white bg-blue-700 text-white xl:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded xl:bg-transparent xl:p-0 xl:hover:text-blue-700`}
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/services"
                  className={`${
                    router.route === "/services" && "xl:text-blue-700 xl:bg-white bg-blue-700 text-white xl:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded xl:bg-transparent xl:p-0 xl:hover:text-blue-700`}
                >
                  Services
                </Link>
              </li> */}
              <li>
                <Link
                  href="/proyects"
                  className={`${
                    router.route === "/proyects" && "xl:text-blue-700 xl:bg-white bg-blue-700 text-white xl:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded xl:bg-transparent xl:p-0 xl:hover:text-blue-700`}
                >
                  Proyects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`${
                    router.route === "/contact" && "xl:text-blue-700 xl:bg-white bg-blue-700 text-white xl:hover:text-blue-500"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded xl:bg-transparent xl:p-0 xl:hover:text-blue-700`}
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
