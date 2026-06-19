# Katkıda Bulunma Rehberi (Contributing Guidelines)

Öncelikle, İzmir Nöbetçi Eczane Haritası projesine katkıda bulunmayı düşündüğünüz için teşekkür ederiz! Açık kaynak topluluğu, bu gibi projeleri geliştirmek ve herkese faydalı bir hale getirmek için çok önemlidir.

Aşağıda projeye nasıl katkıda bulunabileceğinize dair adımlar yer almaktadır.

## Geliştirme Ortamını Kurma

Kendi bilgisayarınızda projeyi ayağa kaldırmak için şu adımları izleyin:

1. **Projeyi Fork'layın:** GitHub üzerinden projeyi kendi hesabınıza forklayın.
2. **Klonlayın:** Forkladığınız depoyu bilgisayarınıza indirin.
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/izmir-nobetci-eczane-haritasi.git
   ```
3. **Bağımlılıkları Yükleyin:** Proje dizinine giderek gerekli paketleri kurun.
   ```bash
   cd izmir-nobetci-eczane-haritasi
   npm install
   ```
4. **Çalıştırın:** Geliştirme sunucusunu başlatın.
   ```bash
   npm run dev
   ```

## Katkı Yapma Adımları

1. **Yeni Bir Branch Açın:** Çalışmalarınızı `main` dalı üzerinde yapmamaya özen gösterin.
   ```bash
   git checkout -b feature/yeni-ozellik-adiniz
   # veya hata düzeltmesi için
   git checkout -b fix/hata-adi
   ```
2. **Değişikliklerinizi Yapın:** Kodunuzu yazarken projenin mevcut kodlama stillerine (ESLint ve TypeScript kuralları) uymaya gayret edin.
3. **Type Check & Build:** Kodunuzu pushlamadan önce hatalara karşı test edin:
   ```bash
   npm run type-check && npm run build
   ```
4. **Commit Atın:** Yaptığınız değişiklikleri açıklayıcı bir mesajla commit'leyin.
   ```bash
   git commit -m "feat: haritaya yeni bir özellik eklendi"
   ```
5. **Push ve Pull Request:** Branch'inizi kendi deponuza push'layın ve ardından orijinal depoya bir **Pull Request (PR)** açın.
   ```bash
   git push origin feature/yeni-ozellik-adiniz
   ```

## Hata (Bug) Bildirimi veya İstekler (Issues)
- Kod yazmak istemiyor ancak bir hata bulduysanız veya yeni bir özellik öneriniz varsa, lütfen [Issues](https://github.com/AtaCanYmc/izmir-nobetci-eczane-haritasi/issues) kısmından detaylı bir açıklama ile kayıt oluşturun.

## Kodlama Standartları
- React bileşenlerinde fonksiyonel yapıyı (Functional Components) ve Hooks mimarisini kullanıyoruz.
- Stillendirmeler (Styling) için Tailwind CSS kullanıyoruz. Özelleştirilmiş bir CSS yazmadan önce, Tailwind utility class'larını tercih edin.
- TypeScript kullanırken `any` kullanımından kaçının ve mümkün olduğunca spesifik arayüzler (Interfaces) oluşturun.

Zaman ayırdığınız ve topluluğa destek olduğunuz için teşekkürler!
