import {useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type {Eczane} from "../types/eczane.ts";
import {formatDate} from "../utils/dateUtils.ts";

// Leaflet ikon düzeltmesi
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const SelectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Haritayı seçilen eczaneye kaydıran yardımcı bileşen
const MapRecenter = ({lat, lng}: { lat: number, lng: number }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lng], 15, {animate: true, duration: 1.5});
    }, [lat, lng, map]);
    return null;
};

interface PharmacyMapProps {
    eczaneler: Eczane[];
    selectedEczane: Eczane | null;
    onMarkerClick?: (eczane: Eczane) => void;
}

export const PharmacyMap = ({eczaneler, selectedEczane, onMarkerClick}: PharmacyMapProps) => {
    const izmirMerkez: [number, number] = [38.4237, 27.1428];

    return (
        <div className="h-full w-full relative z-0">
            <MapContainer
                center={izmirMerkez}
                zoom={11}
                style={{height: '100%', width: '100%'}}
                zoomControl={false} // Modern görünüm için kontrolü sağa alacağız veya gizleyeceğiz
            >
                <TileLayer
                    url="https://{s}.tile.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Daha modern, sade bir harita stili
                    attribution='&copy; OpenStreetMap'
                />

                {/* Seçili eczaneye odaklanma */}
                {selectedEczane && (
                    <MapRecenter
                        lat={parseFloat(selectedEczane.LokasyonX)}
                        lng={parseFloat(selectedEczane.LokasyonY)}
                    />
                )}

                {eczaneler.map((eczane) => {
                    const lat = parseFloat(eczane.LokasyonX);
                    const lng = parseFloat(eczane.LokasyonY);
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
                                <div className="p-1">
                                    <h3 className="font-bold text-gray-900 border-b pb-1 mb-1">{eczane.Adi}</h3>
                                    <p className="text-xs text-gray-600 mb-2">{eczane.Adres}</p>
                                    <div className="flex flex-col gap-1">
                                        <a href={`tel:${eczane.Telefon}`}
                                           className="text-blue-600 text-xs font-semibold flex items-center">
                                            📞 {eczane.Telefon}
                                        </a>
                                        <span className="text-[10px] text-gray-400">
                                            📅 {formatDate(eczane.Tarih)}
                                        </span>
                                        {eczane.BolgeAciklama && (
                                            <div className="mt-1 p-1 bg-red-50 rounded text-[10px] text-red-700 italic">
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