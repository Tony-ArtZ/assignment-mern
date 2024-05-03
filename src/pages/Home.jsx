import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../components/Post";
import { GoMoveToTop } from "react-icons/go";
import Loader from "../components/Loader";
import { cn, projects } from "../utils/cn";
import { Boxes } from "../components/bg";
import { HoverEffect } from "../components/card";

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
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/post`, {
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
      setLoading(false);
    };
    getData();
  }, []);

  const getMoreData = async () => {
    setLoading(true);
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
    setLoading(false);
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
      <div className="fixed w-full bg-light z-50">
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
      <div className="h-96 relative w-full overflow-hidden bg-dark   flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-dark z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <h1
          className={cn(
            "md:text-4xl text-3xl font-bold text-light relative z-20"
          )}
        >
          Welcome BrainOp!
        </h1>
        <p className="text-center mt-2 text-mid-light relative z-20">
          Scroll down to see posts
        </p>
      </div>
      <h1 className="text-lg md:text-3xl font-bold text-light mt-8 w-full text-center">
        Technologies Used
      </h1>
      <h2 className=" text-mid-light text-center mt-4">
        ( Click to see the corresponding repositories )
      </h2>
      <div className="max-w-5xl w-full flex justify-center items-center mx-auto">
        <HoverEffect items={projects} />
      </div>
      <h1 className="text-lg md:text-3xl font-bold text-light mt-8 w-full text-center">
        Posts
      </h1>
      <h2 className=" text-mid-light text-center mt-4">
        ( Scrolls infinitely to load more posts )
      </h2>
      <div className="flex pt-16 flex-col px-4 items-center overflow-x-hidden">
        {loading && post.length <= 0 && (
          <div className="grid place-items-center h-screen">
            <Loader height={80} width={80} />
          </div>
        )}
        {post.length > 0 ? (
          <InfiniteScroll
            dataLength={post.length}
            next={getMoreData}
            hasMore={hasMore}
            className="w-full"
            loader={<Loader height={80} width={80} />}
          >
            <div className="w-screen px-8 max-w-[720px]">
              {post && post.map((item) => <Post post={item} key={item.id} />)}
            </div>
          </InfiniteScroll>
        ) : (
          <>
            {post.length <= 0 && !loading && (
              <div className="grid place-items-center h-screen">
                <h1 className="text-5xl text-center font-bold text-light">
                  No Posts Found
                </h1>
              </div>
            )}
          </>
        )}

        {post.length > 0 && !loading && (
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
