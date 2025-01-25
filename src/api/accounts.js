import { mutationGetRequest, mutationPostRequest, mutationDeleteRequest, mutationPutRequest } from "@/api/mutations";
import AccountModel from "@/models/AccountModel";
import AccountCreateModel from "@/models/AccountCreateModel";
import AccountDeleteModel from "@/models/AccountDeleteModel";
import AccountEditModel from "@/models/AccountEditModel";

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
 * @param {AccountCreateModel} formData
 * @param {Boolean|Object} headers
 * @returns {Object}
 */
export const createAccount = async (formData, headers = false) => {
  return await mutationPostRequest('/accounts/create/', formData, headers);
}

/**
 * Удалить аккаунт по id
 * @param {Number} id
 * @param {Boolean|Object} headers
 * @returns {Object}
 */
export const deleteAccount  = async (id, headers = false) => {
  return await mutationDeleteRequest(`/accounts/delete/${id}`, headers);
}

/**
 * Удалить несколько выбранных аккаунтов
 * @param {AccountDeleteModel} formData
 * @param {Boolean|Object} headers
 * @returns {Object}
 */
export const deleteAccounts = async (formData, headers = false) => {
  return await mutationPostRequest(`/accounts/delete/`, formData, headers);
}

/**
 * Получить аккаунт по id
 * @param {Number} id
 * @param {Boolean|Object} headers
 * @returns {AccountEditModel}
 */
export const getAccountById = async (id, headers = false) => {
  return await mutationGetRequest(`/accounts/${id}`, headers);
}

/**
 * Изменить аккаунт
 * @param {AccountEditModel} formData
 * @param {Boolean|Object} headers
 * @returns {Object}
 */
export const editAccount = async (formData, headers = false) => {
  return await mutationPutRequest(`/accounts/edit/`, formData, headers);
}
