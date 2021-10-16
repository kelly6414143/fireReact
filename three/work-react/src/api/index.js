import React from "react";
import axios from "axios";
import toast from "@/components/Toast/Toast"

function axiosMaps() {
  const instance = axios.create({
    baseURL: "https://l8-upgrade-apis.herokuapp.com/",
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // React.$commonTool.devConsole("request", config);
      //設定請求頭
      config.headers = {
        ContentType: "application/x-www-form-urlencoded",
        Authorization: "Bearer " + sessionStorage["userToken"],
      };
      return config;
    },
    (error) => {
      // React.$commonTool.devConsole("requesterr", error);
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      // React.$commonTool.devConsole("response", response);
      const { data, status } = response;
      if (status) {
        switch (status) {
          case 200:
            return data;
          case 401:
            //未登入處理方法
            toast.error(response.data.message)
            break;
          case 403:
            //token過期處理方法
            toast.error(response.data.message)
            sessionStorage.removeItem('userToken')
            break;
          default:
            toast.error(response.data.message)
        }
      } else {
        return response;
      }
    },
    (error) => {
      // React.$commonTool.devConsole("responseerr", error);
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );

  const post = (url, param, header) => {
    return instance
      .post(url, param, header)
      .then((res) => {
        // React.$commonTool.devConsole("postres", res);
        return res;
      })
      .catch((error) => {
        // React.$commonTool.devConsole("posterr", error);
        return error.response.data;
      });
  };

  const get = (url, params, header) => {
    return instance
      .get(url, { params: params, headers: header })
      .then((res) => {
        // React.$commonTool.devConsole("postres", res);
        return res;
      })
      .catch((error) => {
        // React.$commonTool.devConsole("posterr", error);
        return error.response.data;
      });
  };

  const put = (url, param, header) => {
    return instance
      .put(url, param, header)
      .then((res) => {
        // React.$commonTool.devConsole("postres", res);
        return res;
      })
      .catch((error) => {
        // React.$commonTool.devConsole("posterr", error);
        return error.response.data;
      });
  };

  return {
    post: post,
    get: get,
    put: put,
  };
}

export default axiosMaps;
