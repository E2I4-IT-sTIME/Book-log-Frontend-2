import { NextPage } from "next";
import PageTitle from "../../../components/portfolio/PageTitle";
import PortfolioForm from "../../../components/portfolio/PortfolioForm";
import PortfolioNav from "../../../components/portfolio/PortfolioNav";

const newPort: NextPage = () => {
  const title = "포트폴리오 제작하기";
  const sub = "내가 작성한 서평을 엮어\n나만의 멋진 포트폴리오를 제작해보세요!";
  return (
    <>
      <div className="container">
        <PortfolioNav />
        <PageTitle title={title} sub={sub} />
        <PortfolioForm />
      </div>
      <style jsx>{`
        .container {
          padding-left: 30%;
          padding-right: 5%;
          padding-top: 10%;
          padding-bottom: 20%;
          background: linear-gradient(#faf5e4 35%, #fff 10%);
        }
      `}</style>
    </>
  );
};

export default newPort;
