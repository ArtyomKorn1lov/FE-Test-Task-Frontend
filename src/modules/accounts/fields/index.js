import Translations from '@/translations';
import { FormFields } from '@/modules/forms';
import * as AccountForm from '@/modules/accounts/fields/account-form';

/**
 * @type {FormFields}
 */
const AccountFormFields = AccountForm[Translations.global.locale];

export { AccountFormFields };
