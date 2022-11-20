import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

const kakaoSearch = (params: any) => {
  return Kakao.get("/v3/search/book", { params });
};

export const bookSearch = async (searchKey: string) => {
  try {
    if (searchKey === "") {
      return;
    }
    const params = {
      query: searchKey,
      size: 45,
      target: "title",
    };
    const result = await kakaoSearch(params);

    if (result) {
      if (result.data.documents.length === 0) return [];
      return result.data.documents;
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const bookImgSearch = async (isbn: string) => {
  try {
    const params = {
      query: isbn,
      size: 45,
      target: "isbn",
    };
    const result = await kakaoSearch(params);

    if (result) {
      if (result.data.documents.length === 0) return "";
      return result.data.documents[0].thumbnail;
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log("error", error);
    return "";
  }
};
