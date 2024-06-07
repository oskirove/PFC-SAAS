import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
    | 'en'
    | 'de'
    | 'fr'
    | 'es'
    | 'ja'
    | 'hi'
    | 'la'
    | 'ru'
    | 'zh'
    | 'ar';

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    ja: 'Japanese',
    hi: 'Hindi',
    la: 'Latin',
    ru: 'Russian',
    zh: 'Chinese',
    ar: 'Arabic',
};

const LENGUAGES_IN_FREE = 5;

interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
    language: 'es',
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
        if (isPro)
            return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

        return Object.keys(LanguagesSupportedMap).slice(
            0,
            LENGUAGES_IN_FREE
        ) as LanguagesSupported[];
    },
    getNotSupportedLanguages: (isPro: boolean) => {
        if (isPro)
            return [];

        return Object.keys(LanguagesSupportedMap).slice(
            LENGUAGES_IN_FREE
        ) as LanguagesSupported[];
    },

}));

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
