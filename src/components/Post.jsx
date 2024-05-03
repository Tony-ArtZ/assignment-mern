import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <div className="w-full min-w-max bg-mid-dark rounded-lg p-4 mb-4">
      <h2 className="text-light text-xl font-medium">@ {post.user.name}</h2>
      <h3 className="text-light text-sm mb-4">{post.user.email}</h3>
      <hr className="border-light border-2 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-light">{post.title}</h1>
      <p className="text-light">{post.content}</p>
    </div>
  );
};
Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
