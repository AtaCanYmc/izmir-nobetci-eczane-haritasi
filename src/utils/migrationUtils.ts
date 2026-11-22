export const MIGRATION_TARGET_URL = 'https://izmirharitalari.atacanymc.com.tr/';
export const MIGRATION_MODAL_STORAGE_KEY = 'migration_modal_dismissed';
export const MIGRATION_BANNER_STORAGE_KEY = 'migration_banner_dismissed';

export const isMigrationHostname = (hostname: string): boolean => {
  const normalized = hostname.trim().toLowerCase();
  return (
    normalized === 'izmirnobetcieczaneharitasi.live' ||
    normalized === 'www.izmirnobetcieczaneharitasi.live'
  );
};

export const isMigrationPreview = (search: string): boolean => {
  try {
    const params = new URLSearchParams(search);
    const value = params.get('preview-migration');
    return value === '1' || value === 'true';
  } catch {
    return false;
  }
};

export const shouldShowMigration = (hostname: string, search: string): boolean => {
  return isMigrationHostname(hostname) || isMigrationPreview(search);
};

export const isMigrationModalDismissed = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(MIGRATION_MODAL_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const dismissMigrationModal = (): void => {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(MIGRATION_MODAL_STORAGE_KEY, 'true');
    }
  } catch {
    // SessionStorage unavailable or quota exceeded
  }
};

export const isMigrationBannerDismissed = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(MIGRATION_BANNER_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const dismissMigrationBanner = (): void => {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(MIGRATION_BANNER_STORAGE_KEY, 'true');
    }
  } catch {
    // SessionStorage unavailable or quota exceeded
  }
};
