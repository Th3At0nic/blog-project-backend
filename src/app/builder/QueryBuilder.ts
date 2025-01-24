import { Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(query: Record<string, unknown>, modelQuery: Query<T[], T>) {
    this.query = query;
    this.modelQuery = modelQuery;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    const excludeFieldForFilter = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];
    excludeFieldForFilter.forEach((elem) => delete queryObject[elem]);

    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }

  sortBy() {
    const sortBy =
      (this.query.sortBy as string)?.split(',')?.join(' ') || 'createdAt';

    const sortOrder = this.query.sortOrder === 'asc' ? '' : '-'; // Default to descending

    const sortFields = [sortBy]
      .map((field) => `${sortOrder}${field}`) // Prepend sortOrder to each field
      .join(' ');

    this.modelQuery = this.modelQuery.sort(sortFields);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
