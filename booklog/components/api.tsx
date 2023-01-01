import axios from 'axios';
import { useEffect } from 'react';

const API = axios.create({
  baseURL: 'http://15.165.100.90:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 유저 정보 받아오기
export const fetchUserInfo = async () => {
  try {
    const uid = localStorage.getItem('uid');
    const res = await API.get(`/auth/user/${uid}`, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// 서평 추가
export const addReviewtoPort = async (postData) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.post(`/auth/user/${userIndex}/review`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
export const postReveiwData = async (postData) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.post(`/auth/user/${userIndex}/review`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

// 서평 삭제
export const deleteReveiwData = async (reviewId) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.delete(`/auth/user/${userIndex}/review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
export const fetchReviewList = async () => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.get(`/auth/user/${userIndex}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
export const fetchPortfolioList = async () => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.get(`/auth/user/${userIndex}/portfolios`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
export const fetchPortfolio = async (port_id) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.get(`/auth/user/${userIndex}/portfolios/${port_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
export const postPortfolioData = async (formData) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.post(`/auth/user/${userIndex}/portfolio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

// 포트폴리오 수정
export const patchPortfolioData = async (formData, portId) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.patch(
      `/auth/user/${userIndex}/portfolio/${portId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

// 포트폴리오 삭제
export const deletePortfolio = async (portId) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.delete(
      `/auth/user/${userIndex}/portfolio/${portId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};
