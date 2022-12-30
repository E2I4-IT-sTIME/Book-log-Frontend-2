import axios from "axios";

const API = axios.create({
  baseURL: "http://43.200.85.245:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 서평 추가
export const addReviewtoPort = async (postData, userIndex) => {
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

// 포트폴리오 개별 조회
export const fetchPortfolio = async (userIndex, port_id) => {
  try {
    const res = await API.get(`/auth/user/${userIndex}/portfolios/${port_id}`, {
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
export const postPortfolioData = async (formData, userIndex) => {
  try {
    const res = await API.post(`/auth/user/${userIndex}/portfolio`, formData, {
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
