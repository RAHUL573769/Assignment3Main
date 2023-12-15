import { Schema, model } from 'mongoose';
import ICategory from './category.interface';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, unique: true, required: [true, 'Name is required'] },
  },
  { versionKey: false },
);

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
