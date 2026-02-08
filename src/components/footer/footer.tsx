const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-8 px-4 mt-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

                {/* 1. Bölüm: Hakkında */}
                <div>
                    <h3 className="text-white font-bold mb-3 text-base">İzmir Eczane Haritası</h3>
                    <p className="leading-relaxed">
                        İzmir genelindeki nöbetçi eczaneleri en hızlı ve güncel şekilde bulmanız için geliştirilmiş bir
                        açık kaynak projesidir.
                    </p>
                </div>

                {/* 2. Bölüm: Veri Kaynağı */}
                <div>
                    <h3 className="text-white font-bold mb-3 text-base">Veri Kaynağı</h3>
                    <p className="mb-2">Eczane verileri her gün otomatik olarak güncellenmektedir.</p>
                    <a
                        href="https://acikveri.izmir.bel.tr/"
                        target="_blank"
                        className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                        İzmir Büyükşehir Belediyesi Açık Veri Portalı
                    </a>
                </div>

                {/* 3. Bölüm: İletişim & Linkler */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-white font-bold mb-3 text-base">Bağlantılar</h3>
                    <a href="https://github.com/atacanymc/izmir-nobetci-eczane-haritasi"
                       className="hover:text-white transition-colors">GitHub Proje Sayfası</a>
                    <a href="/LICENSE" className="hover:text-white transition-colors">Lisans (MIT)</a>
                </div>

            </div>

            <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
                <p>© 2026 Ata Can Yılmaz. Tüm hakları saklıdır.</p>
                <p className="mt-1 italic">Not: Bu uygulama resmi bir kurum kuruluşu değildir. Verilerdeki anlık
                    değişikliklerden dolayı eczane ile iletişime geçilmesi önerilir.</p>
            </div>
        </footer>
    );
};

export default Footer;
