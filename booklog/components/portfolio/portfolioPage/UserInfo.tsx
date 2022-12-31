import Image from 'next/image';
import { IUserInfo } from './../../../res/interface/PortfolioInterfaces';

const UserInfo = (props: IUserInfo) => {
  const { image, username } = props;
  return (
    <>
      <div className="user">
        <Image
          className="userimg"
          src={image}
          width={30}
          height={30}
          alt="프로필이미지"
          style={{ borderRadius: '50%' }}
        />
        <div className="username">{username}</div>
      </div>
      <style jsx>{`
        .user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </>
  );
};

export default UserInfo;
