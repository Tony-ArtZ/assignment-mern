import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const projects = [
  {
    title: "Express",
    description:
      "MiddleWare for authorization and authentication. Prisma for database management. MongoDB for storing user data. JWT token management. Rate Limiting. Email validation and Password Reset.",
    link: "https://github.com/Tony-ArtZ/assignment-mern-api",
  },
  {
    title: "React",
    description:
      "React Router for routing. Context API for state management. Tailwind CSS for styling. Formik and Yup for form handling. FramerMotion for animations. Infinite Scroll for lazy loading.",
    link: "https://github.com/Tony-ArtZ/assignment-mern",
  },
];
