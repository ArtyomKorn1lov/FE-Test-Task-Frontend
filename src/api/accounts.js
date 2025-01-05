import { mutationGetRequest, mutationPostRequest } from "@/api/mutations";
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
 * @returns {Array<Object>}
 */
export const getFilter = async (headers = false) => {
  return await mutationGetRequest('/accounts/filter-values/', headers);
}

/**
 * Получить параметры пагинации по умолчанию
 * @param {boolean|object} headers
 * @returns {Array<Object>}
 */
export const getPagination = async (headers = false) => {
  return await mutationGetRequest('/accounts/page-nav/', headers);
}

/**
 * Получить список всех ролей пользователей
 * @param {boolean|object} headers
 * @returns {Array<Object>}
 */
export const getRoles = async (headers = false) => {
  return await mutationGetRequest('/accounts/roles/', headers);
}

/**
 * Получить список результатов поиска для поисковой строки
 * @param {boolean|object} headers
 * @returns {Array<Object>}
 */
export const getContextSearch = async (queryParams = "", headers = false) => {
  return await mutationGetRequest(`/accounts/search/${queryParams}`, headers);
}

/**
 * Создать аккаунт
 * @param {any} formData
 * @param {boolean|object} headers
 * @returns {Object}
 */
export const createAccount = async (formData, headers = false) => {
  return await mutationPostRequest('/accounts/create/', formData, headers);
}
