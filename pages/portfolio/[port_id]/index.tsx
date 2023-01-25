import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  deletePortfolio,
  fetchPortfolio,
  fetchReviewList,
  patchPortfolioData,
} from "../../../components/api";
import { brText } from "../../../components/portfolio/common/brText";
import ThumnailCard from "../../../components/portfolio/common/ThumnailCard";
import BookReviewsModal from "../../../components/portfolio/makePortfolio/BookReviewsModal";
import PortfolioButton from "../../../components/portfolio/portfolioPage/PortfolioButton";
import ReviewList from "../../../components/portfolio/portfolioPage/ReviewList";
import UserInfo from "../../../components/portfolio/portfolioPage/UserInfo";
import { IReview, IUserInfo } from "../../../res/interface/PortfolioInterfaces";
import {
  ClubLayoutState,
  CurrentLayout,
} from "../../../states/recoilLayoutState";
import { recoilLoginedState } from "../../../states/recoilLogiendState";
import { recoilUserObjState } from "../../../states/recoilUserObjState";
import Seo from "../../../components/Seo";

export const getServerSideProps = async (context: any) => ({
  props: { host: context.req.headers.host },
});

const Portfolio: NextPage = ({ host }: any) => {
  const router = useRouter();
  const portId = router.query.port_id;

  const [isSearch, setIsSearch] = useState(false);
  const [isLogined, setisLogined] = useRecoilState(recoilLoginedState);
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [portfolio, setPortfolio] = useState({
    title: "",
    image: "",
    content: "",
    reviewResList: [],
  });

  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    if (typeof portId === "string") {
      const reviewArr = await fetchReviewList();
      const initReviewArr: any = await initUserReviews(reviewArr);
      const portfolio = await fetchPortfolio(portId);

      console.log(portfolio);

      const selectedReveiws = setSelectedReviews(
        initReviewArr,
        portfolio.reviewResList
      );

      setPortfolio(portfolio);
      setReviews(selectedReveiws);
    }
  };
  const initUserReviews = useCallback(async (reviewArr: any) => {
    const newReviewArr = reviewArr.map((review: any) => {
      return { ...review, selected: false };
    });
    return newReviewArr;
  }, []);

  const delPortfolio = useCallback(async () => {
    if (typeof portId === "string") {
      const req = await deletePortfolio(portId);
      if (req) {
        alert("포트폴리오가 삭제되었습니다!");
        router.push("/portfolio");
      } else {
        alert("잠시후 다시 시도해주세요");
      }
    }
  }, []);
  const copyUrl = useCallback(async () => {
    const { asPath } = router;
    try {
      await navigator.clipboard.writeText(`http://${host}${asPath}`);
      alert("현재 페이지 주소가 복사되었습니다!");
    } catch (error) {
      console.error(error);
    }
  }, []);

  const setSelectedReviews = useCallback(
    (initReviewArr: any, reviewArr: any) => {
      const reviews = initReviewArr;
      reviewArr.forEach((selectedReview: IReview) => {
        for (let i = 0; i < reviews.length; i++) {
          const review: IReview = reviews[i];
          if (selectedReview.review_id === review.review_id) {
            reviews[i] = { ...reviews[i], selected: true };
            break;
          }
        }
      });
      return reviews;
    },
    []
  );

  const reviewArrHandler = useCallback((reviewArr: []) => {
    setReviews(reviewArr);
  }, []);

  // const dataURLtoFile = async (url, fileName) => {
  //   const res = await fetch(url).then(async (response) => {
  //     const contentType = response.headers.get('content-type');
  //     console.log(contentType);
  //     const blob = await response.blob();
  //     const file = new File([blob], fileName, { type: contentType });
  //     return file;
  //   });
  //   return res;
  // };

  const savePortfolio = async () => {
    if (typeof portId === "string") {
      const reviewsIdArr: any = reviews
        .filter((e: any) => e.selected)
        .map((e: any) => e.review_id);

      const formData = new FormData();
      const { image, title, content } = portfolio;
      //const imageFile = dataURLtoFile(image, 'icebear.jpg');
      //formData.append('image', imageFile);
      //formData.append('title', title);
      //formData.append('content', content);
      formData.append("reviews_id", reviewsIdArr);

      const res = await patchPortfolioData(formData, portId);
      if (res) {
        alert("포트폴리오가 저장되었습니다!");
        router.reload();
      } else {
        alert("잠시후 다시 시도해 주세요");
      }
    }
  };

  const onChangeSelectedState = useCallback((id: number) => {
    const newReviews: any = reviews.map((review: IReview) => {
      if (review.review_id === id) {
        return { ...review, selected: !review.selected };
      } else return { ...review };
    });
    setReviews(newReviews);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
    setLayoutState(CurrentLayout.WhiteHeader);
  }, [router.isReady, setLayoutState, portId]);

  return (
    <>
      <Seo
        title="Portfolio"
        content="Booklog - 포트폴리오를 채워줄 나의 서평들!"
      />
      <div className="portfolio-container">
        <header>
          <Link href="/">BOOKLOG.</Link>
        </header>
        <main className="main">
          <div className="text-box">
            <div className="title">{brText(portfolio.title)}</div>
            <UserInfo />
            <div className="sub">{brText(portfolio.content)}</div>
          </div>
          <div className="side-box">
            {isLogined ? (
              <div className="buttons">
                <PortfolioButton
                  text="삭제"
                  color="#ff6363"
                  onClick={delPortfolio}
                />
                <PortfolioButton
                  text="저장"
                  color="#6380ff"
                  onClick={savePortfolio}
                />
                <PortfolioButton
                  text="공유"
                  color="#125b50"
                  onClick={copyUrl}
                />
              </div>
            ) : (
              ""
            )}
            <div className="bookimges">
              {portfolio.reviewResList.map(({ id, isbn }) => (
                <ThumnailCard key={id} isbn={isbn} />
              ))}
            </div>
          </div>
        </main>
        <div className="content">
          <ReviewList
            reviews={reviews}
            onChangeSelectedState={onChangeSelectedState}
          />
          {isLogined ? (
            <div
              className="add-reveiw"
              onClick={() => {
                setIsSearch(true);
              }}
            >
              서평 추가하기
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <BookReviewsModal
        open={isSearch}
        close={() => {
          setIsSearch(false);
        }}
        checkReviews={reviews}
        reviewArrHandler={reviewArrHandler}
        header="서평모달"
      />
      <style jsx>{`
        .portfolio-container {
          display: flex;
          flex-direction: column;
          padding: 40px 5% 20% 5%;
          gap: 50px;
          background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 10%,
              rgba(0, 0, 0, 0.5) 25%,
              rgba(0, 0, 0, 0.7) 40%,
              rgba(0, 0, 0, 1) 50%,
              rgba(0, 0, 0, 1) 75%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${portfolio.image || "/portBackground.png"}) no-repeat;
          background-size: 100% auto;
        }
        header {
          color: #fff;
          font-size: 48px;
          font-weight: 900;
          text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          margin-left: 5px;
        }
        .main {
          display: flex;
          justify-content: space-between;
          font-family: "Pretendard-Regular";
        }
        .text-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: white;
        }

        .side-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .title {
          font-size: 25px;
          font-weight: 700;
        }
        .sub {
          font-size: 14px;
        }

        img {
          width: 50px;
        }
        .content {
          min-height: 600px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 3rem;
          column-gap: 3rem;
          padding-right: 10px;
        }
        .add-reveiw {
          height: 300px;
          width: 14%;
          background-color: #474747;
          color: white;
          border-radius: 20px;
          text-align: center;
          line-height: 300px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.2s;
        }
        .add-reveiw:hover {
          background-color: #616161;
        }
        .bookimges {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
};

export default Portfolio;
