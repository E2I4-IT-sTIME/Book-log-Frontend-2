import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { recoilUserObjState } from '../../../states/recoilUserObjState';

const UserInfo = () => {
  const [userObj, setUserObj] = useRecoilState(recoilUserObjState);
  return (
    <>
      <div className="user">
        <Image
          className="userimg"
          src={userObj.image}
          width={30}
          height={30}
          objectFit="fill"
          alt="프로필이미지"
          style={{ borderRadius: '50%' }}
        />
        <div className="username">{userObj.username}</div>
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
