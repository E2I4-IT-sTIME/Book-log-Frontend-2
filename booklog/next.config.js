/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "i.pinimg.com",
      "k.kakaocdn.net",
      "mybooklog.s3.ap-northeast-2.amazonaws.com",
      "booklog-deploy.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
