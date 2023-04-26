import axios from "axios";

// АПИ внизу? Базовый УРЛ.

// TODO Вынести в конфиг (и изображение в одном посте)
const instance = axios.create({
  baseURL: "http://localhost:9143/api",
});

// Сразу вшиваем токен через интерсептор.
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
