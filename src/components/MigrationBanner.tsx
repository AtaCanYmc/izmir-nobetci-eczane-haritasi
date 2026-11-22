import { X, ExternalLink } from 'lucide-react';
import { MIGRATION_TARGET_URL } from '../utils/migrationUtils.ts';

interface MigrationBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const MigrationBanner = ({ isVisible, onDismiss }: MigrationBannerProps) => {
  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Alan adı taşınma bildirimi"
      className="absolute top-0 inset-x-0 z-[1003] bg-amber-500 dark:bg-amber-400 text-slate-950 px-3 py-2 pr-16 md:pr-3 shadow-sm text-xs transition-colors flex items-center justify-between gap-2"
    >
      <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden text-center flex-wrap sm:flex-nowrap">
        <span className="truncate">
          Bu alan adı <strong>9 Şubat 2027</strong> tarihinde kapanacaktır.
        </span>
        <a
          href={MIGRATION_TARGET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold underline shrink-0 hover:text-black transition-colors"
        >
          <span>izmirharitalari.atacanymc.com.tr</span>
          <ExternalLink size={12} />
        </a>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Uyarı şeridini kapat"
        className="shrink-0 text-slate-950 hover:bg-amber-600/30 rounded p-1 min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};
