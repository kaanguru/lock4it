import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import en from './locales/en.json';
import tr from './locales/tr.json';
addMessages('en', en);
addMessages('tr', tr);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
