# Yol Haritası (Roadmap)

Bu belge, **İzmir Nöbetçi Eczane Haritası** projesinin tamamlanan sürümlerini ve planlanan teknik geliştirme adımlarını içerir.

---

## Sürüm Aşamaları

### v1.0.0 (Temel Sürüm - Tamamlandı)
- [x] `izmir-open-data-js` SDK entegrasyonu ile resmi İzmir Büyükşehir Belediyesi nöbetçi eczane verisi çekimi.
- [x] Leaflet tabanlı interaktif harita arayüzü ve konuma göre otomatik odaklanma.
- [x] TanStack Query ile 15 dakikalık akıllı veri önbellekleme ve arka plan senkronizasyonu.
- [x] Açık ve koyu tema desteği (`CartoDB Voyager` ve `Dark Matter` harita katmanları).
- [x] Harita görüntüsü (`PNG`) ve veri dışa aktarım (`JSON`, `CSV`, `GeoJSON`, `HTML`) motoru.
- [x] Progressive Web App (PWA) desteği ve işletim sistemine özel kurulum rehberleri.

### v1.1.0 (Performans ve Çevrimdışı İyileştirmeler - Planlanan)
- [ ] Çevrimdışı kullanım için son çekilen verilerin IndexedDB üzerinde saklanması.
- [ ] Kullanıcının mevcut koordinatlarına göre en yakın eczaneleri metre cinsinden sıralayan liste paneli.
- [ ] İlçe ve mahalle bazlı çoklu arama filtreleme optimizasyonu.

### v1.2.0 (Rota ve Ulaşım Entegrasyonu - Planlanan)
- [ ] Seçilen eczane için toplu taşıma (ESHOT / Metro / Tramvay) durak yakınlıklarının harita katmanı olarak sunulması.
- [ ] Harita üzerinde doğrudan yürüyüş ve sürüş mesafesi hesaplama aracı.
