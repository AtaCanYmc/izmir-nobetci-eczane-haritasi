import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, {type LeafletEventHandlerFnMap} from 'leaflet';
import type {Eczane} from "../../types/eczane.ts";
import {formatDate} from "../../utils/dateUtils.ts";
import MapController from "./mapController.tsx";
import {DefaultIcon, SelectedIcon, userIcon} from "./mapIcons.tsx";
import {callEczane, openEczaneOnMap} from "../../services/api.ts";

// Varsayılan ikonu ayarla
L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({center}: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
};

interface PharmacyMapProps {
    eczaneler: Eczane[];
    selectedEczane: Eczane | null;
    onMarkerClick?: (eczane: Eczane) => void;
}

import { useTheme } from "../../contexts/ThemeContext.tsx";

// (Inside PharmacyMap Component)
export const PharmacyMap = (props: PharmacyMapProps) => {
    const { theme } = useTheme();
    const {eczaneler, selectedEczane, onMarkerClick} = props;
    const izmirMerkez: [number, number] = [38.4237, 27.1428];
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const getEczanePopupContent = (eczane: Eczane) => (
        <div className="p-1 min-w-[150px]">
            <h3 className="font-bold text-gray-900 border-b pb-1 mb-1">{eczane.Adi}</h3>
            <p className="text-[11px] text-gray-600 mb-2 leading-tight">{eczane.Adres}</p>
            <div className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-2 sm:flex-col pb-3">
                    <button
                        onClick={() => callEczane(eczane)}
                        className="flex-1 bg-red-600 text-white text-center py-2 rounded-xl font-bold text-xs">
                        ARA
                    </button>
                    <button
                        onClick={() => openEczaneOnMap(eczane)}
                        className="flex-1 bg-slate-900 text-white py-2 rounded-xl font-bold text-xs">
                        YOL TARİFİ
                    </button>
                </div>
                <div className="flex justify-between items-center text-[9px] text-gray-400">
                    <span>📅 {formatDate(eczane.Tarih)}</span>
                    <span className="font-bold text-red-800 uppercase">{eczane.Bolge}</span>
                </div>
                {eczane.BolgeAciklama && (
                    <div
                        className="p-1 bg-amber-50 border border-amber-100 rounded text-[10px] text-amber-800 italic">
                        {eczane.BolgeAciklama}
                    </div>
                )}
            </div>
        </div>
    );

    const getEczanelerWithValidCoords = (eczane: Eczane) => {
        const lat = parseFloat(eczane.LokasyonX);
        const lng = parseFloat(eczane.LokasyonY);

        // Geçersiz koordinat kontrolü
        if (isNaN(lat) || isNaN(lng)) return null;

        const isSelected = selectedEczane?.Adi === eczane.Adi;

        const handlers: LeafletEventHandlerFnMap = {
            click: () => onMarkerClick?.(eczane)
        };

        return (
            <Marker
                key={`${eczane.Adi}-${lat}-${lng}`}
                position={[lat, lng]}
                icon={isSelected ? SelectedIcon : DefaultIcon}
                eventHandlers={handlers}
            >
                <Popup className="custom-popup">
                    {getEczanePopupContent(eczane)}
                </Popup>
            </Marker>
        );
    };

    const LocationButton = ({ userLocation }: { userLocation: [number, number] | null }) => {
        const map = useMap();

        const handleClick = () => {
            if (userLocation) {
                // Haritayı kullanıcının konumuna yumuşak bir geçişle (flyTo) odaklar
                map.flyTo(userLocation, 15, {
                    duration: 1.5 // Saniye cinsinden geçiş süresi
                });
            } else {
                alert("Konumunuz henüz alınamadı. Lütfen izin verdiğinizden emin olun.");
            }
        };

        return (
            <div className="leaflet-bottom leaflet-right !mb-24 !ml-3">
                {/* Zoom kontrolüne çarpmaması için margin değerlerini ayarladık */}
                <div className="leaflet-control">
                    <button
                        onClick={handleClick}
                        className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-90 group"
                        title="Konumuma Dön"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-6 h-6 ${userLocation ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <circle cx="12" cy="12" r="3" fill="currentColor" className="opacity-20" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 10H2" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const getUserMarker = () => {
        if (!userLocation) return null;

        return (
            <Marker position={userLocation} icon={userIcon}>
                <Popup>Buradasınız</Popup>
            </Marker>
        );
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            });
        }
    }, []);

    const tileUrl = theme === 'dark' 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    return (
        <div className="h-full w-full relative z-0 min-h-[100vh] transition-colors">
            <MapContainer
                center={izmirMerkez}
                zoom={11}
                style={{height: '100%', width: '100%'}}
                zoomControl={false}
            >
                <TileLayer
                    url={tileUrl}
                    attribution='&copy; OpenStreetMap'
                />

                <MapController selectedEczane={selectedEczane}/>
                {userLocation && <ChangeView center={userLocation}/>}
                <ZoomControl position="bottomright"/>
                <LocationButton userLocation={userLocation} />

                {eczaneler.map(getEczanelerWithValidCoords)}
                {userLocation && getUserMarker()}
            </MapContainer>
        </div>
    );
};