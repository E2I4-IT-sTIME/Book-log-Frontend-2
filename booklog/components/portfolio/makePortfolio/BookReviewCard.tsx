import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recoilLoginedState } from '../../../states/recoilLogiendState';
import { deleteReveiwData } from '../../api';
import DeleteButton from '../common/DeleteButton';
import { bookImgSearch } from '../common/fetchBook';

const BookReviewCard = (props: any) => {
  const [isLogined, setisLogined] = useRecoilState(recoilLoginedState);
  const { review_id, title, content, createDate, isbn, selected } =
    props.review;
  const date = createDate.substr(0, 10);
  const router = useRouter();

  const subConent = () => {
    if (content.length > 90) {
      return content.substr(0, 90) + '...';
    } else return content;
  };

  const [bookImgSrc, setBookImgSrc] = useState('');
  const [isSelected, setIsSelected] = useState(selected);

  const srcHandler = async () => {
    setBookImgSrc(await bookImgSearch(isbn));
    console.log(bookImgSrc);
  };

  const className = (isSelected: boolean) => {
    return isSelected && 'active';
  };

  const deleteReview = useCallback(
    async (reveiw_id: number) => {
      const yes = confirm('서평을 삭제하시겠습니까?');
      if (yes) {
        const res = await deleteReveiwData(reveiw_id);
        if (res) {
          alert('서평이 삭제되었습니다!');
          router.reload();
        } else {
          alert('잠시후 다시 시도해 주세요');
        }
      }
    },
    [router]
  );

  useEffect(() => {
    srcHandler();
  }, []);

  return (
    <>
      <div
        className={`card-container ${className(isSelected)}`}
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      >
        <img className="thumnail" src={bookImgSrc || '/tmp.jpg'} alt={title} />
        <div className="list">
          <div className="title">{title}</div>
          <div className="date">{date}</div>
          <div className="content">{subConent()}</div>
        </div>
        {isLogined ? (
          <DeleteButton id={review_id} text="x" onClick={deleteReview} />
        ) : (
          ''
        )}
      </div>
      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-radius: 20px;
          padding: 20px;
          width: 100%;
          background-color: #d9d9d9;
          height: 100%;
          gap: 20px;
          cursor: pointer;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          transition: all 0.1s ease-in-out;
        }
        .card-container:hover {
          transform: scale(1.02);
          box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
        }
        .active {
          background-color: #125b50;
        }
        .list {
          display: flex;
          flex-direction: column;
          padding: 5px;
          gap: 5px;
          flex-grow: 1;
        }
        .title {
          font-size: 20px;
          font-weight: 700;
        }
        .date {
          font-size: 12px;
        }
        .content {
          font-size: 14px;
          overflow: hidden;
        }
        .thumnail {
          width: 35%;
          height: 100%;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
};

export default BookReviewCard;
