/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { youtubeAPI } from "../api/api";
import { logOutInfo } from "./loginReducer";

const LOG_OUT = "main/LOG_OUT";
const SEARCH = "main/SEARCH";
const SET_PLAYLISTS = "main/SET_PLAYLISTS";
const TOGGLE_SELECTED = "main/TOGGLE_SELECTED";
const SELECT_ALL_VIDEOS = "main/SELECT_ALL_VIDEOS";
const UNSELECT_ALL_VIDEOS = "main/UNSELECT_ALL_VIDEOS";
const SELECT_PLAYLIST = "main/SELECT_PLAYLIST";
const UNSELECT_PLAYLIST = "main/UNSELECT_PLAYLIST";
const ADD_TAG = "main/ADD_TAG";
const DELETE_TAG = "main/DELETE_TAG";
const SET_QUERY = "main/SET_QUERY";
const SET_SEARCH_TYPE = "main/SET_SEARCH_TYPE";
const SET_PUBLISHED_AFTER = "main/SET_PUBLISHED_AFTER";
const SET_SEARCH_ORDER = "main/SET_SEARCH_ORDER";

const lastDay = new Date(Date.now() - 86400000).toISOString();
const lastWeek = new Date(Date.now() - 604800000).toISOString();
const lastMonth = new Date(Date.now() - 2592000000).toISOString();

const initialState = {
  playlists: [],
  videos: [],
  tags: [],
  selectedPlaylist: "",
  selectAll: false,
  query: "Apple",
  searchType: [
    {
      name: "None",
      value: ""
    },
    {
      name: "Video",
      value: "video"
    },
    {
      name: "Channel",
      value: "channel"
    },
    {
      name: "Playlist",
      value: "playlist"
    }
  ],
  searchTypeSelected: [
    {
      name: "None",
      value: ""
    }
  ],
  publishedAfter: [
    {
      name: "None",
      value: new Date(1970).toISOString()
    },
    {
      name: "Last Day",
      value: lastDay
    },
    {
      name: "Last Week",
      value: lastWeek
    },
    {
      name: "Last Month",
      value: lastMonth
    }
  ],
  publishedAfterSelected: [
    {
      name: "None",
      value: new Date(1970).toISOString()
    }
  ],
  order: [
    {
      name: "None",
      value: "relevance"
    },
    {
      name: "Date",
      value: "date"
    },
    {
      name: "Rating",
      value: "rating"
    },
    {
      name: "View Count",
      value: "viewCount"
    }
  ],
  orderSelected: [
    {
      name: "None",
      value: "relevance"
    }
  ]
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists
      };
    }
    case SEARCH: {
      return {
        ...state,
        videos: action.videos
      };
    }
    case TOGGLE_SELECTED: {
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.etag === action.etag) {
            return { ...video, selected: !video.selected };
          }
          return video;
        })
      };
    }
    case SELECT_ALL_VIDEOS: {
      return {
        ...state,
        videos: state.videos.map(video => {
          return { ...video, selected: true };
        }),
        selectAll: true
      };
    }
    case UNSELECT_ALL_VIDEOS: {
      return {
        ...state,
        videos: state.videos.map(video => {
          return { ...video, selected: false };
        }),
        selectAll: false
      };
    }
    case SELECT_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.id
      };
    }
    case UNSELECT_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: ""
      };
    }
    case ADD_TAG: {
      return {
        ...state,
        tags: [action.tag, ...state.tags]
      };
    }
    case DELETE_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tag)
      };
    }
    case SET_QUERY: {
      return {
        ...state,
        query: action.query
      };
    }
    case LOG_OUT: {
      return {
        ...initialState
      };
    }
    case SET_SEARCH_TYPE: {
      return {
        ...state,
        searchTypeSelected: state.searchType.filter(
          option => option.value === action.value
        )
      };
    }
    case SET_PUBLISHED_AFTER: {
      return {
        ...state,
        publishedAfterSelected: state.publishedAfter.filter(
          option => option.value === action.value
        )
      };
    }
    case SET_SEARCH_ORDER: {
      return {
        ...state,
        orderSelected: state.order.filter(
          option => option.value === action.value
        )
      };
    }
    default:
      return state;
  }
};

const setPlaylists = playlists => ({
  type: SET_PLAYLISTS,
  playlists
});

const setVideos = videos => ({
  type: SEARCH,
  videos
});

const setQuery = query => ({
  type: SET_QUERY,
  query
});

export const setType = value => ({
  type: SET_SEARCH_TYPE,
  value
});

export const setPublishedAfter = value => ({
  type: SET_PUBLISHED_AFTER,
  value
});

export const setOrder = value => ({
  type: SET_SEARCH_ORDER,
  value
});

export const selectPlaylist = id => ({
  type: SELECT_PLAYLIST,
  id
});

export const unselectPlaylist = () => ({
  type: UNSELECT_PLAYLIST
});

export const setVideoSelected = etag => ({
  type: TOGGLE_SELECTED,
  etag
});

export const setAllSelected = () => ({
  type: SELECT_ALL_VIDEOS
});

export const setAllUnselected = () => ({
  type: UNSELECT_ALL_VIDEOS
});

export const setNewTag = tag => ({
  type: ADD_TAG,
  tag
});

export const deleteTag = tag => ({
  type: DELETE_TAG,
  tag
});

const logOutData = () => ({
  type: LOG_OUT
});

export const logOut = () => dispatch => {
  dispatch(logOutInfo());
  dispatch(logOutData());
};

export const getPlaylists = () => async dispatch => {
  try {
    const result = await youtubeAPI.getPlaylists();
    await dispatch(setPlaylists(result.items));
  } catch (error) {
    return error;
  }
};

export const searchVideos = (
  query,
  maxResults = 25,
  part = "snippet"
) => async (dispatch, getState) => {
  try {
    await dispatch(setQuery(query));
    const {
      mainPage: {
        tags,
        searchTypeSelected,
        publishedAfterSelected,
        orderSelected
      }
    } = getState();
    const result = await youtubeAPI.searchVideos(
      query,
      tags,
      maxResults,
      part,
      searchTypeSelected[0].value,
      publishedAfterSelected[0].value,
      orderSelected[0].value
    );
    const videos = result.items.map(video => {
      return { ...video, selected: false };
    });
    await dispatch(setVideos(videos));
  } catch (error) {
    return error;
  }
};

export const createPlaylist = (
  title,
  description = "Created with test app"
) => async dispatch => {
  try {
    await youtubeAPI.createPlaylist(title, description);
    await dispatch(getPlaylists());
  } catch (error) {
    return error;
  }
};

export const editPlaylist = (
  id,
  title,
  description = "Created with test app"
) => async dispatch => {
  try {
    await youtubeAPI.updatePlaylist(id, title, description);
    await dispatch(getPlaylists());
  } catch (error) {
    return error;
  }
};

export const deletePlaylist = id => async dispatch => {
  try {
    await youtubeAPI.removePlaylist(id);
    await dispatch(getPlaylists());
    await dispatch(unselectPlaylist());
  } catch (error) {
    return error;
  }
};

export const getPlaylistVideos = id => async dispatch => {
  try {
    await dispatch(selectPlaylist(id));
    const result = await youtubeAPI.getPlaylistVideos(id);
    const videos = result.items.map(video => {
      return { ...video, selected: false };
    });
    await dispatch(setVideos(videos));
  } catch (error) {
    return error;
  }
};

export default mainReducer;
