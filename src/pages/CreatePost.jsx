import { MdOutlineTitle } from "react-icons/md";
import Input from "../components/Input";
import { postSchema } from "../schema/post";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCaretBackCircle } from "react-icons/io5";

const CreatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: postSchema,
    onSubmit: async (values) => {
      if (submitting) return;
      try {
        setSubmitting(true);
        if (!values.title || !values.content) {
          toast.error("Please fill all fields");
          setSubmitting(false);
          return;
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.error) {
          console.log(data.error.message);
          toast.error(data.error.message);
          setSubmitting(false);
          return;
        }
        toast.success("Post created successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
      }
      setSubmitting(false);
    },
  });
  return (
    <main className="grid place-items-center h-screen">
      <div className="w-full absolute top-8 px-12">
        <button
          onClick={() => navigate("/")}
          className="text-light flex justify-center items-center gap-4 hover:underline transition-all font-bold text-2xl"
        >
          <IoCaretBackCircle className="inline-block text-4xl" />
          Back
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4"
      >
        <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
          Create Post!
        </h1>
        {/* Title Field */}
        <Input
          label="Title"
          Icon={MdOutlineTitle}
          name="title"
          onChange={formik.handleChange}
          error={formik.errors.title}
          type="text"
          placeholder="Title"
          className="w-full p-4 rounded-xl bg-light text-dark font-main font-bold"
        />
        {/* Description Field */}
        <textarea
          name="content"
          onChange={formik.handleChange}
          rows={5}
          placeholder="Content"
          className="w-full p-4 border-4 border-light rounded-xl bg-dark text-light font-main font-bold"
        />
        {formik.errors.content && (
          <p className="text-red-500 text-sm text-left w-full pl-2">
            {formik.errors.content}
          </p>
        )}

        <button
          type="submit"
          className="flex justify-center items-center font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
        >
          Create
        </button>
      </form>
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
    </main>
  );
};

export default CreatePost;
