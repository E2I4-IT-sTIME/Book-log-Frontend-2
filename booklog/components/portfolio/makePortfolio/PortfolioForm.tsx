import { useEffect, useRef, useState, useCallback } from 'react';
import BookReviewsModal from './BookReviewsModal';
import Button from '../common/Button';
import ReviewCard from '../portfolioPage/ReviewCard';
import { fetchReviewList, postPortfolioData } from '../../api';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PortfolioForm = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [checkReviews, setCheckReviews] = useState([]);
  const router = useRouter();

  const getReviews = async () => {
    const fetchData = (await fetchReviewList()) || [];
    setCheckReviews(
      fetchData.map((ele) => {
        return { ...ele, selected: false };
      })
    );
  };

  useEffect(() => {
    getReviews();
  }, []);

  const reviewArrHandler = (reviewArr) => {
    setCheckReviews(reviewArr);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageFile] = useState('');

  const [profile, setProfile] = useState('');
  const [attachment, setAttachment] = useState('');
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

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleChangeHandler = (e: any) => {
    setTitle(e.target.value);
  };
  const contentChangeHandler = (e: any) => {
    setContent(e.target.value);
  };

  const postPortfolio = async () => {
    const reviewsIdArr = checkReviews
      .filter((e) => e.selected)
      .map((e) => e.review_id);

    const formData = new FormData();
    console.log(imgFile);

    formData.append('image', imgFile);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('reviews_id', reviewsIdArr);

    const res = await postPortfolioData(formData);
    if (res) {
      alert('?????????????????? ?????????????????????!');
      router.push('/portfolio');
    } else {
      alert('????????? ?????? ????????? ?????????');
    }
  };

  return (
    <>
      <form className="container">
        <div className="portfolio">
          <label className="title">??????????????? ?????? ?????????</label>
          <label className="sub">
            ??? ?????????????????? ????????? ??? ?????? ?????? ???????????? ??????????????????. <br />
            ?????????????????? 1440x440??? ???????????????.
          </label>
          <div className="cover-img-box" onClick={onUploadImageButtonClick}>
            <div className="img-text">?????? ????????? ????????????</div>
            {attachment && (
              <Image
                src={attachment}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <input
            name="file"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onImageHandler}
            value={profile}
            style={{ display: 'none' }}
          />
        </div>
        <div className="portfolio">
          <label className="title">??????????????? ??????</label>
          <label className="sub">
            ?????? ?????????????????? ?????? ?????? ?????? ???????????? ????????????,
            <br />
            ?????? ????????????????????? ??????????????????. ?????????????????? ???????????? ??? ??????
            ?????????????????????!
          </label>
          <input
            type="text"
            className="title-input"
            placeholder="??????????????? ????????? ??????????????????"
            onChange={titleChangeHandler}
          />
        </div>
        <div className="portfolio">
          <label className="title">??????????????? ??????</label>
          <label className="sub">
            ?????????????????? ???????????? ????????? ??????????????????.
          </label>
          <textarea
            className="content-input"
            placeholder="??????????????? ????????? ??????????????????"
            onChange={contentChangeHandler}
          ></textarea>
        </div>
        <div className="portfolio">
          <label className="title">?????? ??????</label>
          <label className="sub">
            ?????????????????? ????????? ????????? ??????????????????!
          </label>
          <div className="review-list">
            {checkReviews
              .filter((review) => review.selected)
              .map((review) => (
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
              ?????? ????????????
            </div>
          </div>
        </div>
        <div className="btn-div">
          <Button
            color="#125B50"
            text="????????????"
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
        header="????????????"
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
            font-family: 'Pretendard-Regular';
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
            object-fit: cover;
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
