import { useState, useEffect } from 'react';
import { X, Share, PlusSquare, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { useAnalytics } from '../hooks/useAnalytics.ts';

export const InstallPWAPrompt = () => {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        // Zaten uygulama olarak (standalone) açılmışsa gösterme
        const isAppMode = window.matchMedia('(display-mode: standalone)').matches 
                       || (window.navigator as any).standalone 
                       || document.referrer.includes('android-app://');
                       
        setIsStandalone(!!isAppMode);

        if (isAppMode) return;

        // Daha önce kapatılmış mı kontrol et
        const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
        if (hasDismissed) return;

        // iOS Kontrolü
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIOSDevice);

        if (isIOSDevice) {
            // iOS için biraz gecikmeli göster (kullanıcı siteyi 3 sn incelesin)
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        // Android / Chrome için yerel PWA yükleme prompt'unu yakala
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    if (!showPrompt || isStandalone) return null;

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa_prompt_dismissed', 'true');
        trackEvent('pwa_prompt_dismissed');
    };

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            trackEvent('pwa_installed_android');
            setShowPrompt(false);
        } else {
            trackEvent('pwa_install_rejected_android');
        }
        
        setDeferredPrompt(null);
    };

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[9999] animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className={`p-5 rounded-3xl shadow-2xl border relative overflow-hidden ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}>
                <button
                    onClick={handleDismiss}
                    className={`absolute top-3 right-3 p-1.5 rounded-full transition-colors ${
                        isDark ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-400 hover:bg-slate-100'
                    }`}
                >
                    <X size={18} />
                </button>

                <div className="flex items-start gap-4 mb-3">
                    <div className="bg-red-500 rounded-xl p-2.5 shadow-lg shadow-red-500/30 shrink-0">
                        <Download size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Uygulamayı Yükle
                        </h3>
                        <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            İzmir nöbetçi eczanelerine tarayıcıyı açmadan, tek tıkla ana ekranından eriş.
                        </p>
                    </div>
                </div>

                {isIOS ? (
                    <div className={`mt-4 p-3 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
                        <p className={`text-xs font-medium flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white dark:bg-slate-800 shadow-sm">
                                <Share size={14} className="text-blue-500" />
                            </span>
                            <span>Tarayıcının alt menüsünden <strong>Paylaş</strong>'a dokun</span>
                        </p>
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-2" />
                        <p className={`text-xs font-medium flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white dark:bg-slate-800 shadow-sm">
                                <PlusSquare size={14} className="text-slate-700 dark:text-slate-300" />
                            </span>
                            <span><strong>Ana Ekrana Ekle</strong> seçeneğini seç</span>
                        </p>
                    </div>
                ) : (
                    <button
                        onClick={handleInstallClick}
                        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-red-600/20 active:scale-[0.98]"
                    >
                        Hemen Yükle
                    </button>
                )}
            </div>
        </div>
    );
};
