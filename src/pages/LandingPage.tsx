import { useAppSelector } from "@/redux/hook";
import React from "react";

const LandingPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  console.log("user", user);
  return <h1>Welcome to the Landing Page</h1>;
};

export default LandingPage;
