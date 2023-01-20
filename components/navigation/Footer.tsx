import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer>
        <span className="copyright">
          Copyright 2022. Team Dormammu all rights reserved.
        </span>
        <span className="contact">contact : igun0423@naver.com</span>
        <a
          rel="noreferrer"
          href="https://github.com/E2I4-IT-sTIME"
          target="_blank"
          className="github"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </footer>
      <style jsx>{`
        footer {
          background-color: #125b50;
          height: 300px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          padding: 30px;
          gap: 15px;
        }
        .copyright,
        .contact {
          font-weight: 300;
        }
        .github {
          font-size: 30px;
          text-decoration: none;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Footer;
