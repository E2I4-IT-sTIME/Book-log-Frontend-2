import { useCallback, useRef, useState } from "react";
import BookReviewsModal from "./BookReviewsModal";
import BookSearch from "./BookSearch";
import Button from "./Button";

const PortfolioForm = () => {
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageFile] = useState("");

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const url = URL.createObjectURL(e.target.files[0]);
      setImageFile(url);
    },
    []
  );
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <>
      <form className="container">
        <div className="portfolio">
          <label className="title">포트폴리오 커버 이미지</label>
          <label className="sub">
            내 포트폴리오를 대표할 수 있는 커버 이미지를 추가해보세요. <br />
            이미지비율은 1440x440을 권장합니다.
          </label>
          <input
            type="file"
            accept="'image/*"
            ref={inputRef}
            onChange={onUploadImage}
            style={{ display: "none" }}
          />
          <div className="cover-img-box" onClick={onUploadImageButtonClick}>
            {imageUrl ? (
              <img className="cover-img" src={imageUrl} />
            ) : (
              "커버 이미지 추가하기"
            )}
          </div>
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
          ></textarea>
        </div>
        <div className="portfolio">
          <label className="title">서평 추가</label>
          <label className="sub">
            포트폴리오를 구성할 서평을 선택해주세요!
          </label>
          <div
            className="cover-img-box review-list"
            onClick={() => {
              setIsSearch(true);
            }}
          >
            서평 추가하기
          </div>
        </div>
        <div className="btn-div">
          <Button color="#125B50" text="제작하기" onClick={() => {}} />
        </div>
      </form>
      <BookReviewsModal
        open={isSearch}
        close={() => {
          setIsSearch(false);
        }}
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
          }
          .cover-img {
            object-fit: cover;
            width: 100%;
          }
          .review-list {
            width: 50%;
          }
        `}
      </style>
    </>
  );
};

export default PortfolioForm;
