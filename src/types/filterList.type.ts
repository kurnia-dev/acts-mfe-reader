/**
 * List of avaible filter field, used to defined what filter fields are used for certain usage
 */
type FilterList = [
  'name',
  'sku',
  'category',
  'brand',
  'model',
  'stock',
  'lastTransaction',
  'transactionQty',
  'company',
  'manager',
  'transactionDate'
];

/**
 * When need to use all the filter, import this variable
 */
export const AllFilter: FilterList = [
  'name',
  'sku',
  'category',
  'brand',
  'model',
  'stock',
  'lastTransaction',
  'transactionQty',
  'company',
  'manager',
  'transactionDate',
];

export default FilterList;
