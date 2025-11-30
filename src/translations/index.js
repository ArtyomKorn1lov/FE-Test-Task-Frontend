import {createI18n} from 'vue-i18n';

import * as core from '@/translations/core';
import * as header from '@/translations/header';
import * as accountSection from '@/translations/account-section';
import * as controls from '@/translations/controls';
import * as modal from '@/translations/modal';
import * as accountForm from '@/translations/account-form';
import * as form from '@/translations/form';

const namespaces = {
  header,
  accountSection,
  controls,
  modal,
  accountForm,
  form,
  core
}

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
const Lang = process.env.APP_LANG ?? "en";

export default createI18n({
  locale: Lang,
  fallbackLocale: Lang,
  globalInjection: true,
  messages: localisations
});
