import FilterModel from "@/models/FilterModel";

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
  page: 1,
  pageCount: 10,
  sort: 'sort',
  order: 'ASC'
});
