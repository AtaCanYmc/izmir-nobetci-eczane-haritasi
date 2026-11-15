# Katkıda Bulunma Rehberi (Contributing Guide)

Bu rehber, **İzmir Nöbetçi Eczane Haritası** projesine katkıda bulunmak isteyen geliştiriciler için iş akışı, kodlama kuralları ve doğrulama adımlarını belirler.

---

## İçindekiler

- [Geliştirme Ortamı Kurulumu](#geliştirme-ortamı-kurulumu)
- [Dal (Branch) Adlandırma Standartları](#dal-branch-adlandırma-standartları)
- [Commit Mesajı Standartları](#commit-mesajı-standartları)
- [Doğrulama ve Derleme](#doğrulama-ve-derleme)
- [Pull Request Süreci](#pull-request-süreci)
- [Kodlama Standartları](#kodlama-standartları)

---

## Geliştirme Ortamı Kurulumu

Projeyi yerel makinenizde çalıştırmak için Node.js 20+ gereklidir.

1. Depoyu forklayın ve yerel ortamınıza klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/izmir-nobetci-eczane-haritasi.git
   cd izmir-nobetci-eczane-haritasi
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

---

## Dal (Branch) Adlandırma Standartları

Tüm geliştirmeler izole dallar üzerinden yürütülmelidir. `main` dalına doğrudan commit gönderilmez.

| Dal Öneki | Amaç | Örnek |
| :--- | :--- | :--- |
| `feature/` | Yeni bir özellik veya kullanıcı arayüzü kabiliyeti | `feature/export-csv-button` |
| `fix/` | Hata düzeltmesi veya uyumluluk onarımı | `fix/geolocation-safari-timeout` |
| `docs/` | Dokümantasyon eklemeleri veya düzeltmeleri | `docs/update-architecture-flow` |
| `refactor/` | Davranışı değiştirmeyen kod optimizasyonları | `refactor/leaflet-icon-loader` |
| `chore/` | Bağımlılık, CI veya build araçları güncellemeleri | `chore/upgrade-vite-plugin-pwa` |

---

## Commit Mesajı Standartları

Depo, [Conventional Commits](https://www.conventionalcommits.org/) standardını zorunlu tutar.

Format: `<tür>(<kapsam>): <kısa açıklama>`

| Tür | Kullanım Alanı | Örnek |
| :--- | :--- | :--- |
| `feat` | Yeni özellik veya harita katmanı | `feat(map): add offline export format selector` |
| `fix` | Hata onarımı | `fix(cache): resolve tanstack query stale time overflow` |
| `docs` | Dokümantasyon değişiklikleri | `docs(readme): update sdk usage example` |
| `refactor` | Kod sadeleştirme ve temizlik | `refactor(types): consolidate eczane interface models` |
| `test` | Test ekleme veya mevcut testleri güncelleme | `test(utils): add date formatting edge cases` |
| `chore` | CI, build konfigürasyonu ve paket güncellemeleri | `chore(ci): add dependabot workflow` |

---

## Doğrulama ve Derleme

Bir Pull Request açmadan önce yerel ortamınızda aşağıdaki doğrulama komutlarının hatasız geçtiğinden emin olun:

```bash
# Tip doğrulaması
npm run type-check

# Üretim paketi derlemesi
npm run build
```

---

## Pull Request Süreci

1. Yeni bir çalışma dalı oluşturun:
   ```bash
   git checkout -b feature/kullanici-konum-takibi
   ```
2. Değişiklikleri Conventional Commit kurallarına uygun olarak kaydedin.
3. Yerel doğrulama komutlarını çalıştırın (`npm run type-check && npm run build`).
4. Dalınızı uzak depoya gönderin ve `main` dalına yönelik bir Pull Request açın.
5. Açılan PR şablonundaki alanları doldurun ve ilgili Issue numarasını bağlayın (`Closes #12`).

---

## Kodlama Standartları

- **TypeScript:** `any` tipi kullanımından kaçının. Modeller için `src/types/` altındaki tipleri kullanın veya genişletin.
- **Bileşenler:** Fonksiyonel React bileşenleri ve React Hooks mimarisini tercih edin.
- **Stil Yönetimi:** Arayüz stilleri için Tailwind CSS v4 utility sınıflarını kullanın. Harici özel CSS tanımlamalarından kaçının.
- **Harita Bileşenleri:** Leaflet DOM manipülasyonlarını doğrudan yapmak yerine `react-leaflet` bileşenleri ve özel hook'lar üzerinden yönetin.
