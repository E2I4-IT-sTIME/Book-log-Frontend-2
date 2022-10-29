import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const path = router.pathname;
  const className = (link: string) => {
    return path == link && "active";
  };

  return (
    <header>
      <div className="container">
        <Link href="/">
          <div className="logo">BOOKLOG.</div>
        </Link>
        <ul>
          <li>
            <Link href="/">
              <div className={`link ${className("/")}`}>HOME</div>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <div className={`link ${className("/portfolio")}`}>
                MY PORTFOLIO
              </div>
            </Link>
          </li>
          <li>
            <Link href="/bookclub">
              <div className={`link ${className("/bookclub")}`}>BOOK CLUB</div>
            </Link>
          </li>
          <li>
            <Link href="/community">
              <div className={`link ${className("/community")}`}>COMMUNITY</div>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        header {
        }
        .container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-left: 5px;
        }
        .logo {
          color: #125b50;
          font-size: 48px;
          font-weight: 900;
          text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          margin-left: 5px;
        }
        ul {
          list-style-type: none;
          margin: 0px;
          padding: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .link {
          font-size: 18px;
          font-weight: 600;
          width: fit-content;
          padding: 5px 10px;
          color: #2b2b2b;
          cursor: pointer;
          transition: all 0.25s;
        }
        .link:not(.active):hover {
          color: #125b50;
        }
        .active {
          background-color: #125b50;
          border-radius: 10px;
          color: white;
          margin-left: 5px;
        }
      `}</style>
    </header>
  );
};

export default Header;
