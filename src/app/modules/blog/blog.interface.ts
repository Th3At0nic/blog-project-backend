import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId; // Reference to the User model (using ObjectId type)
  isPublished: boolean;
};
