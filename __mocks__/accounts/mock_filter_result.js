import { SortTypes } from '@/core';
import { Filter } from '@/modules/accounts/models';

export default new Filter({
  sort: 'sort',
  order: SortTypes.asc,
  search: undefined,
  roleCode: undefined,
});
