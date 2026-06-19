import { X, Code, Terminal } from "lucide-react";

interface DeveloperDocsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DeveloperDocsModal = ({ isOpen, onClose }: DeveloperDocsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 m-4 relative animate-in zoom-in-95">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-slate-900 dark:bg-slate-100 p-3 rounded-2xl text-white dark:text-slate-900">
                            <Code size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Geliştiriciler İçin
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                izmir-open-data-js SDK Kullanımı
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
                        <p className="leading-relaxed">
                            Bu harita, İzmir Büyükşehir Belediyesi Açık Veri Portalı verilerini kullanan 
                            açık kaynaklı <strong>izmir-open-data-js</strong> SDK'sı ile geliştirilmiştir. 
                            Kendi projelerinizde (web, mobil, CLI) bu SDK'yı kullanarak İzmir verilerine kolayca erişebilirsiniz.
                        </p>

                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50">
                                <Terminal size={16} className="text-slate-500" />
                                <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">Kurulum</span>
                            </div>
                            <div className="p-4 bg-slate-900 text-slate-50 overflow-x-auto no-scrollbar">
                                <pre className="font-mono text-xs"><code>npm install izmir-open-data-js</code></pre>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50">
                                <Code size={16} className="text-slate-500" />
                                <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">Örnek Kullanım</span>
                            </div>
                            <div className="p-4 bg-slate-900 text-slate-50 overflow-x-auto no-scrollbar">
                                <pre className="font-mono text-xs leading-relaxed"><code>{`import { IzmirAPI } from "izmir-open-data-js";

// İstemciyi oluşturun
const izmirApi = new IzmirAPI();

// Nöbetçi Eczaneleri Getir
const nobetciEczaneler = await izmirApi.eczaneler.getNobetciList();

// Toplu Taşıma (ESHOT) Duraklarını Getir
const duraklar = await izmirApi.eshot.getDuraklar();

// Bisim İstasyonlarını Getir
const istasyonlar = await izmirApi.bisim.getIstasyonlar();`}</code></pre>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Desteklenen Servisler</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Eczaneler', 'Eshot', 'Bisim', 'İzsu', 'Afetler', 'Vapur', 'Metro', 'İzban', 'Otopark', 'Taksi'].map(service => (
                                    <span key={service} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
