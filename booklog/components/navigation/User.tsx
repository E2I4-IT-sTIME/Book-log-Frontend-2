import Button from "../portfolio/Button";
import img from "../image/tmp.jpg";
import Image from "next/image";

// 아래는 임시 데이터(삭제예정)
let isLogin = true; 
const name = "euna";
const imgSrc = "";
const User = () => {
  return(
    <>
    {isLogin && 
    <div className="login-true">
      반갑습니다, <b>{name}</b>님!
      <div className="profile-img"><Image src={img} width="50px" height="45px" objectFit="cover"></Image></div>
    </div>
    }
    {!isLogin && 
    <div className="login-false">
      <Button color="#125B50" text="Sign In" onClick={()=>{}} />
      북로그에 가입하고,<br/>
      서평으로 내 이력서를 채워보세요!
    </div>   
    }
    <style jsx>{`
    .login-true{
      font-size: 20px;
      width: fit-content;
      display: flex;
      align-items: center;
    }
    .profile-img{
      margin-left: 5px;
      border: 1px solid #C0C0C0;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    }
      
      `}</style>
    
    </>
  );
}

export default User;