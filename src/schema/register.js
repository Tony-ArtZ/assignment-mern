import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email required"),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Password must contain both letters and numbers"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
