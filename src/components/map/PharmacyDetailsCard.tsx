import type { Eczane } from "../../types/eczane.ts";
import { openEczaneOnMap, callEczane } from "../../services/api.ts";
import { X } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics.ts";

interface PharmacyDetailsCardProps {
    selectedEczane: Eczane | null;
    setSelectedEczane: (eczane: Eczane | null) => void;
}

export const PharmacyDetailsCard = ({ selectedEczane, setSelectedEczane }: PharmacyDetailsCardProps) => {
    const { trackEvent } = useAnalytics();

    if (!selectedEczane) return null;

    const handleCall = () => {
        trackEvent('call_pharmacy', { pharmacy: selectedEczane.Adi });
        callEczane(selectedEczane);
    };

    const handleDirections = () => {
        trackEvent('get_directions', { pharmacy: selectedEczane.Adi });
        openEczaneOnMap(selectedEczane);
    };

    return (
        <>
            {/* Desktop Panel */}
            <div className="absolute bottom-8 right-8 z-[1000] w-80 hidden md:block animate-in fade-in slide-in-from-bottom-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative transition-colors">
                    <button
                        onClick={() => setSelectedEczane(null)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="mb-4 pr-6">
                        <h2 className="font-bold text-xl text-slate-900 dark:text-white">{selectedEczane.Adi}</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-bold tracking-wider">{selectedEczane.Bolge}</p>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed italic">"{selectedEczane.Adres}"</p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCall}
                            className="flex-1 bg-red-600 dark:bg-red-500 text-white text-center py-3 rounded-xl font-bold text-xs hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                        >
                            ARA
                        </button>
                        <button
                            onClick={handleDirections}
                            className="flex-1 bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                        >
                            YOL TARİFİ
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Sheet Backdrop */}
            <div 
                className="md:hidden fixed inset-0 z-[1010] bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in transition-colors"
                onClick={() => setSelectedEczane(null)}
            ></div>

            {/* Mobile Bottom Sheet */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1015] bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 animate-in slide-in-from-bottom-full border-t border-slate-100 dark:border-slate-800">
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-3 mb-2" />
                <div className="p-6 pt-2 relative">
                    <button
                        onClick={() => setSelectedEczane(null)}
                        className="absolute top-2 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div className="mb-4 pr-8">
                        <h2 className="font-bold text-2xl text-slate-900 dark:text-white">{selectedEczane.Adi}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase font-bold tracking-wider">{selectedEczane.Bolge}</p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed italic border-l-2 border-red-500 pl-3 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-r-xl">
                        {selectedEczane.Adres}
                    </p>
                    <div className="flex gap-3 mt-4 mb-2">
                        <button
                            onClick={handleCall}
                            className="flex-1 bg-red-600 dark:bg-red-500 text-white text-center py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 active:scale-95 transition-all"
                        >
                            HEMEN ARA
                        </button>
                        <button
                            onClick={handleDirections}
                            className="flex-1 bg-slate-900 dark:bg-slate-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-slate-900/30 active:scale-95 transition-all"
                        >
                            YOL TARİFİ AL
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
