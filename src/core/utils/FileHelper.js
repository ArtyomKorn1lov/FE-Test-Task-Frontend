import {ArgumentException} from "@/core/exceptions";

/**
 * @param {File} file
 * @return {Promise<String>}
 */
export const convertToBase64 = (file) => {
  if (!file) {
    throw new ArgumentException("File can not been empty");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * @param {File} file
 * @return {String}
 */
export const createFileUrl = (file) => {
  if (!file) {
    throw new ArgumentException("File can not been empty");
  }
  return URL.createObjectURL(file);
}

/**
 * @description проверка размера загруженного файла в байтах
 * @param {File} file
 * @param {Number} maxFileSize
 */
export const checkMaxFileSize = (file, maxFileSize) => {
  return file.size <= maxFileSize;
}
