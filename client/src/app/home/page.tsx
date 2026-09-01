import React from "react";
import Banner from "./banner/page";
import AllActivities from "../component/home/allActivity";

const HomePage = () => {
  return (
    <div className="w-full">
      <Banner />

      <AllActivities />
    </div>
  );
};

export default HomePage;