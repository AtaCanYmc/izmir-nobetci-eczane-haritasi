import {useEffect, useState, useMemo} from 'react';
import {fetchNobetciEczaneler} from "../services/api";
import type {Eczane} from "../types/eczane.ts";
import {PharmacyMap} from "../components/pharmacyMap.tsx";

const PharmacyPage = () => {
    const [eczaneler, setEczaneler] = useState<Eczane[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEczane, setSelectedEczane] = useState<Eczane | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchNobetciEczaneler();
            setEczaneler(data);
            setLoading(false);
        };
        loadData();
    }, []);

    // Arama filtrelemesi
    const filteredEczaneler = useMemo(() => {
        return eczaneler.filter(e =>
            e.Adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.Bolge.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [eczaneler, searchTerm]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans">

            {/* SOL PANEL (SIDEBAR) - Web'de sabit, mobilde gizli */}
            <aside className="hidden md:flex flex-col w-96 bg-white border-r border-slate-200 shadow-xl z-10">
                <div className="p-6 border-b border-slate-100 bg-white">
                    <h1 className="text-2xl font-black text-red-600 tracking-tight">İzmir Eczane</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase mt-1 tracking-widest">Nöbetçi Listesi</p>

                    <div className="mt-6 relative">
                        <input
                            type="text"
                            placeholder="İlçe veya eczane ara..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all text-sm outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-3.5 opacity-30">🔍</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-50 italic">
                            <p>Eczaneler yükleniyor...</p>
                        </div>
                    ) : filteredEczaneler.map((eczane) => (
                        <div
                            key={`${eczane.Adi}-${eczane.LokasyonX}`}
                            onClick={() => setSelectedEczane(eczane)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                                selectedEczane?.Adi === eczane.Adi
                                    ? 'border-red-500 bg-red-50/50 shadow-sm'
                                    : 'border-slate-100 bg-white hover:border-red-200'
                            }`}
                        >
                            <h3 className="font-bold text-slate-800">{eczane.Adi}</h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{eczane.Adres}</p>
                            <div className="flex items-center justify-between mt-3">
                                <span
                                    className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg text-slate-600 font-bold uppercase tracking-tighter">
                                    {eczane.Bolge}
                                </span>
                                <a href={`tel:${eczane.Telefon}`}
                                   className="text-xs text-red-600 font-bold hover:underline">
                                    Ara →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* SAĞ PANEL (HARİTA) */}
            <main className="flex-1 relative">
                {/* Mobil Header (Sadece Mobilde Görünür) */}
                <div className="absolute top-4 left-4 right-4 z-[1000] md:hidden">
                    <div
                        className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center gap-3 border border-white">
                        <input
                            type="text"
                            placeholder="Eczane ara..."
                            className="flex-1 bg-transparent border-none text-sm outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div
                            className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                            {filteredEczaneler.length}
                        </div>
                    </div>
                </div>

                <PharmacyMap
                    eczaneler={filteredEczaneler}
                    selectedEczane={selectedEczane}
                    onMarkerClick={(eczane) => setSelectedEczane(eczane)}
                />

                {/* Mobil Alt Bilgi Kartı (Sadece bir eczane seçildiğinde mobilde çıkar) */}
                {selectedEczane && (
                    <div className="absolute bottom-8 left-4 right-4 z-[1000] md:hidden animate-bounce-in">
                        <div className="bg-white p-5 rounded-3xl shadow-2xl border border-red-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="font-black text-xl text-slate-900">{selectedEczane.Adi}</h2>
                                    <p className="text-sm text-slate-500 mt-1">{selectedEczane.Adres}</p>
                                </div>
                                <button onClick={() => setSelectedEczane(null)} className="text-slate-300">✕</button>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <a
                                    href={`tel:${selectedEczane.Telefon}`}
                                    className="flex-1 bg-red-600 text-white text-center py-3 rounded-2xl font-bold text-sm shadow-lg shadow-red-200 active:scale-95 transition-transform"
                                >
                                    Hemen Ara
                                </a>
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedEczane.LokasyonX},${selectedEczane.LokasyonY}`)}
                                    className="flex-1 bg-slate-900 text-white text-center py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform"
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