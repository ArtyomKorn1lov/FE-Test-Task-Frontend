import { mutationGetRequest } from "@/api/mutations";
import AccountModel from "@/models/AccountModel";

/**
 * Получить список аккаунтов
 * @param {string} queryParams
 * @param {boolean|object} headers
 * @returns {AccountModel|null}
 */
export const getAccounts = async (queryParams = "", headers = false) => {
  return await mutationGetRequest(`/accounts/list/${queryParams}`, headers);
}
