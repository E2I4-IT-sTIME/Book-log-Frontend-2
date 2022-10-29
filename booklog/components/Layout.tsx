import Footer from "./navigation/Footer";
import Header from "./navigation/Header";
import User from "./navigation/User";

const Layout = (props: any) => {
  // 전체 layout 설정
  // 헤더와 푸터는 position을 absolute로 했고,
  // content는 배경 까는 것 때문에 width, height 다 100%로 지정해뒀습니다
  return (
    <>
      <div className="container">
        <header>
          <Header />
          <User />
        </header>
        <div className="content">{props.children}</div>
        <Footer />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          padding: 40px 50px 0px 50px;
        }
        .content {
          flex: 1;
          width: 100%;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default Layout;
