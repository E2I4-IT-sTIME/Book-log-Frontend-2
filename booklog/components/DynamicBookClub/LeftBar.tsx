import Image from "next/image";
import logo from "../../res/logo.png";
import Router from "next/router";

interface userProps {
  images: Array<string>;
}

export default function LeftBar(props: userProps) {
  const { images } = props;
  const router = Router;

  const httpReg = (data: string) => {
    return /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi.test(data);
  };

  return (
    <div className="container">
      <ul>
        <li onClick={() => router.push("/")}>
          <Image src={logo} width={50} height={50} />
        </li>
        {images.map((image, index) => (
          <li key={`${image}-${index}`} className="user-icon">
            <Image
              src={
                httpReg(image)
                  ? image
                  : "https://i.pinimg.com/564x/69/50/1b/69501b91b9aad7e2e62819ba91ca7ffe.jpg"
              }
              objectFit="cover"
              layout="fill"
            />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
        }
        .container ul {
          list-style-type: none;
          padding: 20px 0px;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
        }

        li {
          cursor: pointer;
          transition: all 0.25s;
        }

        li:hover {
          transform: scale(1.02);
        }

        li:active {
          transform: scale(0.98);
        }

        .user-icon {
          width: 45px;
          height: 45px;
          position: relative;
          overflow: hidden;
          border-radius: 100%;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }
      `}</style>
    </div>
  );
}
