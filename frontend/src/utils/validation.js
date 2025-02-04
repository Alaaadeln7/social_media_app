import * as yup from "yup";
export const validationLoginPage = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const validationSignupPage = yup.object({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/\d/, "Password must contain a number"),
});
export const validationCreatePost = yup.object({
  content: yup.string().trim().required("Text is required"),
  image: yup.mixed().nullable(),
});
export const commentValidationSchema = yup.object({
  comment: yup.string().trim().required("comment is required"),
});
