import { SortTypes, EnvService } from '@/core';
import { Filter, Pagination } from '@/modules/accounts/models';

/**
 * @type {String}
 */
export const NoImageUrl = '/src/assets/img/no-image.webp';

/**
 * @type {String}
 */
export const TagAccountListModifier = 'b-btn_tag-';

/**
 * @type {Filter}
 */
export const DefaultFilterValues = new Filter({
  sort: 'sort',
  order: SortTypes.asc,
});

/**
 * @type {Pagination}
 */
export const DefaultPaginationValues = new Pagination({
  page: 1,
  pageCount: 10,
});

/**
 * @type {String}
 */
export const AccountLoginFieldCode = 'login';

/**
 * @type {String}
 */
export const FieldContextSearchCode = 'value';

/**
 * @type {String}
 */
export const AccountSortPropCode = 'login';

/**
 * @type {String}
 */
export const PermissionNameSortPropCode = 'permission';

/**
 * @type {String}
 */
export const AccountRoleFieldCode = 'role';

/**
 * @type {String}
 */
export const UploadFileUrl = EnvService.get('REST_API_URL') + '/accounts/upload/';

/**
 * @type {String}
 */
export const AccountListWrapperClass = 'account-list-wrapper';
