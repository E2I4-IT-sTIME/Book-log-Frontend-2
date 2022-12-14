import Head from "next/head";

interface headProps {
  title: string;
}
export default function Seo(props: headProps) {
  const { title } = props;
  return (
    <Head>
      <title>{title} | Booklog - 북로그, 포트폴리오에 나의 서평을 담다.</title>
    </Head>
  );
}
