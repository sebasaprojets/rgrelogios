import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton({
  phoneNumber = "5541992399650",
  message = "Olá! Gostaria de mais informações sobre os relógios.",
}) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      // Respeita a barra de gestos / entalhe em celulares (safe-area).
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        right: "max(1.25rem, env(safe-area-inset-right))",
      }}
      className="group fixed z-50 flex items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#128C7E] md:p-4"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      {/* O rótulo só expande em dispositivos com mouse; no toque ficaria preso aberto. */}
      <span className="max-w-0 overflow-hidden font-medium whitespace-nowrap transition-all duration-300 ease-in-out [@media(hover:hover)]:group-hover:ml-2 [@media(hover:hover)]:group-hover:max-w-xs">
        Falar no WhatsApp
      </span>
    </motion.button>
  );
}
