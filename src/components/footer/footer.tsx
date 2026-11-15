import {useState} from 'react';
import {Github, Heart, Linkedin, ChevronDown, ChevronUp} from 'lucide-react';

const Footer = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto transition-all duration-300">
            {/* Tetikleyici Buton */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Hakkında panelini gizle" : "Hakkında panelini göster"}
                className="w-full py-2.5 min-h-[44px] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
                {isExpanded ? <ChevronDown size={20}/> : <ChevronUp size={20}/>}
                <span className="text-[10px] uppercase font-bold tracking-widest ml-2">
                    {isExpanded ? 'Gizle' : 'Hakkında'}
                </span>
            </button>

            {/* Açılır Panel */}
            <div className={`
                overflow-x-hidden transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="p-6 pt-2 flex flex-col gap-4">
                    {/* Proje Bilgisi */}
                    <div>
                        <h3 className="text-[13px] text-red-600 dark:text-red-400 font-semibold tracking-wide mb-1">İzmir Eczane Haritası</h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium tracking-wide leading-relaxed">
                            İzmir genelindeki nöbetçi eczaneleri en hızlı ve güncel şekilde bulmanız için geliştirilmiş bir
                            açık kaynak projesidir.
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">Not: Bu uygulama resmi bir kurum kuruluşu değildir. Verilerdeki anlık
                            değişikliklerden dolayı eczane ile iletişime geçilmesi önerilir.
                        </p>
                    </div>

                    {/* Veri Kaynağı */}
                    <div>
                        <h3 className="text-[13px] text-red-600 dark:text-red-400 font-semibold tracking-wide mb-1">Veri Kaynağı</h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium tracking-wide mb-1">Eczane verileri her gün otomatik olarak güncellenmektedir.</p>
                        <a
                            href="https://acikveri.bizizmir.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                            İzmir Büyükşehir Belediyesi Açık Veri Portalı
                        </a>
                    </div>

                    {/* Geliştirici Bilgisi */}
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mt-2">
                        <span className="text-[10px] font-semibold tracking-wide uppercase">Geliştirici:</span>
                        <a
                            href="https://github.com/AtaCanYmc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors underline decoration-slate-200 dark:decoration-slate-700 underline-offset-4"
                        >
                            Ata Can Yaymacı
                        </a>
                    </div>

                    {/* Alt Kısım: İkonlar ve Telif */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                            <a 
                                href="https://github.com/AtaCanYmc/izmir-nobetci-eczane-haritasi" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub deposuna git"
                                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                            >
                                <Github size={18}/>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/ata-can-yaymacı/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profiline git"
                                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                            >
                                <Linkedin size={18}/>
                            </a>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            <span>{currentYear}</span>
                            <span>•</span>
                            <span>İzmir</span>
                            <Heart size={12} className="text-red-500 fill-red-500"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;