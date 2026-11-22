import { describe, it, expect, beforeEach } from 'vitest';
import {
  MIGRATION_TARGET_URL,
  MIGRATION_MODAL_STORAGE_KEY,
  MIGRATION_BANNER_STORAGE_KEY,
  isMigrationHostname,
  isMigrationPreview,
  shouldShowMigration,
  isMigrationModalDismissed,
  dismissMigrationModal,
  isMigrationBannerDismissed,
  dismissMigrationBanner,
} from './migrationUtils.ts';

describe('migrationUtils', () => {
  beforeEach(() => {
    let store: Record<string, string> = {};
    const mockStorage = {
      getItem: (key: string): string | null => store[key] ?? null,
      setItem: (key: string, value: string): void => {
        store[key] = String(value);
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
      clear: (): void => {
        store = {};
      },
    };

    (globalThis as unknown as { window: { sessionStorage: typeof mockStorage } }).window = {
      sessionStorage: mockStorage,
    };
  });

  describe('MIGRATION_TARGET_URL', () => {
    it('points to the canonical new address', () => {
      expect(MIGRATION_TARGET_URL).toBe('https://izmirharitalari.atacanymc.com.tr/');
    });
  });

  describe('isMigrationHostname', () => {
    it('identifies sunset domain and its www subdomain', () => {
      expect(isMigrationHostname('izmirnobetcieczaneharitasi.live')).toBe(true);
      expect(isMigrationHostname('www.izmirnobetcieczaneharitasi.live')).toBe(true);
      expect(isMigrationHostname('  IZMIRNOBETCIECZANEHARITASI.LIVE  ')).toBe(true);
      expect(isMigrationHostname('WWW.IZMIRNOBETCIECZANEHARITASI.LIVE')).toBe(true);
    });

    it('returns false for unrelated hostnames', () => {
      expect(isMigrationHostname('localhost')).toBe(false);
      expect(isMigrationHostname('127.0.0.1')).toBe(false);
      expect(isMigrationHostname('izmirharitalari.atacanymc.com.tr')).toBe(false);
      expect(isMigrationHostname('atacanymc.com.tr')).toBe(false);
    });
  });

  describe('isMigrationPreview', () => {
    it('activates when preview-migration query parameter is 1 or true', () => {
      expect(isMigrationPreview('?preview-migration=1')).toBe(true);
      expect(isMigrationPreview('?preview-migration=true')).toBe(true);
      expect(isMigrationPreview('?foo=bar&preview-migration=1')).toBe(true);
    });

    it('returns false when preview query parameter is absent or not 1/true', () => {
      expect(isMigrationPreview('')).toBe(false);
      expect(isMigrationPreview('?preview-migration=0')).toBe(false);
      expect(isMigrationPreview('?preview-migration=false')).toBe(false);
      expect(isMigrationPreview('?other=1')).toBe(false);
    });
  });

  describe('shouldShowMigration', () => {
    it('returns true on sunset host without preview parameter', () => {
      expect(shouldShowMigration('izmirnobetcieczaneharitasi.live', '')).toBe(true);
    });

    it('returns true on localhost when preview parameter is enabled', () => {
      expect(shouldShowMigration('localhost', '?preview-migration=1')).toBe(true);
    });

    it('returns false on localhost without preview parameter', () => {
      expect(shouldShowMigration('localhost', '')).toBe(false);
    });
  });

  describe('sessionStorage dismissal helpers', () => {
    it('tracks modal dismissal state via sessionStorage', () => {
      expect(isMigrationModalDismissed()).toBe(false);
      dismissMigrationModal();
      expect(isMigrationModalDismissed()).toBe(true);
      expect(window.sessionStorage.getItem(MIGRATION_MODAL_STORAGE_KEY)).toBe('true');
    });

    it('tracks banner dismissal state via sessionStorage', () => {
      expect(isMigrationBannerDismissed()).toBe(false);
      dismissMigrationBanner();
      expect(isMigrationBannerDismissed()).toBe(true);
      expect(window.sessionStorage.getItem(MIGRATION_BANNER_STORAGE_KEY)).toBe('true');
    });
  });
});
