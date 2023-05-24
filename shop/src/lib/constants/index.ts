import placeholder from '@/assets/images/placeholders/product.svg';

export const CART_KEY = 'pixer-cart';
export const PRODUCTS_PER_PAGE = 30;
export const RTL_LANGUAGES: ReadonlyArray<string> = ['ar', 'he'];

export function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}

export function formatNumber(n: number) {
  if (n < 1e3) return `${n}`;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';

  return `${n}`;
}

export function getProfileAvatarImage(profile: any | null) {
  if (profile) {
    if (profile.avatar) {
      if (profile.avatar.thumbnail) {
        return profile.avatar.thumbnail.replace('localhost', 'localhost:8000');
      } else {
        return placeholder;
      }
    } else {
      return placeholder;
    }
  } else {
    return placeholder;
  }
}

export function getProfileAvatar(profile: any | null) {
  if (profile) {
    if (profile.avatar) {
      if (profile.avatar.thumbnail) {
        return profile.avatar.thumbnail.replace('localhost', 'localhost:8000');
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}
