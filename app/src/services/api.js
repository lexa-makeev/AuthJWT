import axios from "axios";

const JWTToken = localStorage.getItem("access_token");
export const MAIN_URL = "http://localhost:3000/login";
export const API_URL = "http://localhost:3001/api/";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export function apiSetHeader(name, value) {
    if (value) {
        api.defaults.headers[name] = value;
    }
}

if (JWTToken) {
    apiSetHeader("Authorization", `Bearer ${JWTToken}`);
}
let isRefreshing = false;
let refreshFailed = false;

api.interceptors.response.use(
    (response) => {
        if (!response.config.headers["Authorization"]) {
            window.location.href = MAIN_URL;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing && !refreshFailed) {
                try {
                    isRefreshing = true;
                    const res = await api.get("refresh");
                    if (res.status === 200) {
                        localStorage.setItem("access_token", res.data.access);
                        apiSetHeader(
                            "Authorization",
                            `Bearer ${localStorage.getItem("access_token")}`
                        );
                        originalRequest.headers.authorization =
                            "Bearer " + localStorage.getItem("access_token");
                        isRefreshing = false;
                        return api.request(originalRequest);
                    }
                } catch (refreshError) {
                    refreshFailed = true;
                    // Обработка ошибки при обновлении токена
                } finally {
                    isRefreshing = false;
                }
            }

            // Если выполнение дошло сюда, значит запрос на обновление токена не выполнен или произошла ошибка при обновлении.
            // Выполняем необходимые действия, например, перенаправляем пользователя на главную страницу.
            localStorage.removeItem("access_token");
            window.location.href = MAIN_URL;
            return new Promise(() => {}); // Возвращаем пустой Promise без ошибки
        }

        return Promise.reject(error);
    }
);

export default api;
