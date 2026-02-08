import { useEffect, useState, useMemo } from 'react';
import { fetchNobetciEczaneler } from "../services/api";
import type { Eczane } from "../types/eczane.ts";
import {PharmacyMap} from "../components/pharmacyMap.tsx";

const PharmacyPage = () => {
    const [eczaneler, setEczaneler] = useState<Eczane[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEczane, setSelectedEczane] = useState<Eczane | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchNobetciEczaneler();
                setEczaneler(data);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredEczaneler = useMemo(() => {
        return eczaneler.filter(e =>
            e.Adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.Bolge.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [eczaneler, searchTerm]);

    return (
        // h-screen yerine min-h-screen ve h-screen beraber kullanımı flex-1'in çökmesini engeller
        <div className="flex h-screen w-screen overflow-hidden text-black bg-white">

            {/* SIDEBAR */}
            <aside className="hidden md:flex flex-col w-96 bg-white border-r border-slate-200 shadow-xl z-20">
                <div className="p-6 border-b border-slate-100 bg-white">
                    <h1 className="text-2xl font-black text-red-600 tracking-tight">İzmir Eczane</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase mt-1 tracking-widest">Nöbetçi Listesi</p>

                    <div className="mt-6 relative">
                        <input
                            type="text"
                            placeholder="İlçe veya eczane ara..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all text-sm outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-3.5 opacity-30">🔍</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                    {loading ? (
                        <div className="flex items-center justify-center h-full text-slate-400 animate-pulse">
                            Yükleniyor...
                        </div>
                    ) : filteredEczaneler.map((eczane) => (
                        <div
                            key={`${eczane.Adi}-${eczane.LokasyonX}`}
                            onClick={() => setSelectedEczane(eczane)}
                            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                selectedEczane?.Adi === eczane.Adi
                                    ? 'border-red-500 bg-white shadow-lg scale-[1.02]'
                                    : 'border-white bg-white hover:border-red-200 shadow-sm'
                            }`}
                        >
                            <h3 className="font-bold text-slate-800">{eczane.Adi}</h3>
                            <p className="text-xs text-slate-500 mt-1">{eczane.Adres}</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-[10px] bg-red-50 px-2 py-1 rounded-lg text-red-600 font-bold">
                                    {eczane.Bolge}
                                </span>
                                <span className="text-xs text-blue-600 font-semibold">{eczane.Telefon}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* HARİTA ALANI */}
            <main className="flex-1 relative h-full">
                {/* Mobil Header */}
                <div className="absolute top-4 left-4 right-4 z-[1000] md:hidden">
                    <div className="bg-white/95 backdrop-blur shadow-xl p-3 rounded-2xl flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Eczane ara..."
                            className="flex-1 bg-transparent outline-none text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                            {filteredEczaneler.length}
                        </div>
                    </div>
                </div>

                {/* Haritayı saran div'in yüksekliği zorunlu */}
                <div className="absolute inset-0 w-full h-full">
                    <PharmacyMap
                        eczaneler={filteredEczaneler}
                        selectedEczane={selectedEczane}
                        onMarkerClick={(eczane) => setSelectedEczane(eczane)}
                    />
                </div>

                {/* Mobil Kart */}
                {selectedEczane && (
                    <div className="absolute bottom-6 left-4 right-4 z-[1000] md:hidden">
                        <div className="bg-white p-5 rounded-3xl shadow-2xl border border-red-100 animate-in slide-in-from-bottom duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="font-bold text-lg text-slate-900">{selectedEczane.Adi}</h2>
                                    <p className="text-xs text-slate-500">{selectedEczane.Adres}</p>
                                </div>
                                <button onClick={() => setSelectedEczane(null)} className="p-1 text-slate-400">✕</button>
                            </div>
                            <div className="flex gap-2">
                                <a href={`tel:${selectedEczane.Telefon}`} className="flex-1 bg-red-600 text-white text-center py-3 rounded-xl font-bold text-sm">Ara</a>
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps?q=${selectedEczane.LokasyonX},${selectedEczane.LokasyonY}`)}
                                    className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold text-sm"
                                >
                                    Yol Tarifi
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PharmacyPage;