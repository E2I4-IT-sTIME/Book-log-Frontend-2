import { NextPage } from "next";
import BookReviewForm from "../../../components/portfolio/BookReviewForm";
import PageTitle from "../../../components/portfolio/PageTitle";

const review: NextPage = () => {
  const title = "서평 작성하기";
  const sub = "내가 읽은 책의 서평을 작성해보세요.\n작성한 서평을 엮어 포트폴리오로 제작할 수 있습니다!";
  return (
    <>
      <div className="container">
        <PageTitle title={title} sub={sub} />
      <BookReviewForm />
      </div>
      <style jsx>{`
        .container {
          padding-left: 30%;
          padding-right: 5%;
          padding-top: 10%;
          padding-bottom: 20%;
          background: linear-gradient(#FAF5E4 35%, #fff 10%);
        }
        
        `}</style>
    </>
  );
}

export default review;