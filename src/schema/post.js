import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be 3 character or more")
    .required("Title required"),
  content: yup
    .string()
    .required("Content required")
    .min(8, "Content must be 8 characters long"),
});
