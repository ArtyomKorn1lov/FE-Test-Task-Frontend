import FilterModel from "@/models/FilterModel";
import PaginationModel from "@/models/PaginationModel";

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
 * @type {Array}
 */
export const FilterPaginationFieldsCodes = [
  "page"
];
