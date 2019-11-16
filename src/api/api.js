import * as axios from "axios";
import { load } from "redux-localstorage-simple";
import store from "../reducers/reduxStore";

const instanceAuth = axios.create({
  baseURL: "http://localhost:3001/auth/",
});

const instanceYoutube = axios.create({
  baseURL: "http://localhost:3001/youtube/",
});

// eslint-disable-next-line import/prefer-default-export
export const authAPI = {
  getAuth(userId) {
    return instanceAuth.get(`${userId}`);
  },
  getToken(code) {
    return instanceAuth.post(`${code}`);
  },
};

export const youtubeAPI = {
  searchVideos(
    query,
    tags,
    maxResults = 25,
    part = "snippet",
    type = "",
    publishedAfter = new Date(1970).toISOString(),
    order = "relevance",
  ) {
    const string = tags.map(tag => `##"${tag}"`).join("");
    return instanceYoutube.post(`search`, {
      params: {
        maxResults,
        part,
        q: `${query}${string}`,
        type,
        publishedAfter,
        order,
      },
    });
  },
  getPlaylists() {
    return instanceYoutube.get("playlists");
  },
  createPlaylist(title, description) {
    return instanceYoutube.put("playlists", { title, description });
  },
  getPlaylistVideos(playlistId) {
    return instanceYoutube.get(`playlists/${playlistId}/videos`);
  },
  addVideoToPlaylist(playlistId, videoIds) {
    return instanceYoutube.put(`playlists/${playlistId}/videos`, { videoIds });
  },
  deleteVideoFromPlaylist(playlistId, videoIds) {
    return instanceYoutube.delete(`playlists/${playlistId}/videos`, {
      videoIds,
    });
  },
  updatePlaylist(playlistId, title, description) {
    return instanceYoutube.post(`playlists/${playlistId}`, {
      title,
      description,
    });
  },
  removePlaylist(playlistId) {
    return instanceYoutube.delete(`playlists/${playlistId}`);
  },
};

instanceYoutube.interceptors.request.use(config => {
  const localStorage = load({
    namespace: "endor",
  });
  if (localStorage.loginPage.token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `bearer ${localStorage.loginPage.token}`;
  }
  return config;
});

instanceYoutube.interceptors.response.use(
  result => {
    return result.data.data;
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch({
        type: "login/LOG_OUT"
      });
      store.dispatch({
        type: "main/LOG_OUT"
      });
      return Promise.reject(error.response.status);
    }
    return Promise.reject(error.response.status);
  },
);
