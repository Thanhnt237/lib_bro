

// https://mamnontrongtin.com/api/

import axios from 'axios';
import { keys } from '../constants';
import { apis } from '../constants/apis';
import { notification } from 'antd';

const instance = axios.create({
    baseURL: apis.baseURL,
    timeout: 20000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    
});

let isRefreshing = false;
let failedQueue = [];
function doLogout (){
    localStorage.removeItem(keys.access_token)
    localStorage.removeItem(keys.refresh_token)
    window.location.reload();
}

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

instance.interceptors.request.use(function (config) {
    // check token if has token add to header
    let token = window.localStorage.getItem(keys.access_token)
    if (!!token) {
        config.headers["x-access-token"] = token
    }
    return config

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


instance.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        const originalRequest = err.config;

        if (err.response.status === 401) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['x-access-token'] = token;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                axios
                    .post(apis.baseURL + apis.refresh_token, {
                        refresh_token: window.localStorage.getItem(keys.refresh_token)
                    })
                    .then(({ data }) => {
                        if (data.status === "OK") {
                            window.localStorage.setItem(keys.access_token, data.result.token)
                            axios.defaults.headers.common['x-access-token'] =  data.result.token;
                            originalRequest.headers['x-access-token'] =  data.result.token;
                            processQueue(null, data.fooToken);
                            resolve(axios(originalRequest));
                        }else{
                            processQueue(err, null);
                            notification.warn({message : "Vui lòng đăng nhập lại !"})
                            doLogout()
                            reject(err);
                        }
                    })
                    .catch(err => {
                        processQueue(err, null);
                        notification.warn({message : "Vui lòng đăng nhập lại !"})
                        doLogout()
                        reject(err);
                    })
                    .then(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(err);
    }
);

export default instance