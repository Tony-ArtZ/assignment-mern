import * as yup from "yup";

export const forgotSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email required"),
});
