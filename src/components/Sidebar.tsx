'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X, CalendarDays, Wrench, Clock, User, Settings, LogOut } from 'lucide-react';
import { useParams } from 'next/navigation';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { adminHandle } = useParams() as { adminHandle: string };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Botón de hamburguesa */}
      <button 
        className={`${isMenuOpen ? 'hidden ease-in-out duration-300' : 'block'} p-4 focus:outline-none`}
        onClick={toggleMenu}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-white text-white w-64 p-4 top-0 left-0 h-screen z-20 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-64 w-[56px]'} ease-in-out duration-300`}
      >
        {/* Botón de cierre (solo visible cuando el menú está abierto) */}
        {isMenuOpen && (
          <button 
            className="absolute top-5 right-4 text-gray-300 hover:text-gray-100 focus:outline-none" 
            onClick={toggleMenu}
          >
            <X size={20} />
          </button>
        )}

        {/* Nombre de usuario */}
        <div className="text-xl font-bold mb-6 text-gray-700">{isMenuOpen ? 'Diego Andrés Salas' : ''}</div>

        {/* Enlaces */}
        <ul className="space-y-2">
          <li>
            <Link 
              href={`/admin/${adminHandle}/citas`} 
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
            >
              <CalendarDays size={18} className="mr-2" />
              {isMenuOpen && <span>Citas</span>}
            </Link>
          </li>
          <li>
            <Link 
              href={`/admin/${adminHandle}/servicios`}
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
            >
              <Wrench size={18} className="mr-2" />
              {isMenuOpen && <span>Servicios</span>}
            </Link>
          </li>
          <li>
            <Link 
              href={`/admin/${adminHandle}/horarios`} 
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
            >
              <Clock size={18} className="mr-2" />
              {isMenuOpen && <span>Horarios</span>}
            </Link>
          </li>
          <li>
            <Link 
              href={`/admin/${adminHandle}`} 
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
            >
              <User size={18} className="mr-2" />
              {isMenuOpen && <span>Mi Cuenta</span>}
            </Link>
          </li>
          <li>
            <Link 
              href={`/admin/${adminHandle}/configuracion`} 
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
            >
              <Settings size={18} className="mr-2" />
              {isMenuOpen && <span>Configuración</span>}
            </Link>
          </li>
          <li>
          <div className="absolute bottom-4 w-[88%]">
            <button 
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 text-gray-700 w-full text-left" 
              onClick={() => { /* Lógica para cerrar sesión */ }}
            >
              <LogOut size={18} className="mr-2" />
              {isMenuOpen && <span>Cerrar Sesión</span>}
            </button>
          </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;