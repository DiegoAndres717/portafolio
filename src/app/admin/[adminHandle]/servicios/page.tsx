'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash, Check, XCircle, X } from 'lucide-react';
import { Status } from '@prisma/client';
import { toast, Toaster } from 'sonner';

interface Service {
  id: number;
  name: string;
  description: string;
  status: Status;
}

export default function ServicesPage( { params }: { params: { adminHandle: string } } ) {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const { adminHandle } = params;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch('/api/user/' + adminHandle + '/services/all');
    const data = await response.json();
    setServices(data);
  };

  const handleCreateService = async () => {
    const response = await fetch('/api/user/' + adminHandle + '/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: newServiceName, 
        description: newServiceDescription, 
        active: 'INACTIVE' 
      })
    });

    if (response.ok) {
      fetchServices(); 
      setNewServiceName('');
      setNewServiceDescription('');
      setIsModalOpen(false);
    } else {
      console.error('Error creating service');
    }
  };

  const handleDeleteService = async (id: number) => {
    const response = await fetch(`/api/user/${adminHandle}/services/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchServices(); 
    } else {
      console.error('Error deleting service');
    }
  };

  const handleToggleServiceStatus = async (id: number, newStatus: Status) => {
    
    try {
    /* const newStatus = status ? 'ACTIVE' : 'INACTIVE'; */
    const response = await fetch(`/api/user/${adminHandle}/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }) 
    });
    
    if (response.ok) {
        toast.success('Estado de servicio actualizado');
        fetchServices();
    } else {
        console.error('Error updating service status');
    }
    } catch (error) {
        console.error('Error updating service status:', error);
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Services</h1>
        <Toaster position="top-center" richColors/>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2" size={18} />
        Create Service
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Status</th>
              {/* <th className="py-3 px-6 text-center">Actions</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-light">
            {services.map((service) => (
              <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span>{service.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                <label 
                    htmlFor={`service-status-${service.id}`} 
                    className="relative inline-flex items-center cursor-pointer"
                >
                    <input 
                    type="checkbox" 
                    id={`service-status-${service.id}`} 
                    className="sr-only peer"
                    checked={service.status === 'ACTIVE' ? true : false}
                    onChange={() =>
                      handleToggleServiceStatus(
                        service.id,
                        service.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
                      )
                    }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                </label>
                </td>
                {/* <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de creación de servicio */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create New Service
                </h3>
                <button 
                  type="button" 
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={newServiceName} 
                    onChange={(e) => setNewServiceName(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                  <textarea 
                    id="description" 
                    value={newServiceDescription} 
                    onChange={(e) => setNewServiceDescription(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                  type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleCreateService}
                >
                  Create
                </button>
                <button 
                  type="button" 
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}