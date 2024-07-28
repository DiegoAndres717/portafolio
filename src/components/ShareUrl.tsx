'use client';
import { useState } from 'react';
import { Clipboard, Check, QrCode } from 'lucide-react'; 

interface Props {
  UrlUser: string;
  admin: { handle: string };
}

export default function ShareUrl({ UrlUser, admin }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [isQrGenerated, setIsQrGenerated] = useState(false);
  const qrCodeUrl = `${UrlUser}/${admin.handle}`; // URL para el QR

  const handleCopyClick = () => {
    navigator.clipboard.writeText(qrCodeUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Error copying URL:', error);
      });
  };

  const handleGenerateQr = () => {
    setIsQrGenerated(true);
  };

  return (
    <div>
      <label htmlFor="company" className="block font-bold text-gray-700 mb-2">
        Compartir URL o QR:
      </label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <p className="text-gray-700 font-medium text-lg p-2 bg-gray-100 rounded-md break-words">
              {qrCodeUrl}
            </p>
            <button
              onClick={handleCopyClick}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 
                         bg-gray-200 hover:bg-gray-300 focus:outline-none 
                         rounded-full p-2 transition duration-200"
            >
              {isCopied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Clipboard size={18} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleGenerateQr}
          className="bg-gray-200 hover:bg-gray-300 focus:outline-none 
                     rounded-full p-2 transition duration-200"
        >
          <QrCode size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Mostrar el QR */}
      {isQrGenerated && (
        <div className="mt-4">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeUrl)}`} alt="QR Code" />
        </div>
      )}
    </div>
  );
}