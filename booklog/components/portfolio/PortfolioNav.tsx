import Link from "next/link";
import { useRouter } from "next/router";

const PortfolioNav = () => {
  const router = useRouter();
  const path = router.pathname;
  const className = (link: string) => {
    return path == link && "active";
  };

  return (
    <>
      <div className="container">
        <Link href="/portfolio">
          <div className={`link ${className("/portfolio")}`}>
            포트폴리오 확인하기
          </div>
        </Link>
        <Link href="/portfolio/review">
          <div className={`link ${className("/portfolio/review")}`}>
            서평 작성하기
          </div>
        </Link>
        <Link href="/portfolio/new">
          <div className={`link ${className("/portfolio/new")}`}>
            포트폴리오 제작하기
          </div>
        </Link>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          justify-content: flex-end;
          gap: 30px;
        }
        .link {
          font-size: 18px;
          cursor: pointer;
          transition: all 0.25s;
          z-index: 100;
        }
        .active {
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default PortfolioNav;
