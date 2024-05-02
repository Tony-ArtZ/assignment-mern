import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email required"),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password must be 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Password must contain both letters and numbers"
    ),
});
