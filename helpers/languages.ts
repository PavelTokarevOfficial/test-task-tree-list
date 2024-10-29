export const defaultLanguages = 'ru' as const;
export const lang = ['ru', 'en', 'fr'] as const;

export type Language = typeof lang[number];