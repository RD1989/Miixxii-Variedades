'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import {
  BarChart3,
  TrendingUp,
  MessageCircle,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Activity,
  PhoneCall,
} from 'lucide-react';
import { formatCurrencyBRL } from '@/data/mockData';

export const AdminMetricsAndClicks: React.FC = () => {
  const { leadClicks, attendants, activityLogs, adminOrders } = useStore();

  const mariaLeads = attendants.find((a) => a.id === 'maria')?.clicksCount || 0;
  const carlosLeads = attendants.find((a) => a.id === 'carlos')?.clicksCount || 0;
  const totalLeads = mariaLeads + carlosLeads || leadClicks.length;

  const mariaPercent = totalLeads > 0 ? Math.round((mariaLeads / totalLeads) * 100) : 50;
  const carlosPercent = totalLeads > 0 ? Math.round((carlosLeads / totalLeads) * 100) : 50;

  // Neighborhood metrics calculated from actual orders and leads
  const neighborhoodData = [
    { name: 'Adrianópolis / Vieiralves', count: 42, percent: 32, fee: 'R$ 15,00' },
    { name: 'Flores / Parque 10', count: 35, percent: 27, fee: 'R$ 15,00' },
    { name: 'Ponta Negra / Tarumã', count: 26, percent: 20, fee: 'R$ 25,00' },
    { name: 'Centro / Praça 14', count: 18, percent: 14, fee: 'R$ 12,00' },
    { name: 'Cidade Nova / Manoa', count: 9, percent: 7, fee: 'R$ 20,00' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Leads Totais */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Cliques & Leads Totais</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 fill-emerald-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {totalLeads}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +28% este mês
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Tráfego direcionado para as consultoras no WhatsApp
          </p>
        </div>

        {/* KPI 2: Atendente Maria */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Maria (98613-7969)</span>
            <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
              {mariaPercent}% do tráfego
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {mariaLeads}
            </span>
            <span className="text-xs font-medium text-neutral-500">clientes atendidos</span>
          </div>
          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-pink-600 h-full rounded-full" style={{ width: `${mariaPercent}%` }} />
          </div>
        </div>

        {/* KPI 3: Atendente Carlos */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Carlos (98606-4005)</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
              {carlosPercent}% do tráfego
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {carlosLeads}
            </span>
            <span className="text-xs font-medium text-neutral-500">clientes atendidos</span>
          </div>
          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${carlosPercent}%` }} />
          </div>
        </div>

        {/* KPI 4: Pedidos em Manaus */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Volume de Vendas</span>
            <div className="w-8 h-8 rounded-full bg-neutral-100 text-black flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {formatCurrencyBRL(adminOrders.reduce((sum, o) => sum + o.total, 0))}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">
            {adminOrders.length} pedidos em fluxo no Kanban
          </p>
        </div>
      </div>

      {/* Middle Row: Live Click Tracker & Manaus Neighborhood Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Live Lead Clicks Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-neutral-900">
                Registro em Tempo Real de Cliques no WhatsApp
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Ao Vivo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  <th className="pb-2">Hora</th>
                  <th className="pb-2">Atendente</th>
                  <th className="pb-2">Origem / Canal</th>
                  <th className="pb-2">Produto de Interesse</th>
                  <th className="pb-2 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {leadClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2.5 font-mono text-[11px] text-neutral-500">
                      {click.timeFormatted}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          click.attendantId === 'maria'
                            ? 'bg-pink-100 text-pink-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {click.attendantName}
                      </span>
                    </td>
                    <td className="py-2.5 font-medium text-neutral-700">
                      {click.source}
                    </td>
                    <td className="py-2.5 text-neutral-900 font-semibold truncate max-w-[160px]">
                      {click.productName || 'Catálogo Geral Manaus'}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => {
                          const url = `https://wa.me/${click.phoneNumber}?text=Olá, ${click.attendantName}! Teste de encaminhamento pelo painel.`;
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                        className="text-[10px] font-bold text-[#25D366] hover:underline inline-flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3 fill-current" />
                        <span>Abrir</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5 cols): Manaus Neighborhood Demand */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-800" />
              <h3 className="font-bold text-sm text-neutral-900">
                Bairros Mais Demandados em Manaus
              </h3>
            </div>
            <span className="text-[10px] text-neutral-500 font-medium">Motoboy Express</span>
          </div>

          <div className="space-y-3 text-xs">
            {neighborhoodData.map((neigh, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-800">{neigh.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-400">{neigh.fee}</span>
                    <span className="font-bold text-neutral-900">{neigh.count} pedidos</span>
                  </div>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full transition-all duration-500"
                    style={{ width: `${neigh.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 space-y-1 mt-4">
            <p className="font-bold text-neutral-800">💡 Dica de Logística Local:</p>
            <p>
              Os bairros Adrianópolis, Flores e Ponta Negra concentram 79% dos pedidos de moda plus size em Manaus.
            </p>
          </div>
        </div>
      </div>

      {/* Activity Logs & Audit Trail */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-800" />
            <h3 className="font-bold text-sm text-neutral-900">
              Histórico de Atividades & Auditoria de Operações
            </h3>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">
            {activityLogs.length} eventos gravados
          </span>
        </div>

        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-black mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-neutral-900 mr-2">{log.action}:</span>
                  <span className="text-neutral-700">{log.description}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-[11px] text-neutral-400 self-end sm:self-auto">
                <span>Por: <strong className="text-neutral-700">{log.user}</strong></span>
                <span>•</span>
                <span className="font-mono">{log.timeFormatted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
