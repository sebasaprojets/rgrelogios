import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber = "5541992399650",
  message = "Olá! Gostaria de mais informações sobre os relógios.",
}: WhatsAppButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 sm:bottom-7 sm:right-7"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      <Button asChild size="lg" className="h-12 rounded-full px-4 editorial-shadow sm:px-6">
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar com a RG Relógios no WhatsApp"
        >
          <MessageCircle /> <span className="hidden sm:inline">Falar no WhatsApp</span>
        </a>
      </Button>
    </motion.div>
  );
}