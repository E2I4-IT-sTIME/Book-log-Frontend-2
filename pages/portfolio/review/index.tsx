import { NextPage } from "next";
import BookReviewForm from "../../../components/portfolio/makeReview/BookReviewForm";
import BookSearch from "../../../components/portfolio/makeReview/BookSearch";
import PageTitle from "../../../components/portfolio/common/PageTitle";
import PortfolioNav from "../../../components/portfolio/common/PortfolioNav";

const review: NextPage = () => {
  const title = "서평 작성하기";
  const sub =
    "내가 읽은 책의 서평을 작성해보세요.\n작성한 서평을 엮어 포트폴리오로 제작할 수 있습니다!";
  return (
    <>
      <div className="container">
        <PortfolioNav />
        <PageTitle title={title} sub={sub} />
        <BookReviewForm />
      </div>
      <style jsx>{`
        .container {
          padding-left: 30%;
          padding-right: 5%;
          padding-top: 10%;
          padding-bottom: 20%;
          background: linear-gradient(#faf5e4 35%, #fff 10%);
          font-family: "Pretendard-Regular";
        }
      `}</style>
    </>
  );
};

export default review;
