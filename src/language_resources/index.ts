import { createI18n } from 'vue-i18n';
import Messages from "./messages";

const defaultLanguage = 'en';

const engine = createI18n({
    locale: defaultLanguage,
    fallbackLocale: defaultLanguage,
    globalInjection: true,
    messages: Messages
});

export function translate(key: string): string {
    if(!key.trim()) {
        return '';
    }
    return engine.global.t(key);
}

export default engine;
