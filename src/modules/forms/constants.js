import { EnvService } from '@/core';

/**
 * @type {RegExp}
 * @description TODO проверить регулярку
 */
export const EmailRegex =
  /^(([^%№/!<>()[\]\\.,;:\s@"]+(\.[^%№/!<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const maxUploadSize = EnvService.get('MAX_UPLOAD_SIZE');
/**
 * @type {Number}
 */
export const MaxFileSize = maxUploadSize ? Number(maxUploadSize) : 2;
