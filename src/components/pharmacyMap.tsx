import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Eczane } from "../types/eczane.ts";
import { formatDate } from "../utils/dateUtils.ts";

// 1. İkon Fix: ShadowUrl eklenmezse ikonlar havada asılı kalır
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const SelectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Varsayılan ikonu ayarla
L.Marker.prototype.options.icon = DefaultIcon;

// 2. Harita Boyut ve Odak Fixer
const MapController = ({ selectedEczane }: { selectedEczane: Eczane | null }) => {
    const map = useMap();

    // Sayfa ilk yüklendiğinde haritanın gri kalmasını (yanlış render) engeller
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);

    // Seçili eczane değiştiğinde oraya pürüzsüz kay
    useEffect(() => {
        if (selectedEczane) {
            const lat = parseFloat(selectedEczane.LokasyonX);
            const lng = parseFloat(selectedEczane.LokasyonY);
            map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
        }
    }, [selectedEczane, map]);

    return null;
};

interface PharmacyMapProps {
    eczaneler: Eczane[];
    selectedEczane: Eczane | null;
    onMarkerClick?: (eczane: Eczane) => void;
}

export const PharmacyMap = ({ eczaneler, selectedEczane, onMarkerClick }: PharmacyMapProps) => {
    const izmirMerkez: [number, number] = [38.4237, 27.1428];

    return (
        <div className="h-full w-full relative z-0 min-h-[100vh]">
            <MapContainer
                center={izmirMerkez}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                {/* Daha hızlı ve modern tile layer */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; OpenStreetMap'
                />

                <MapController selectedEczane={selectedEczane} />

                {/* Zoom kontrolünü daha modern bir yere (sağ alta) alalım */}
                <ZoomControl position="bottomright" />

                {eczaneler.map((eczane) => {
                    const lat = parseFloat(eczane.LokasyonX);
                    const lng = parseFloat(eczane.LokasyonY);

                    // Geçersiz koordinat kontrolü
                    if (isNaN(lat) || isNaN(lng)) return null;

                    const isSelected = selectedEczane?.Adi === eczane.Adi;

                    return (
                        <Marker
                            key={`${eczane.Adi}-${lat}-${lng}`}
                            position={[lat, lng]}
                            icon={isSelected ? SelectedIcon : DefaultIcon}
                            eventHandlers={{
                                click: () => onMarkerClick?.(eczane)
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1 min-w-[150px]">
                                    <h3 className="font-bold text-gray-900 border-b pb-1 mb-1">{eczane.Adi}</h3>
                                    <p className="text-[11px] text-gray-600 mb-2 leading-tight">{eczane.Adres}</p>
                                    <div className="flex flex-col gap-1.5">
                                        <a href={`tel:${eczane.Telefon}`}
                                           className="bg-red-600 text-white text-center py-1 rounded text-xs font-bold hover:bg-red-700 transition-colors">
                                            Hemen Ara
                                        </a>
                                        <div className="flex justify-between items-center text-[9px] text-gray-400">
                                            <span>📅 {formatDate(eczane.Tarih)}</span>
                                            <span className="font-bold text-red-800 uppercase">{eczane.Bolge}</span>
                                        </div>
                                        {eczane.BolgeAciklama && (
                                            <div className="p-1 bg-amber-50 border border-amber-100 rounded text-[10px] text-amber-800 italic">
                                                {eczane.BolgeAciklama}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};