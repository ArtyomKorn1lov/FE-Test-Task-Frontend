import axios from "axios";
import { apiUrl } from "@/api/options";

/**
 * Функция GET-запроса axios
 * @param {string} url
 * @param {boolean|object} headers
 */
export const mutationGetRequest = async (url, headers = false) => {
  return await axios.get(apiUrl + url, !!headers ? { headers: headers } : {});
}

/**
 * Функция POST-запроса axios
 * @param {string} url
 * @param {boolean|object} formData
 * @param {boolean|object} headers
 */
export const mutationPostRequest = async (url, formData = false, headers = false) => {
  return await axios.post(apiUrl + url, !!formData ? formData : {}, !!headers ? { headers: headers } : {});
}

/**
 * Функция PUT-запроса axios
 * @param {string} url
 * @param {boolean|object} formData
 * @param {boolean|object} headers
 */
export const mutationPutRequest = async (url, formData = false, headers = false) => {
  return await axios.put(apiUrl + url, !!formData ? formData : {}, !!headers ? { headers: headers } : {});
}

/**
 * Функция DELETE-запроса axios
 * @param {string} url
 * @param {boolean|object} formData
 * @param {boolean|object} headers
 */
export const mutationDeleteRequest = async (url, formData = false, headers = false) => {
  return await axios.delete(apiUrl + url, !!formData ? formData : {}, !!headers ? { headers: headers } : {});
}
