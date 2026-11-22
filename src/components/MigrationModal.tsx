import { useEffect } from 'react';
import { X, ExternalLink, MapPin } from 'lucide-react';
import { MIGRATION_TARGET_URL } from '../utils/migrationUtils.ts';

interface MigrationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const MigrationModal = ({ isOpen, onDismiss }: MigrationModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDismiss]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="migration-dialog-title"
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Bildirimi kapat"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Adres Değişikliği Bildirimi
            </span>
            <h2 id="migration-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight">
              Yeni Adresimize Taşınıyoruz
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          <strong className="text-slate-900 dark:text-white font-semibold">izmirnobetcieczaneharitasi.live</strong> alan
          adı <strong className="text-slate-900 dark:text-white font-semibold">9 Şubat 2027</strong> tarihinde
          kapanacaktır. Nöbetçi eczaneler dahil olmak üzere tüm İzmir haritaları artık daha kapsamlı katmanlarla{' '}
          <strong className="text-red-600 dark:text-red-400 font-semibold">izmirharitalari.atacanymc.com.tr</strong>{' '}
          adresinde güncel olarak sunulmaktadır.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={MIGRATION_TARGET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] py-3 px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors shadow-md shadow-red-600/20 active:scale-[0.98]"
          >
            <span>Yeni Haritaya Git</span>
            <ExternalLink size={16} />
          </a>
          <button
            type="button"
            onClick={onDismiss}
            className="min-h-[44px] py-3 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-sm transition-colors text-center"
          >
            Şimdilik Burada Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};
