/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose';
import throwAppError from '../utils/throwAppError';
import { StatusCodes } from 'http-status-codes';

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

  //this filter will work dynamically. i can expand it if needed. it will now work for author field,
  //from client it will come as api/blogs?filter=value
  filter() {
    const queryObject: any = {};
    const filterValue = this.query.filter;

    if (filterValue) {
      // Check if the filterValue matches an ObjectId (assumes author field is an ObjectId)
      if (/^[0-9a-fA-F]{24}$/.test(filterValue as string)) {
        // Assign filterValue to the `author` field in the queryObject
        queryObject.author = filterValue;
      } else {
        throwAppError(
          'query.filter',
          'Invalid filter value. The filter value must be a valid ObjectId for the author.',
          StatusCodes.BAD_REQUEST,
        );
      }
    }

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
