import ICategory from './category.interface';
import Category from './category.model';

const createCategoryIntoDB = async (categoryData: ICategory) => {
  const result = await Category.create(categoryData);
  return result;
};

const retrieveAllCategoryFromDB = async () => {
  const result = await Category.find({});
  return result;
};

const categoryService = {
  createCategoryIntoDB,
  retrieveAllCategoryFromDB,
};

export default categoryService;
