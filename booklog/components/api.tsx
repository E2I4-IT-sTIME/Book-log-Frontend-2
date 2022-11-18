import axios from "axios";

export const API_END_POINT = "https://43.200.85.245:8080";

export const request = async (url, options = {}) => {
  try {
    const res = await axios(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) return await res.data();

    throw new Error("API 호출 오류!");
  } catch (e) {
    alert(e);
  }
};
