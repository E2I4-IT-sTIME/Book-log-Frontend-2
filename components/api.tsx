import axios from 'axios';

const API = axios.create({
  baseURL: 'https://booklog.site',
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
export const addReviewtoPort = async (postData: any) => {
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
export const postReveiwData = async (postData: any) => {
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
export const deleteReveiwData = async (reviewId: number) => {
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
    const res = await API.get(`/user/${userIndex}/portfolios`, {
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
export const fetchPortfolio = async (port_id: string) => {
  try {
    const userIndex = localStorage.getItem('uid');
    const res = await API.get(`/user/${userIndex}/portfolios/${port_id}`, {});
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 포트폴리오 생성
export const postPortfolioData = async (formData: any) => {
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
export const patchPortfolioData = async (formData: any, portId: string) => {
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
export const deletePortfolio = async (portId: string) => {
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
