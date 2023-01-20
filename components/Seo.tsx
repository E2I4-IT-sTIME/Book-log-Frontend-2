import Head from "next/head";

interface headProps {
  title: string;
  content: string;
}
export default function Seo(props: headProps) {
  const { title, content } = props;
  return (
    <Head>
      <link rel="shortcut icon" href="/logo.png" />
      <title>{title} | Booklog - 북로그, 포트폴리오에 나의 서평을 담다.</title>
      <meta name="description" content={content} />
      <meta
        name="keywords"
        content="SWYG,독서,독후감,서평,포트폴리오,링크드인,취업,이력서,레쥬메,Booklog,booklog,북로그,취뽀,스펙,모임,독서모임,친목"
      />
      <meta
        name="og:site_name"
        content="Booklog - 북로그, 포트폴리오에 나의 서평을 담다."
      />
      <meta
        name="og:title"
        content={`${title} | Booklog - 북로그, 포트폴리오에 나의 서평을 담다.`}
      />
      <meta name="og:description" content={content} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://booklog.swygbro.com" />
      <meta
        name="og:image"
        content="https://booklog-deploy.s3.ap-northeast-2.amazonaws.com/main.png"
      />
      <meta
        name="twitter:site_name"
        content="Booklog - 북로그, 포트폴리오에 나의 서평을 담다."
      />
      <meta
        name="twitter:title"
        content={`${title} | Booklog - 북로그, 포트폴리오에 나의 서평을 담다.`}
      />
      <meta name="twitter:description" content={content} />
      <meta name="twitter:type" content="website" />
      <meta name="twitter:url" content="https://booklog.swygbro.com" />
      <meta
        name="twitter:image"
        content="https://booklog-deploy.s3.ap-northeast-2.amazonaws.com/main.png"
      />
      <script
        defer
        src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
      ></script>
    </Head>
  );
}
