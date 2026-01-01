/**
 * @type {RegExp}
 */
export const EmailRegex =
  /^(([^%№/!<>()[\]\\.,;:\s@"]+(\.[^%№/!<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @type {RegExp}
 */
export const PhoneRegex = /^(\+7\(\d{3}\)-\d{3}-\d{2}-\d{2})$/;

/**
 * @type {String}
 */
const maxUploadSize = process.env.MAX_UPLOAD_SIZE;
/**
 * @type {Number}
 */
export const MaxFileSize = maxUploadSize ? Number(maxUploadSize) : 2;
