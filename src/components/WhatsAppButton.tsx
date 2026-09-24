import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton({ 
  phoneNumber = "5541992399650", 
  message = "Olá! Gostaria de mais informações sobre os relógios." 
}) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.button 
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-50 bg-whatsapp text-whatsapp-foreground p-3.5 rounded-full shadow-lg hover:brightness-95 transition-all flex items-center justify-center group sm:bottom-8 sm:right-8 sm:p-4"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap font-bold">
        Falar no WhatsApp
      </span>
    </motion.button>
  );
}
