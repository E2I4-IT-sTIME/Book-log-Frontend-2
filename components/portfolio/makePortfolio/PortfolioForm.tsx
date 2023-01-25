import { useEffect, useRef, useState, useCallback } from "react";
import BookReviewsModal from "./BookReviewsModal";
import Button from "../common/Button";
import ReviewCard from "../portfolioPage/ReviewCard";
import { fetchReviewList, postPortfolioData } from "../../api";
import Image from "next/image";
import { useRouter } from "next/router";

const PortfolioForm = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [checkReviews, setCheckReviews] = useState([]);
  const router = useRouter();

  const getReviews = async () => {
    const fetchData = (await fetchReviewList()) || [];
    setCheckReviews(
      fetchData.map((ele: any) => {
        return { ...ele, selected: false };
      })
    );
  };

  useEffect(() => {
    getReviews();
  }, []);

  const reviewArrHandler = (reviewArr: any) => {
    setCheckReviews(reviewArr);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageFile] = useState("");

  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState("");
  const [imgFile, setImgFile] = useState<File>();

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onImageHandler = (e: any) => {
    const {
      target: { files, value },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    setProfile(value);
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
      setImgFile(theFile);
    };
    reader.readAsDataURL(theFile);
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChangeHandler = (e: any) => {
    setTitle(e.target.value);
  };
  const contentChangeHandler = (e: any) => {
    setContent(e.target.value);
  };

  const postPortfolio = async () => {
    const reviewsIdArr = checkReviews
      .filter((e: any) => e.selected)
      .map((e: any) => e.review_id);

    const formData = new FormData();
    console.log(imgFile);

    if (imgFile && reviewsIdArr) {
      formData.append("image", imgFile);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("reviews_id", reviewsIdArr.toString());
    }

    const res = await postPortfolioData(formData);
    if (res) {
      alert("포트폴리오가 생성되었습니다!");
      router.push("/portfolio");
    } else {
      alert("잠시후 다시 시도해 주세요");
    }
  };

  return (
    <>
      <form className="container">
        <div className="portfolio">
          <label className="title">포트폴리오 커버 이미지</label>
          <label className="sub">
            내 포트폴리오를 대표할 수 있는 커버 이미지를 추가해보세요. <br />
            이미지비율은 1440x440을 권장합니다.
          </label>
          <div className="cover-img-box" onClick={onUploadImageButtonClick}>
            <div className="img-text">커버 이미지 추가하기</div>
            {attachment && (
              <Image src={attachment} alt="" layout="fill" objectFit="cover" />
            )}
          </div>
          <input
            name="file"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onImageHandler}
            value={profile}
            style={{ display: "none" }}
          />
        </div>
        <div className="portfolio">
          <label className="title">포트폴리오 제목</label>
          <label className="sub">
            해당 포트폴리오가 갖고 있는 대표 키워드를 바탕으로,
            <br />
            멋진 캐치프레이즈를 작성해보세요. 포트폴리오를 공유했을 때 훨씬
            멋져보일거예요!
          </label>
          <input
            type="text"
            className="title-input"
            placeholder="포트폴리오 제목을 입력해주세요"
            onChange={titleChangeHandler}
          />
        </div>
        <div className="portfolio">
          <label className="title">포트폴리오 설명</label>
          <label className="sub">
            포트폴리오를 설명하는 문장을 작성해주세요.
          </label>
          <textarea
            className="content-input"
            placeholder="포트폴리오 설명을 입력해주세요"
            onChange={contentChangeHandler}
          ></textarea>
        </div>
        <div className="portfolio">
          <label className="title">서평 추가</label>
          <label className="sub">
            포트폴리오를 구성할 서평을 선택해주세요!
          </label>
          <div className="review-list">
            {checkReviews
              .filter((review: any) => review.selected)
              .map((review: any) => (
                <div className="card-box" key={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            <div
              className="cover-img-box add-review"
              onClick={() => {
                setIsSearch(true);
              }}
            >
              서평 추가하기
            </div>
          </div>
        </div>
        <div className="btn-div">
          <Button
            color="#125B50"
            text="제작하기"
            onClick={() => {
              postPortfolio();
            }}
          />
        </div>
      </form>
      <BookReviewsModal
        open={isSearch}
        close={() => {
          setIsSearch(false);
        }}
        checkReviews={checkReviews}
        reviewArrHandler={reviewArrHandler}
        header="서평모달"
      />
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            background: white;
            width: 100%;
            padding: 50px;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
            gap: 50px;
            font-family: "Pretendard-Regular";
          }
          .portfolio {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .title {
            color: #303030;
            font-size: 25px;
            font-weight: 900;
          }
          .title-input {
            height: 50px;
            border: 1px solid #000000;
            padding-left: 10px;
            border-radius: 5px;
            font-size: 16px;
          }
          .card-box {
            width: 48%;
            height: 260px;
          }
          .sub {
          }
          .content-input {
            height: 250px;
            border: 1px solid #000000;
            padding: 10px;
            border-radius: 5px;
            font-size: 16px;
            font-family: Pretendard;
          }
          .btn-div {
            display: flex;
            justify-content: flex-end;
          }
          .cover-img-box {
            display: flex;
            flex-grow: 1;
            width: 100%;
            height: 300px;
            border-radius: 10px;
            text-align: center;
            background-color: #cacaca;
            justify-content: center;
            align-items: center;
            font-weight: 900;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            position: relative;
            transition: background 0.2s ease-in-out;
          }
          .cover-img-box:hover {
            background-color: #d6d6d6;
          }
          .cover-img {
            object-fit: contain;
            width: 100%;
          }
          .add-review {
            width: 48%;
            height: 260px;
          }
          .review-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            row-gap: 2rem;
            column-gap: 2rem;
            padding-right: 10px;
          }
        `}
      </style>
    </>
  );
};

export default PortfolioForm;
