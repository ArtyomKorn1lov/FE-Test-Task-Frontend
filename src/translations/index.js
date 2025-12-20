import { createI18n } from 'vue-i18n';

import * as core from '@/translations/core';
import * as ui from '@/translations/ui';
import * as form from '@/translations/form';
import * as accounts from '@/translations/accounts';

const namespaces = {
  form,
  ui,
  core,
  accounts,
};

const localisations = {};

for (const keyNs in namespaces) {
  for (const keyLang in namespaces[keyNs]) {
    if (!localisations[keyLang]) {
      localisations[keyLang] = {};
    }
    localisations[keyLang][keyNs] = namespaces[keyNs][keyLang];
  }
}

/**
 * @description Инициализация языка в приложении
 * @type {String}
 */
const Lang = process.env.APP_LANG ?? 'en';

/**
 * @description Языковые фразы внутри приложения
 */
export default createI18n({
  locale: Lang,
  fallbackLocale: Lang,
  globalInjection: true,
  messages: localisations,
});
