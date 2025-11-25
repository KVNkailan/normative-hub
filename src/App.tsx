// src/App.tsx — NORMATIVE HUB (versão final para impressionar)
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Building2, CheckCircle, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const projects = [
  { id: 1, name: "Hospital de Leiria", lat: 39.7436, lng: -8.8070, compliance: 92, status: "verde" },
  { id: 2, name: "Edifício Porto", lat: 41.1579, lng: -8.6291, compliance: 68, status: "amarelo" },
  { id: 3, name: "Escola Lisboa", lat: 38.7223, lng: -9.1393, compliance: 45, status: "vermelho" },
  { id: 4, name: "Habitação Coimbra", lat: 40.2033, lng: -8.4103, compliance: 88, status: "verde" },
];

const weeklyData = [
  { week: "Sem 44", compliance: 72 },
  { week: "Sem 45", compliance: 78 },
  { week: "Sem 46", compliance: 85 },
  { week: "Sem 47", compliance: 91 },
];

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NORMATIVE HUB
                </h1>
                <p className="text-sm text-gray-600">Dashboard Executivo de Conformidade Normativa</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">91%</p>
              <p className="text-sm text-gray-600">Conformidade Global</p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapa */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <MapContainer center={[39.5, -8.2]} zoom={6} className="h-96 w-full rounded-xl">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {projects.map(p => (
                    <Marker key={p.id} position={[p.lat, p.lng]}>
                      <Popup>
                        <div className="text-center">
                          <p className="font-bold">{p.name}</p>
                          <p className={`text-lg font-bold ${p.status === 'verde' ? 'text-green-600' : p.status === 'amarelo' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {p.compliance}% conformidade
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </h2>
            </div>
          </div>

          {/* Alertas Críticos */}
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-800 flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8" />
                Alertas Críticos
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-red-300">
                  <p className="font-semibold">Escola Lisboa</p>
                  <p className="text-sm text-red-700">12 não-conformidades graves</p>
                  <button className="mt-2 text-xs bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Gerar Relatório Urgente
                  </button>
                </div>
              </div>
            </div>

            {/* Evolução */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Evolução Semanal
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}