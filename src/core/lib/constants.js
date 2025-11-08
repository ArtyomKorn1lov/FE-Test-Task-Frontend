import FilterModel from "@/core/models/FilterModel.js";
import PaginationModel from "@/core/models/PaginationModel.js";

/**
 * @type {String}
 */
export const Lang = process.env.APP_LANG ?? "en";

/**
 * @type {Number}
 */
export const FirstElementIndex = 0;

/**
 * @type {String}
 */
export const NoImageUrl = "/src/assets/img/no-image.webp"

/**
 * @type {String}
 */
export const TagAccountListModifier = "b-btn_tag-"

/**
 * @type {String}
 */
export const ReloadPaginationEmit = "refresh";

/**
 * @type {String}
 */
export const PaginationSelector = ".observable";

/**
 * @type {FilterModel}
 */
export const DefaultFilterValues = new FilterModel({
  sort: 'sort',
  order: 'ASC'
});

/**
 * @type {PaginationModel}
 */
export const DefaultPaginationValues =  new PaginationModel({
  page: 1,
  pageCount: 10
});

/**
 * @type {Number}
 */
export const OneCountElement = 1;

/**
 * @type {String}
 */
export const AccountLoginFieldCode = "login";

/**
 * @type {String}
 */
export const FieldContextSearchCode = "value";

/**
 * @type {String}
 */
export const AccountSortPropCode = "login";

/**
 * @type {String}
 */
export const PermissionNameSortPropCode = "permission";

/**
 * @type {String}
 */
export const ASCorderCode = "ASC";

/**
 * @type {String}
 */
export const DESCorderCode = "DESC";

/**
 * @type {RegExp}
 */
export const EmailValidatorRegex = /^(([^%№/!<>()\[\]\\.,;:\s@"]+(\.[^%№/!<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @type {String}
 */
export const AccountRoleFieldCode = "role";

/**
 * @type {String}
 */
export const SuccessStatusCode = "success";

/**
 * @type {String}
 */
export const ErrorStatusCode = "error";

/**
 * @type {Number}
 */
export const MaxFileSize = !!process.env.MAX_UPLOAD_SIZE ? Number(process.env.MAX_UPLOAD_SIZE) : 2;

/**
 * @type {Number}
 */
export const FileDividerTypeCasting = 1024;

/**
 * @type {String}
 */
export const AccountFormComponentModalCode = "Account";
