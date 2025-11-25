// src/App.tsx — VERSÃO INNOTECH (substitui TODO o conteúdo)
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Building2, AlertTriangle, TrendingUp, CheckCircle2, Clock, FileText, MapPin, Activity } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Project {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  compliance: number
  status: 'verde' | 'amarelo' | 'vermelho'
  lastAnalysis: string
  criticalIssues: number
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444']

export default function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // DADOS REAIS — vai buscar do teu NORMATIVE CORE depois
    const mockData: Project[] = [
      { id: '1', name: 'Hospital Central de Lisboa', location: 'Lisboa', lat: 38.7223, lng: -9.1393, compliance: 94, status: 'verde', lastAnalysis: '2024-11-24', criticalIssues: 0 },
      { id: '2', name: 'Edifício Porto Business Center', location: 'Porto', lat: 41.1579, lng: -8.6291, compliance: 68, status: 'amarelo', lastAnalysis: '2024-11-20', criticalIssues: 5 },
      { id: '3', name: 'Escola Secundária de Coimbra', location: 'Coimbra', lat: 40.2033, lng: -8.4103, compliance: 42, status: 'vermelho', lastAnalysis: '2024-11-15', criticalIssues: 18 },
      { id: '4', name: 'Residencial Algarve Premium', location: 'Faro', lat: 37.0194, lng: -7.9304, compliance: 88, status: 'verde', lastAnalysis: '2024-11-23', criticalIssues: 2 },
    ]
    setProjects(mockData)
    setLoading(false)
  }, [])

  const complianceData = [
    { name: 'Conforme', value: projects.filter(p => p.status === 'verde').length },
    { name: 'Atenção', value: projects.filter(p => p.status === 'amarelo').length },
    { name: 'Crítico', value: projects.filter(p => p.status === 'vermelho').length },
  ]

  const globalCompliance = projects.length > 0 
    ? Math.round(projects.reduce((acc, p) => acc + p.compliance, 0) / projects.length)
    : 0

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Header */}
        <header className="backdrop-blur-lg bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl">
                <Building2 className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  NORMATIVE HUB
                </h1>
                <p className="text-purple-300 text-sm">Dashboard Executivo de Conformidade Normativa em Tempo Real</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black">{globalCompliance}%</div>
              <div className="text-purple-300">Conformidade Global</div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mapa */}
          <div className="lg:col-span-3 backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <MapPin className="w-8 h-8 text-purple-400" />
                Mapa Nacional de Conformidade
              </h2>
            </div>
            <div className="h-96">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Activity className="w-12 h-12 animate-spin text-purple-400" />
                </div>
              ) : (
                <MapContainer center={[39.5, -8.2]} zoom={6} className="h-full w-full">
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  {projects.map(p => (
                    <Marker key={p.id} position={[p.lat, p.lng]}>
                      <Popup>
                        <div className="text-black">
                          <h3 className="font-bold text-lg">{p.name}</h3>
                          <p className="text-sm text-gray-600">{p.location}</p>
                          <div className="mt-2">
                            <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold ${
                              p.status === 'verde' ? 'bg-green-500' : p.status === 'amarelo' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}>
                              {p.compliance}% conformidade
                            </span>
                          </div>
                          {p.criticalIssues > 0 && (
                            <p className="mt-2 text-red-600 font-bold">{p.criticalIssues} questões críticas</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          {/* Cards Laterais */}
          <div className="space-y-6">
            {/* Distribuição */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Distribuição Atual</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={complianceData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Alertas Críticos */}
            <div className="backdrop-blur-xl bg-red-900/30 rounded-3xl p-6 border border-red-500/50">
              <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
                <AlertTriangle className="w-10 h-10" />
                Alertas Críticos
              </h3>
              {projects.filter(p => p.criticalIssues > 0).map(p => (
                <div key={p.id} className="mb-3 p-4 bg-red-900/50 rounded-xl">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm opacity-90">{p.criticalIssues} não-conformidades graves</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}