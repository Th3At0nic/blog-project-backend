import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true }, // Title is required
    content: { type: String, required: true }, // Content is required
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model (author), required
    isPublished: { type: Boolean, default: true }, // Default is true, indicating that the blog is published
  },
  {
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
  },
);

// Create and export the Blog model
export const BlogModel = model<TBlog>('Blog', BlogSchema);
