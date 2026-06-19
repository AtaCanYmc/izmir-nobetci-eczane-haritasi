import {PharmacyMap} from "../../components/map/pharmacyMap.tsx";
import logo from '../../assets/eczane_logo.jpg';
import {Menu, ChevronLeft, MapPinOff, X, Moon, Sun, Code} from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import Footer from "../../components/footer/footer.tsx";
import {Helmet} from 'react-helmet-async';
import usePharmacyPage from "./usePharmacyPage.ts";
import { PharmacyDetailsCard } from "../../components/map/PharmacyDetailsCard.tsx";
import { DeveloperDocsModal } from "../../components/DeveloperDocsModal.tsx";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext.tsx";
import { useAnalytics } from "../../hooks/useAnalytics.ts";

const PharmacyPage = () => {
    const {
        eczaneler,
        searchTerm,
        setSearchTerm,
        selectedEczane,
        setSelectedEczane,
        loading,
        isError,
        isSidebarOpen,
        setIsSidebarOpen,
        locationStatus,
        showLocationWarning,
        setShowLocationWarning,
        handleRetryLocationPermission
    } = usePharmacyPage();

    const { theme, toggleTheme } = useTheme();
    const { trackEvent } = useAnalytics();
    const [isDocsOpen, setIsDocsOpen] = useState(false);

    // ------------------------ UI BÖLÜMÜ ------------------------

    const getLocationWarning = () => {
        if (locationStatus !== 'denied' || !showLocationWarning) return null;

        return (
            <div
                className="absolute top-20 left-4 right-4 md:left-auto md:right-8 md:w-80 z-[2000] animate-in fade-in slide-in-from-top-4">
                <div
                    className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-red-100 dark:border-red-900 relative group">
                    <button
                        onClick={() => setShowLocationWarning(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X size={18}/>
                    </button>

                    <div className="flex items-start gap-4 pr-6">
                        <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-2xl text-red-600 dark:text-red-400">
                            <MapPinOff size={24}/>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Konum Erişimi Kapalı</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                Size en yakın eczaneleri göstermemiz için konum izni vermeniz gerekiyor.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold mb-2 uppercase tracking-wider">
                            iPhone (Safari) için:
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                            Adres çubuğundaki <span className="font-bold">"AA"</span> veya <span
                            className="font-bold">"Kilit"</span> ikonuna basıp <span className="font-bold">"Web Sitesi Ayarları"</span> kısmından
                            Konum'a "İzin Ver" demelisiniz.
                        </p>
                    </div>

                    <button
                        onClick={() => handleRetryLocationPermission()}
                        className="w-full mt-3 py-2 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                        Ayarları Tamamladım, Tekrar Dene
                    </button>
                </div>
            </div>
        );
    };

    const getIconAndTitle = () => {
        return (
            <div className="flex flex-row items-center justify-between">
                <div className="text-left ml-1">
                    <h1 className="text-2xl font-black text-red-600 tracking-tighter">
                        İZMİR ECZANE
                    </h1>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                        Nöbetçi Eczane Listesi
                    </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <button 
                        onClick={() => {
                            setIsDocsOpen(true);
                            trackEvent('open_dev_docs');
                        }}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        title="Geliştiriciler İçin"
                    >
                        <Code size={20} />
                    </button>
                    <button 
                        onClick={toggleTheme}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        title="Temayı Değiştir"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <img src={logo} alt="İzmir Nöbetçi Eczane Logosu" className="w-10 h-10 rounded-xl hidden sm:block"/>
                </div>
            </div>
        );
    };

    const getAsideHeader = () => (
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
            {getIconAndTitle()}

            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Eczane veya ilçe ara..."
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );

    const getSidebarToggleButton = (isMobile: boolean) => {
        if (isMobile) {
            return (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden absolute top-4 right-4 z-[9999] bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-red-600 transition-colors"
                >
                    <Menu size={24}/>
                </button>
            );
        }

        return (
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`absolute top-4 z-[1002] bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-red-600 transition-all duration-300 ${
                    isSidebarOpen ? 'left-[390px]' : 'left-4'
                } md:flex hidden`} // Masaüstü için
            >
                {isSidebarOpen ? <ChevronLeft size={24}/> : <Menu size={24}/>}
            </button>
        );
    };

    const getAsideEczaneList = () => (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 dark:bg-slate-900/50 transition-colors no-scrollbar">
            {loading ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-slate-500 animate-pulse italic">
                    Yükleniyor...
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center h-40 text-red-500 text-center px-4">
                    <p className="font-bold">Veri bulunamadı veya servis geçici olarak kapalı.</p>
                    <p className="text-xs text-red-400 mt-2">Lütfen daha sonra tekrar deneyin.</p>
                </div>
            ) : eczaneler.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-slate-500 text-center px-4">
                    <p>Arama kriterlerinize uygun eczane bulunamadı.</p>
                </div>
            ) : (
                eczaneler.map((eczane) => (
                    <div
                        key={`${eczane.Adi}-${eczane.LokasyonX}`}
                        onClick={() => {
                            setSelectedEczane(eczane);
                            trackEvent('view_pharmacy', { pharmacy: eczane.Adi, bolge: eczane.Bolge });
                        }}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            selectedEczane?.Adi === eczane.Adi
                                ? 'border-red-500 bg-white dark:bg-slate-800 shadow-md ring-1 ring-red-500/20'
                                : 'border-transparent dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600 shadow-sm'
                        }`}
                    >
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">{eczane.Adi}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{eczane.Adres}</p>
                        <div className="flex items-center justify-between mt-3">
                            <span
                                className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-bold uppercase">
                                {eczane.Bolge}
                            </span>
                            <span className="text-xs text-red-600 dark:text-red-400 font-bold">{eczane.Telefon}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const getEczaneMap = () => (
        <div className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-slate-800 transition-colors">
            <PharmacyMap
                eczaneler={eczaneler}
                selectedEczane={selectedEczane}
                onMarkerClick={(eczane) => {
                    setSelectedEczane(eczane);
                    trackEvent('view_pharmacy_from_map', { pharmacy: eczane.Adi });
                }}
            />
        </div>
    );

    const getLoading = () => {
        if (!loading) return null;

        return (
            <div
                className="absolute inset-0 z-[1001] bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                <div
                    className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    };

    return (
        <div className="flex h-[100dvh] w-full overflow-hidden bg-white dark:bg-slate-900 relative font-sans transition-colors">
            {/* SEO Metadata */}
            <Helmet>
                <title>İzmir Nöbetçi Eczaneler | Canlı Harita ve Açık Veri</title>
                <meta name="description" content="İzmir açık verisi (izmir-open-data) ile beslenen en güncel nöbetçi eczaneler haritası. Size en yakın eczaneyi bulun, anında arayın ve yol tarifi alın." />
                <meta name="keywords" content="izmir nöbetçi eczane, eczane haritası, nöbetçi eczaneler bugün, izmir açık veri, izmir-open-data" />
                <meta property="og:title" content="İzmir Nöbetçi Eczaneler | Canlı Harita" />
                <meta property="og:description" content="İzmir'deki tüm güncel nöbetçi eczaneleri harita üzerinde görün, yol tarifi alın ve tek tıkla arayın." />
            </Helmet>

            <Toaster/>

            {getSidebarToggleButton(false)}

            <aside
                className={`
                fixed md:relative z-[1010] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
                transition-[width,transform] duration-300 ease-in-out flex flex-col overflow-hidden
                ${isSidebarOpen
                    ? 'w-[320px] md:w-[380px] translate-x-0'
                    : 'w-0 -translate-x-full md:translate-x-0 md:w-0'
                }
            `}
            >
                <div className="sidebar-content h-full flex flex-col">
                    {getAsideHeader()}
                    {getAsideEczaneList()}
                    <Footer/>
                </div>
            </aside>

            <div
                className={`
                md:hidden fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[1005] transition-opacity duration-300
                ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
                onClick={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 relative bg-slate-100 dark:bg-slate-800 h-full overflow-hidden transition-colors">
                {getLoading()}
                {getEczaneMap()}
                
                <PharmacyDetailsCard 
                    selectedEczane={selectedEczane} 
                    setSelectedEczane={setSelectedEczane} 
                />

                {getSidebarToggleButton(true)}
                {getLocationWarning()}
                
                <DeveloperDocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
            </main>
        </div>
    );
};

export default PharmacyPage;