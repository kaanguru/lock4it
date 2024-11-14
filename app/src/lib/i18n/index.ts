import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';
import tr from './locales/tr.json';
import zh from './locales/zh.json';
addMessages('en', en);
addMessages('ar', ar);
addMessages('ru', ru);
addMessages('tr', tr);
addMessages('zh', zh);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
