/**
 * @type {String}
 */
export const Lang = process.env.APP_LANG ?? "en";

/**
 * @type {Number}
 */
export const MaxFileSize = !!process.env.MAX_UPLOAD_SIZE ? Number(process.env.MAX_UPLOAD_SIZE) : 2;

/**
 * @type {Number}
 */
export const FileDividerTypeCasting = 1024;
