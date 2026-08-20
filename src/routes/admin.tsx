import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts, getServiceRequests, getOrders, getReviews } from "@/lib/api.functions";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, MessageSquare, Star, Settings, LogOut, ShoppingCart } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const fetchProducts = useServerFn(getProducts);
  const fetchRequests = useServerFn(getServiceRequests);
  const fetchOrders = useServerFn(getOrders);
  const fetchReviews = useServerFn(getReviews);

  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchProducts({ data: {} }),
  });

  const { data: requests = [] } = useQuery({
    queryKey: ["admin-requests"],
    queryFn: () => fetchRequests({ data: undefined }),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders({ data: undefined }),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => fetchReviews({ data: undefined }),
  });

  const stats = {
    productsCount: products.length,
    requestsCount: requests.length,
    ordersCount: orders.length,
    reviewsCount: reviews.length,
  };

  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A101A] border-r border-[#C5A059]/20 p-6 hidden md:flex flex-col">
        <h1 className="text-xl font-serif font-bold text-[#C5A059] tracking-wider mb-10">RG ADMIN</h1>
        
        <nav className="space-y-2 flex-1">
          {[
            { label: 'Dashboard', icon: LayoutDashboard },
            { label: 'Produtos', icon: Package },
            { label: 'Pedidos', icon: ShoppingCart },
            { label: 'Solicitações', icon: MessageSquare },
            { label: 'Avaliações', icon: Star },
            { label: 'Configurações', icon: Settings },
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === item.label ? 'bg-[#C5A059] text-[#00050A]' : 'text-[#E5D3B3]/60 hover:text-[#C5A059] hover:bg-[#C5A059]/5'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-red-500/70 hover:text-red-500 transition-colors text-sm font-medium">
          <LogOut size={18} /> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto pt-32 md:pt-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-2">Visão Geral</h2>
            <h3 className="text-4xl font-serif text-[#E5D3B3]">Dashboard</h3>
          </div>
          <div className="text-right">
            <p className="text-[#E5D3B3]/40 text-xs font-bold uppercase tracking-widest">Admin logado</p>
            <p className="text-[#C5A059] font-medium">Administrador Principal</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Total de Produtos', value: stats?.productsCount || 0, icon: Package },
            { label: 'Novas Solicitações', value: stats?.requestsCount || 0, icon: MessageSquare },
            { label: 'Avaliações', value: stats?.reviewsCount || 0, icon: Star },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-[#0A101A] p-8 rounded-xl border border-[#C5A059]/10"
            >
              <stat.icon className="text-[#C5A059] mb-4" size={24} />
              <p className="text-[#E5D3B3]/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-serif text-[#E5D3B3]">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#0A101A] rounded-xl border border-[#C5A059]/10 overflow-hidden">
          <div className="p-6 border-b border-[#C5A059]/10 flex justify-between items-center">
            <h4 className="font-serif text-[#C5A059] text-xl">Últimas Solicitações de Reparo</h4>
            <button className="text-xs font-bold uppercase tracking-widest text-[#E5D3B3]/40 hover:text-[#C5A059]">Ver Todas</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#00050A] text-[#C5A059]/60 font-bold uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Serviço</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A059]/5">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="hover:bg-[#C5A059]/5 transition-colors">
                    <td className="px-6 py-4 font-medium">Cliente Demo {i+1}</td>
                    <td className="px-6 py-4">Manutenção Geral</td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-[10px] font-bold uppercase">Pendente</span>
                    </td>
                    <td className="px-6 py-4 text-[#E5D3B3]/40">Hoje, 14:30</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
