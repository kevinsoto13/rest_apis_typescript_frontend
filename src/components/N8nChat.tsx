import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

export default function N8nChat() {
  useEffect(() => {
    createChat({
      webhookUrl:
        "http://localhost:5678/webhook/0e8af238-6bad-4085-900f-e5ea5fe24b3e/chat", // Cambia esto por tu URL real

      // Opcional: puedes personalizar otros parámetros aquí
      initialMessages: [
        "¡Hola! 👋",
        "Soy kevin, tu asistente. ¿En qué puedo ayudarte hoy?",
      ],
      i18n: {
        en: {
          title: "¡Hola! 👋",
          subtitle: "Chatea conmigo, estoy aquí para ayudarte.",
          inputPlaceholder: "Escribe tu pregunta...",
          getStarted: "Nueva conversación",
          footer: "", // puedes dejarlo vacío si no lo necesitas
          closeButtonTooltip: "Cerrar chat", // obligatorio
        },
      },
      defaultLanguage: "en",
    });
  }, []);

  return null;
}
