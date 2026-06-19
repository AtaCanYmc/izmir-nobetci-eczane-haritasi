import type {Eczane} from "../types/eczane.ts";

import { IzmirAPI } from "izmir-open-data-js";

// SDK örneği oluşturuyoruz.
// API istekleri doğrudan bu istemci üzerinden yapılacak.
export const izmirApi = new IzmirAPI();

export const fetchNobetciEczaneler = async (): Promise<Eczane[]> => {
    try {
        const response = await izmirApi.eczaneler.getNobetciList();
        return response as unknown as Eczane[]; // Ensure type compatibility
    } catch (error) {
        console.error("Nöbetçi eczaneler yüklenirken hata oluştu:", error);
        throw error;
    }
};

export const fetchEczaneler = async (): Promise<Eczane[]> => {
    try {
        const response = await izmirApi.eczaneler.getList();
        return response as unknown as Eczane[];
    } catch (error) {
        console.error("Eczaneler yüklenirken hata oluştu:", error);
        throw error;
    }
};

export const openEczaneOnMap = (eczane: Eczane) => {
    window.open(`https://www.google.com/maps?q=${eczane.LokasyonX},${eczane.LokasyonY}`)
};

export const callEczane = (eczane: Eczane) => {
    window.location.href = `tel:${eczane.Telefon}`;
};
