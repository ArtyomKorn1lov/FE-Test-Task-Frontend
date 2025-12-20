import { ArrayHelper } from '@/core';
import { OptionResponse, Filter, Pagination } from '@/modules/accounts/models';

/**
 * @param {OptionResponse[]} options
 * @return {Filter}
 */
export const mapFilterValuesResponseToModel = (options) => {
  return new Filter({ ...ArrayHelper.convertArrayToObject(options) });
};

export const mapPaginationValuesResponseToModel = (options) => {
  return new Pagination({ ...ArrayHelper.convertArrayToObject(options) });
};
