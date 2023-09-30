import { FilterParams } from './filter.type';
/**
 * Type of params included in fetch API
 *
 * @extends FilterParams - Include all of the filter parameter
 */
interface FetchParams extends FilterParams {
  search?: string;
  page?: number;
  limit?: number;
  sortOrder?: number;
  sortField?: string;
}

export default FetchParams;
