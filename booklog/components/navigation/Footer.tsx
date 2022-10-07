const Footer = () => {
  return (
    <>
    <footer>
      <div>
      BOOKLOG.<br/>
      IT’s TIME 1st - DORMAMMU<br/>
      CONTACT _ igun0423@naver.com<br/>
      </div>
    </footer>
    <style jsx>{`
      footer {
        background-color: #125B50;
        height: 500px;
        padding: 5%;
        color: white;
        font-size: 24px;
        position: relative;
      }
      div {
        position: absolute;
        bottom: 10%;
      }
      `}</style>
    </>
  );
}

export default Footer;