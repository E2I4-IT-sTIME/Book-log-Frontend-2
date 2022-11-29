import axios from "axios";

const API = axios.create({
  baseURL: "http://43.200.85.245:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 서평 생성
export const postReveiwData = async (postData, userIndex) => {
  try {
    const res = await API.post(`/auth/user/${userIndex}/review`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

// 서평 목록
export const fetchReviewList = async (userIndex) => {
  try {
    const res = await API.get(`/auth/user/${userIndex}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 포트폴리오 목록
export const fetchPortfolioList = async (userIndex) => {
  try {
    const res = await API.get(`/auth/user/${userIndex}/portfolios`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 포트폴리오 생성
export const postPortfolioData = async (postData, userIndex) => {
  try {
    const res = await API.post(`/auth/user/${userIndex}/portfolio`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};
