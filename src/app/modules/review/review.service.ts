import IReview from './review.interface';
import Review from './review.model';

const createReviewIntoDB = async (reviewData: IReview) => {
  const result = await Review.create(reviewData);
  return result;
};

const reviewService = {
  createReviewIntoDB,
};

export default reviewService;
