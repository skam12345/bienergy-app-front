import axios from "axios";

export default axios.create({
  baseURL: "http://129.154.213.191:3000", // 개발 스프링 서버
  // baseURL: 'http://localhost:3000/' // 로컬 서버
});
