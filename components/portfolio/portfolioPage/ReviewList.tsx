import { IReview } from '../../../res/interface/PortfolioInterfaces';
import ReviewCard from './ReviewCard';

const ReviewList = (props: any) => {
  const { reviews, onChangeSelectedState } = props;

  return (
    <>
      {reviews
        .filter((review: IReview) => review.selected)
        .map((review: IReview) => (
          <div className="card-box" key={review.review_id}>
            <ReviewCard
              key={review.review_id}
              review={review}
              onClick={() => {
                onChangeSelectedState(review.review_id);
              }}
            />
          </div>
        ))}
      <style jsx>{`
        .card-box {
          width: 48%;
          height: 300px;
        }
      `}</style>
    </>
  );
};

export default ReviewList;
