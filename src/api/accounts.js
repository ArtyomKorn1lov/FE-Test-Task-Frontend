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

/**
 * Получить список значений фильтра
 * @param {boolean|object} headers
 * @returns {any}
 */
export const getFilter = async (headers = false) => {
  return await mutationGetRequest('/accounts/filter-values/', headers);
}
