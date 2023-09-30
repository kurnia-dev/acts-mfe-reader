type LastTransaction = 'In' | 'Out' | 'Retur';

/**
 * Defining type for Filter Input Fields
 */
export interface Filter {
  name?: string[];
  brand?: string[];
  model?: string[];
  stock?: number;
  lastTransaction?: LastTransaction[];
  transactionQty?: number;
  company?: string[];
  manager?: string[];
  transactionDate?: string[];
}

/**
 * Defining type for filter params for fetching datas
 */

export interface FilterParams {
  name?: string;
  brand?: string;
  model?: string;
  stock?: number;
  lastTransaction?: string;
  transactionQty?: number;
  company?: string;
  manager?: string;
  transactionDate?: string;
}
