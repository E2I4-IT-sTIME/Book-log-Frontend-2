import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const path = router.pathname;
  const className = (link:string) => {
    return path == link && "active";
  }

  return (
    <header>
      <div className="container">
        <div className="logo">BOOKLOG.</div>
        <Link href="/" ><div className={`link ${className("/")}`}>HOME</div></Link>
        <Link href="/portfolio"><div className={`link ${className("/portfolio")}`}>MY PORTFOLIO</div></Link>
        <Link href="/bookclub"><div className={`link ${className("/bookclub")}`}>BOOK CLUB</div></Link>
        <Link href="/community"><div className={`link ${className("/community")}`}>COMMUNITY</div></Link>
      </div>
      <style jsx>{`
        header{
          width: fit-content;
        }
        .container {
          display: flex;
          flex-direction: column;
          margin-left: 5px;
        }
        .logo {
          color : #125B50;
          font-size: 64px;
          font-weight: 900;
          margin: 20px 0;
          text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        }
        .link {
          font-size: 20px;
          font-weight: 600;  
          margin: 8px 0;   
          width: fit-content;
          padding: 5px 10px;   
        }
        .active {
          background-color: #125B50;
          border-radius: 10px;
          color: white;
          margin-left: 5px;
        }


        
        
        `}</style>
    
    </header>
  );
}

export default Header;