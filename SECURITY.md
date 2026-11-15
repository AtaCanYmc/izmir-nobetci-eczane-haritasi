# Güvenlik Politikası (Security Policy)

Bu belge, **İzmir Nöbetçi Eczane Haritası** deposunun güvenlik yönetimi, sürüm destek standartları ve güvenlik açığı bildirim süreçlerini belirler.

## Desteklenen Sürümler

Güvenlik güncellemeleri yalnızca aktif `main` dalı ve en son yayımlanan sürüm için sağlanır. Eski dallar veya geçmiş commitler güvenlik yamaları almaz.

| Sürüm | Destek Durumu |
| :--- | :---: |
| `main` (Güncel Sürüm) | Destekleniyor |
| Geçmiş Sürümler / Commitler | Desteklenmiyor |

## Güvenlik Açığı Bildirimi

Bir güvenlik açığı veya veri güvenliği zafiyeti tespit ettiğinizde, bunu herkese açık bir GitHub Issue üzerinden bildirmeyiniz.

Lütfen aşağıdaki adımları izleyin:

1. **Özel Bildirim Kanalı:** Deponun [GitHub Security Advisories](https://github.com/AtaCanYmc/izmir-nobetci-eczane-haritasi/security/advisories/new) sekmesi üzerinden özel bir danışma raporu açın. Alternatif olarak doğrudan `atacanymc@gmail.com` adresine e-posta gönderin.
2. **Yeniden Üretim Detayları:** Güvenlik açığını tetikleyen adımları, etkilenen bileşenleri ve varsa kavram kanıtı (Proof of Concept) kodunu ekleyin.
3. **Müdahale Süresi (SLA):** Tüm güvenlik raporları en geç 48 saat içerisinde incelenir ve rapor sahibine ilk geri bildirim iletilir.
4. **Yama ve Açıklama:** Sorunun doğrulanmasının ardından yama geliştirilir ve güvenlik yaması ana dala entegre edildikten sonra kamuoyu bilgilendirmesi yapılır.
