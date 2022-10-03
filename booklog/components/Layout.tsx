import Footer from "./navigation/Footer";
import Header from "./navigation/Header";

const Layout = (props: any) => {
  //전체 layout 설정
  return(
    <>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </>
  );
}

export default Layout;