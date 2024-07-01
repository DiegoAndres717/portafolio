'use client'

import Swal from "sweetalert2";

function Contact() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Casting seguro a HTMLFormElement
    const form = event.target as HTMLFormElement; 

    // Ahora puedes acceder a form.elements
    const emailInput = form.elements.namedItem("email-address-icon") as HTMLInputElement | null;
    const messageTextarea = form.elements.namedItem("message") as HTMLTextAreaElement | null;

    const email = emailInput?.value;
    const message = messageTextarea?.value;

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });
    if (!email || !message) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }
    // Verificar que el correo electrónico sea válido
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo electrónico no válido",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    if (response.ok) {
      // Mostrar modal de éxito aquí
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Email enviado con éxito",
        showConfirmButton: false,
      });
    } else {
      // Mostrar modal de error aquí
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al enviar el correo electrónico",
        timer: 4000,
        showConfirmButton: false,
      });
    }
    /* event.target.reset(); */
  };
  return (
    <>
      <div>
        <video
          autoPlay
          loop
          muted
          className="absolute bg-slate-500 top-0 left-0 min-w-full min-h-full object-cover"
        >
          <source
            src="https://www.dropbox.com/s/v3cl9dejb824flu/contact.mp4?dl=1"
            type="video/mp4"
          />
          <source
            src="https://www.dropbox.com/s/qndkrle6yzodlw2/contact.webm?dl=1"
            type="video/webm"
          />
        </video>
        <section className="mt-20 max-w-sm opacity-95 p-6 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            Contact
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 mt-4">
              <label
                htmlFor="email-address-icon"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="name@mail.com"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  typeof="email"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Contact;
