import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setThemeMode: state => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: state => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      const setFriends = new Set(action.payload.friends);
      const toArray = [...setFriends];
      if (state.user) {
        state.user.friends = toArray;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    addPost: (state, action) => {
      console.log(action.payload.posts);
      state.posts = [action.payload.posts, ...state.posts];
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setThemeMode, setLogin, setLogout, setFriends, setPosts, setPost, addPost } = authSlice.actions;
export default authSlice.reducer;
