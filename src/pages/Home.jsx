import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";
import Post from "../components/Post";
import { GoMoveToTop } from "react-icons/go";

const Home = () => {
  const [post, setPost] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      window.location.href = "/signin";
    }
    const getData = async () => {
      const res = await fetch(`http://localhost:3000/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        window.location.href = "/signin";
      }
      setPost(data);
    };
    getData();
    setLoading(false);
  }, []);

  const getMoreData = async () => {
    const token = localStorage.getItem("auth-token");
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/post/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPage(page + 1);
    const data = await res.json();
    if (data.error) {
      window.location.href = "/signin";
    }
    console.log(data);
    if (data.length === 0) {
      setHasMore(false);
      return;
    }
    setPost([...post, ...data]);
  };
  return (
    <>
      <div className="fixed w-full bg-light z-10">
        <div className="container mx-auto flex justify-between px-2 sm:px-12 h-12 items-center">
          <h1 className="text-3xl font-bold text-dark">Home</h1>
          <button
            onClick={() => (window.location.href = "/create")}
            className="bg-dark text-light px-4 py-2 rounded-md"
          >
            Create Post
          </button>
          <button
            onClick={() => (window.location.href = "/signout")}
            className="bg-dark text-light px-4 py-2 rounded-md"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="flex pt-16 flex-col px-4 items-center overflow-x-hidden">
        {!loading && post.length > 0 ? (
          <InfiniteScroll
            dataLength={post.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#f5d5e0"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            }
          >
            <div className="container">
              <div className="row">
                {post && post.map((item) => <Post post={item} key={item.id} />)}
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          <div className="grid place-items-center h-screen">
            <h1 className="text-5xl font-bold text-light">No Posts Found</h1>
          </div>
        )}
        {loading && (
          <div className="grid place-items-center h-screen">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#f5d5e0"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {post.length > 0 && (
          <>
            <div className="grid place-items-center font-bold text-3xl text-light h-20">
              Thats all folks!
            </div>
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="fixed bottom-5 right-5 p-4 bg-light rounded-full text-dark"
            >
              <GoMoveToTop size={30} />
            </button>
          </>
        )}
      </div>
      {/* Background */}
      <div className="bg-stars fixed h-full w-full bg-repeat -z-20 bg-[20px]" />
      <div className="bg-twinkling animate-twinkle fixed h-full w-[3000px] bg-repeat -z-10" />
      <img
        src="bg.svg"
        alt="background"
        width={1500}
        height={1500}
        className="fixed bottom-0 object-cover w-screen h-40 -z-10 xl:h-fit"
      />
    </>
  );
};

export default Home;
