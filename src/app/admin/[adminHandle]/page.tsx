'use client';
import { useState, useEffect } from 'react';
import { Camera, Pencil } from 'lucide-react';
import Image from 'next/image';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from '@/types/types';
import ShareUrl from '../../../components/ShareUrl';

const UrlUser = process.env.NEXT_PUBLIC_URL_USER;
export default function MyAccountPage({ params }: { params: { adminHandle: string } }) {
  const [admin, setAdmin] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { adminHandle } = params
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
        const res = await fetch(`/api/user/${adminHandle}`);
        const data = await res.json();
        setAdmin(data[0]);
    
    };

    fetchAdminData();
  }, [adminHandle]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedAdmin(admin);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      // Agregar los demás campos al FormData
      formData.append('firstName', editedAdmin?.firstName || '');
      formData.append('lastName', editedAdmin?.lastName || '');
      formData.append('handle', editedAdmin?.handle || '');
      formData.append('company', editedAdmin?.company || '');

      const res = await fetch(`/api/user/${adminHandle}`, {
        method: 'PATCH',
        body: formData, // Enviar FormData en lugar de JSON
      });

      if (res.ok) {
        const updatedAdmin = await res.json();
        setAdmin(updatedAdmin);
        setIsEditing(false);
        setProfileImage(null);
        setImagePreview(null);
        toast.success('Perfil actualizado correctamente');
        router.push(`/admin/${editedAdmin?.handle}`);
      } else {
        toast.error('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedAdmin(null);
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };


  return (
    <div className="px-4 py-8 md:py-16 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">Mi Cuenta</h1>
        <Toaster position="top-center" richColors />
      {admin && (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mr-4 md:mr-8">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" />
              ) : admin.image ? (
                <Image src={admin.image} alt="Profile" width={96} height={96} className="rounded-full" />
              ) : (
                <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                  <Camera size={48} className="text-gray-500" />
                </div>
              )}

              {isEditing && (
                <label htmlFor="profile-image" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                  <Camera size={24} className="text-white" />
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="flex-1"> {/* flex-1 para que ocupe el espacio disponible en pantallas grandes */}
              {isEditing ? (
                <>
                    <input
                    type="text"
                    value={editedAdmin?.firstName || ''}
                    onChange={(e) => setEditedAdmin({ ...editedAdmin!, firstName: e.target.value })}
                    className="text-xl font-bold text-gray-800 mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input 
                    type="text"
                    className="text-xl font-bold text-gray-800 mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    value={editedAdmin?.lastName || ''} 
                    onChange={(e) => setEditedAdmin({ ...editedAdmin!, lastName: e.target.value })} />
                </>
              ) : (
                <h2 className="text-xl font-bold text-gray-800 mb-2">{admin.firstName} {admin.lastName}</h2>
              )}

              {isEditing ? (
                <>
                    <label htmlFor="handle">ID publico:</label>
                    <input
                    type="text"
                    value={editedAdmin?.handle || ''}
                    onChange={(e) => setEditedAdmin({ ...editedAdmin!, handle: e.target.value })}
                    className="text-gray-600 text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </>
              ) : (
                <p className="text-gray-600 text-sm">{admin.handle}</p>
              )}
            </div>
          </div>

          {/* Resto de la información del perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email (no editable) */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={admin.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block font-bold text-gray-700 mb-2">
                Nombre de la Empresa:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="company"
                  value={editedAdmin?.company || ''}
                  onChange={(e) => setEditedAdmin({ ...editedAdmin!, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-700 font-medium text-lg p-2">{admin.company}</p>
              )}
            </div>
            <ShareUrl admin={admin} UrlUser={UrlUser!}/>
          </div>

          {/* Botones de Edición */}
          <div className="flex justify-end mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="mr-2 px-4 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Guardar Cambios
                </button>
              </>
            ) : (
              <button onClick={handleEditClick} className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <Pencil size={16} className="mr-2" /> Editar Perfil
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}