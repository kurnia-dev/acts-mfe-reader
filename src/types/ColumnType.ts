interface ColumnType {
  readonly photo: true;
  readonly device_name: true;
  SKU: true;
  category: true;
  brand: true;
  model: true;
  last_transaction: true;
  transaction_qty: true;
  client: true;
  manager: true;
  transaction_date: true;
  current_stock?: true;
}

export default ColumnType;
