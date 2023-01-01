import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import noSign from '../../../res/noSign.svg';
import { recoilUserObjState } from '../../../states/recoilUserObjState';
import { brText } from '../common/brText';
import ThumnailCard from '../common/ThumnailCard';

const PortfolioCard = (props: any) => {
  const { title, content, backgroundImg, isbnArr, id } = props;
  const [userObj, setUserObj] = useRecoilState(recoilUserObjState);

  return (
    <>
      <Link href={`/portfolio/${id}`}>
        <div className="portCard-container">
          <div className="text-box">
            <div className="title">{brText(title)}</div>
            <div className="sub">{brText(content)}</div>
          </div>
          <div className="img-box">
            <div className="profile-box">
              <Image
                src={userObj.image}
                width="40px"
                height="40px"
                alt="프로필이미지"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <div className="thumnail-box">
              {(isbnArr || []).map((isbn: string, idx: number) => (
                <ThumnailCard isbn={isbn} key={idx} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .portCard-container {
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          background: linear-gradient(
              to left,
              rgba(0, 0, 0, 0) 10%,
              rgba(122, 122, 122, 0.5234) 25%,
              rgba(59, 59, 59, 0.7677) 75%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${backgroundImg}) no-repeat center center;
          background-size: cover;
          display: flex;
          flex-direction: row;
          width: 48%;
          height: 260px;
          padding: 10px;
          border-radius: 20px;
          padding: 30px;
          cursor: pointer;
        }
        .text-box {
          width: 60%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
          gap: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: 700;
        }
        .sub {
          font-size: 16px;
        }
        .img-box {
          width: 40%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .profile-box {
          display: flex;
          justify-content: flex-end;
        }
        .thumnail-box {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
};

export default PortfolioCard;
