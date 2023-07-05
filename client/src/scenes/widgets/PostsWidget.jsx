import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, otherProfile = false, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const token = useSelector(state => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/api/v1/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/api/v1/posts/${userId}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts?.map(post => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={post.likes}
          comments={post.comments}
          otherProfile={otherProfile}
        />
      ))}
    </>
  );
};

export default PostsWidget;
