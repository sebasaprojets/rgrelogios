import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CreditCard, Shield, QrCode } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { createOrder } from "@/lib/api.functions";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number | null;
  };
}

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    paymentMethod: "pix",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrder = useServerFn(createOrder);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await submitOrder({
        data: {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_whatsapp: formData.whatsapp,
          items: [{ product_id: product.id, name: product.name, price: product.price }],
          total_amount: product.price || 0,
          payment_method: formData.paymentMethod,
          shipping_address: formData.address,
        }
      });
      toast.success("Pedido realizado com sucesso!");
      setStep(3);
    } catch (error) {
      toast.error("Erro ao processar pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-[#0A101A] border border-[#C5A059]/30 rounded-2xl overflow-hidden shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#E5D3B3]/40 hover:text-[#C5A059] z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#E5D3B3]">Finalizar Compra</h3>
                <p className="text-xs text-[#E5D3B3]/40 uppercase tracking-widest font-bold">Checkout Seguro</p>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Nome Completo</label>
                    <input 
                      required
                      className="w-full bg-[#00050A] border border-[#C5A059]/20 rounded p-3 text-sm focus:border-[#C5A059] outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">WhatsApp</label>
                    <input 
                      required
                      placeholder="(41) 99999-9999"
                      className="w-full bg-[#00050A] border border-[#C5A059]/20 rounded p-3 text-sm focus:border-[#C5A059] outline-none transition-colors"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">E-mail</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-[#00050A] border border-[#C5A059]/20 rounded p-3 text-sm focus:border-[#C5A059] outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Endereço de Entrega</label>
                  <textarea 
                    required
                    className="w-full bg-[#00050A] border border-[#C5A059]/20 rounded p-3 text-sm focus:border-[#C5A059] outline-none transition-colors h-24 resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                
                <div className="pt-4 border-t border-[#C5A059]/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-[#E5D3B3]/60">Total a pagar:</span>
                    <span className="text-xl font-bold text-[#C5A059]">R$ {product.price?.toLocaleString()}</span>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#C5A059] text-[#00050A] py-4 rounded font-bold hover:bg-[#D4B473] transition-all uppercase text-sm tracking-widest"
                  >
                    Continuar para Pagamento
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'pix'})}
                    className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${formData.paymentMethod === 'pix' ? 'bg-[#C5A059]/10 border-[#C5A059]' : 'bg-[#00050A] border-[#C5A059]/10'}`}
                  >
                    <QrCode size={32} className={formData.paymentMethod === 'pix' ? 'text-[#C5A059]' : 'text-[#E5D3B3]/20'} />
                    <span className="text-xs font-bold uppercase tracking-widest">PIX</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                    className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${formData.paymentMethod === 'card' ? 'bg-[#C5A059]/10 border-[#C5A059]' : 'bg-[#00050A] border-[#C5A059]/10'}`}
                  >
                    <CreditCard size={32} className={formData.paymentMethod === 'card' ? 'text-[#C5A059]' : 'text-[#E5D3B3]/20'} />
                    <span className="text-xs font-bold uppercase tracking-widest">Cartão</span>
                  </button>
                </div>

                <div className="bg-[#00050A] p-6 rounded-xl border border-[#C5A059]/10">
                  {formData.paymentMethod === 'pix' ? (
                    <div className="text-center space-y-4">
                      <p className="text-sm text-[#E5D3B3]/60 italic">O QR Code para pagamento será gerado após a confirmação.</p>
                      <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                        <Shield size={14} /> Desconto de 5% aplicado no PIX
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Número do Cartão</label>
                        <input className="w-full bg-[#0A101A] border border-[#C5A059]/20 rounded p-3 text-sm outline-none" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Validade</label>
                          <input className="w-full bg-[#0A101A] border border-[#C5A059]/20 rounded p-3 text-sm outline-none" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">CVV</label>
                          <input className="w-full bg-[#0A101A] border border-[#C5A059]/20 rounded p-3 text-sm outline-none" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#C5A059]/10 space-y-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C5A059] text-[#00050A] py-4 rounded font-bold hover:bg-[#D4B473] transition-all uppercase text-sm tracking-widest disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processando...' : 'Confirmar Pagamento'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-center text-[10px] font-bold text-[#E5D3B3]/40 hover:text-[#C5A059] uppercase tracking-widest"
                  >
                    Voltar para dados de entrega
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mx-auto">
                  <Shield size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-[#E5D3B3]">Pedido Confirmado!</h3>
                  <p className="text-[#E5D3B3]/60 text-sm">Obrigado pela sua compra. Entraremos em contato via WhatsApp em breve.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="bg-[#C5A059] text-[#00050A] px-12 py-3 rounded font-bold uppercase text-xs tracking-widest"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
