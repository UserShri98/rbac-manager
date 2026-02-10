import axios from "axios";

const api=axios.create({
  baseURL:"http://localhost:6500/api",
  withCredentials:true,
});

api.interceptors.request.use((config)=>{
  const token=localStorage.getItem("token");
  if(token){
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
(res)=>res,
    (err)=>{
    const status=err.response?.status;
    const url=err.config?.url;

    if (status===401 && !url.includes("/auth/login")) {
      localStorage.removeItem("token");
      window.location.href="/login";
    }

    return Promise.reject(err);
  }
);


export default api;
