import {createI18n} from 'vue-i18n';
import {Lang} from "@/core";

import * as header from '@/translations/header';
import * as accountSection from '@/translations/account-section';
import * as controls from '@/translations/controls';
import * as modal from '@/translations/modal';
import * as accountForm from '@/translations/account-form';
import * as form from '@/translations/form';
import * as messages from '@/translations/core/index.js'

const namespaces = {
  header,
  accountSection,
  controls,
  modal,
  accountForm,
  form,
  messages
}

const messages = {};

for (const keyNs in namespaces) {
  for (const keyLang in namespaces[keyNs]) {
    messages[keyLang][keyNs] = namespaces[keyNs][keyLang];
  }
}

export default createI18n({
  locale: Lang,
  fallbackLocale: Lang,
  messages: messages
});
