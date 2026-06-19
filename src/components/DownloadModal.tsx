import {X, Image, FileJson, FileText, MapPin, FileCode} from 'lucide-react';
import {toast} from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext.tsx';
import type { Eczane } from '../types/eczane.ts';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    mapPoints: Eczane[];
    onDownloadPNG: () => Promise<void>;
}

export const DownloadModal = ({
    isOpen,
    onClose,
    mapPoints,
    onDownloadPNG,
}: DownloadModalProps) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const mapTitle = "Izmir Nobetci Eczaneler";

    if (!isOpen) return null;

    const handleDownloadJSON = () => {
        try {
            const data = {
                title: mapTitle,
                timestamp: new Date().toISOString(),
                pointCount: mapPoints.length,
                points: mapPoints,
            };

            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `izmir-nobetci-eczaneler-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);

            toast.success('JSON başarıyla indirildi!');
            onClose();
        } catch (error) {
            console.error('JSON indirme hatası:', error);
            toast.error('JSON indirme hatası.');
        }
    };

    const handleDownloadCSV = () => {
        try {
            if (mapPoints.length === 0) {
                toast.error('İndirilecek veri yok');
                return;
            }

            // CSV başlık satırı
            const headers = ['ID', 'Tarih', 'LokasyonX (Enlem)', 'LokasyonY (Boylam)', 'Adi', 'Telefon', 'Adres', 'Bolge', 'BolgeAciklama'];
            const rows = mapPoints.map((point) => [
                `${point.Adi}-${point.LokasyonX}`,
                point.Tarih || '',
                point.LokasyonX || '',
                point.LokasyonY || '',
                `"${(point.Adi || '').replace(/"/g, '""')}"`,
                `"${(point.Telefon || '').replace(/"/g, '""')}"`,
                `"${(point.Adres || '').replace(/"/g, '""')}"`,
                `"${(point.Bolge || '').replace(/"/g, '""')}"`,
                `"${(point.BolgeAciklama || '').replace(/"/g, '""')}"`,
            ]);

            const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
            // Türkçe karakterler için BOM ekliyoruz
            const blob = new Blob(["\uFEFF" + csv], {type: 'text/csv;charset=utf-8;'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `izmir-nobetci-eczaneler-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            URL.revokeObjectURL(url);

            toast.success('CSV başarıyla indirildi!');
            onClose();
        } catch (error) {
            console.error('CSV indirme hatası:', error);
            toast.error('CSV indirme hatası.');
        }
    };

    const handleDownloadGeoJSON = () => {
        try {
            if (mapPoints.length === 0) {
                toast.error('İndirilecek veri yok');
                return;
            }

            const features = mapPoints.map((point: Eczane) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    // GeoJSON koordinatları [Boylam, Enlem] şeklindedir
                    coordinates: [parseFloat(point.LokasyonY) || 0, parseFloat(point.LokasyonX) || 0],
                },
                properties: {
                    id: `${point.Adi}-${point.LokasyonX}`,
                    title: point.Adi,
                    telefon: point.Telefon,
                    adres: point.Adres,
                    bolge: point.Bolge,
                    tarih: point.Tarih
                },
            }));

            const geoJson = {
                type: 'FeatureCollection',
                features,
            };

            const json = JSON.stringify(geoJson, null, 2);
            const blob = new Blob([json], {type: 'application/geo+json'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `izmir-nobetci-eczaneler-${new Date().toISOString().split('T')[0]}.geojson`;
            link.click();
            URL.revokeObjectURL(url);

            toast.success('GeoJSON başarıyla indirildi!');
            onClose();
        } catch (error) {
            console.error('GeoJSON indirme hatası:', error);
            toast.error('GeoJSON indirme hatası.');
        }
    };

    const handleDownloadHTML = () => {
        try {
            if (mapPoints.length === 0) {
                toast.error('İndirilecek veri yok');
                return;
            }

            // Leaflet harita HTML'i oluştur
            const html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İzmir Nöbetçi Eczaneler Haritası</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
        #map { width: 100vw; height: 100vh; }
        .info { padding: 8px 12px; background: white; border-radius: 8px; box-shadow: 0 0 15px rgba(0,0,0,0.2); }
        .info h4 { margin: 0 0 5px 0; color: #dc2626; font-weight: 600; }
        .info p { margin: 3px 0; font-size: 13px; color: #666; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
    <script>
        // Harita oluştur
        const map = L.map('map').setView([38.4237, 27.1428], 11);
        
        // Tile layer ekle
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Veri noktaları
        const points = ${JSON.stringify(mapPoints)};

        // Marker'ları ekle
        points.forEach(point => {
            const lat = parseFloat(point.LokasyonX);
            const lng = parseFloat(point.LokasyonY);
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng]);
                
                const popupContent = \`
                    <div style="min-width: 200px;">
                        <h4 style="margin: 0 0 8px 0; color: #dc2626; font-weight: 600;">\${point.Adi || 'İsim Yok'}</h4>
                        <p style="margin: 4px 0; font-size: 12px; color: #666;"><strong>Adres:</strong> \${point.Adres || '-'}</p>
                        <p style="margin: 4px 0; font-size: 12px; color: #666;"><strong>Telefon:</strong> \${point.Telefon || '-'}</p>
                        <p style="margin: 4px 0; font-size: 12px;"><span style="background: #fee2e2; color: #dc2626; padding: 2px 6px; border-radius: 4px;">\${point.Bolge || '-'}</span></p>
                    </div>
                \`;
                
                marker.bindPopup(popupContent);
                marker.addTo(map);
            }
        });

        // Info paneli ekle
        const info = L.control();
        info.onAdd = () => {
            const div = L.DomUtil.create('div', 'info');
            div.innerHTML = \`
                <h4>İzmir Nöbetçi Eczaneler</h4>
                <p><strong>\${points.length}</strong> eczane bulundu</p>
            \`;
            return div;
        };
        info.addTo(map);
    </script>
</body>
</html>`;

            const blob = new Blob([html], {type: 'text/html;charset=utf-8;'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `izmir-nobetci-eczaneler-${new Date().toISOString().split('T')[0]}.html`;
            link.click();
            URL.revokeObjectURL(url);

            toast.success('HTML harita başarıyla indirildi!');
            onClose();
        } catch (error) {
            console.error('HTML indirme hatası:', error);
            toast.error('HTML indirme hatası.');
        }
    };

    const handleDownloadPNGWrapper = async () => {
        await onDownloadPNG();
        onClose();
    };

    const downloadOptions = [
        {
            id: 'png',
            label: 'Harita (PNG)',
            description: 'Haritanın görüntüsünü indir',
            icon: Image,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
            onClick: handleDownloadPNGWrapper,
        },
        {
            id: 'json',
            label: 'Veri (JSON)',
            description: 'Tüm verileri JSON formatında indir',
            icon: FileJson,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950',
            onClick: handleDownloadJSON,
        },
        {
            id: 'csv',
            label: 'Tablo (CSV)',
            description: 'Verileri tablo formatında indir',
            icon: FileText,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950',
            onClick: handleDownloadCSV,
        },
        {
            id: 'geojson',
            label: 'Harita Verisi (GeoJSON)',
            description: 'Verileri GIS formatında indir',
            icon: MapPin,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
            onClick: handleDownloadGeoJSON,
        },
        {
            id: 'html',
            label: 'İnteraktif Harita (HTML)',
            description: 'Tarayıcıda açılabilen harita indir',
            icon: FileCode,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
            onClick: handleDownloadHTML,
        },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[2000] backdrop-blur-sm ${isDarkMode ? 'bg-black/50' : 'bg-black/40'}`}
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4">
                <div className={`rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200 border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                            İndirme Formatı Seç
                        </h2>
                        <button
                            onClick={onClose}
                            className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                                isDarkMode ? 'hover:bg-slate-700 text-slate-500' : 'hover:bg-slate-100 text-slate-400'
                            }`}
                        >
                            <X size={24} className={isDarkMode ? 'dark:text-slate-500' : 'text-slate-400'} />
                        </button>
                    </div>

                    <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Harita ve verilerinizi istediğiniz formatta indirebilirsiniz.
                    </p>

                    {/* Download Options */}
                    <div className="space-y-3">
                        {downloadOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.id}
                                    onClick={option.onClick}
                                    className={`w-full p-4 rounded-xl border-2 border-transparent transition-all group ${
                                        isDarkMode ? 'hover:border-slate-600' : 'hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${
                                            isDarkMode ? option.bgColor.replace('50', '950') : option.bgColor
                                        }`}>
                                            <Icon size={24} className={option.color} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <h3 className={`font-semibold ${option.color}`}>
                                                {option.label}
                                            </h3>
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                                {option.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                        <button
                            onClick={onClose}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            İptal Et
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
