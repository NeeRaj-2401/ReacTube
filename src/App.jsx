import React from "react";
// import Navbar from "./Components/Navbar";
// import TrendingSection from "./Components/TrendingSection";
const TrendingSection = React.lazy(() =>
  import("./Components/TrendingSection")
);
const Navbar = React.lazy(() => import("./Components/Navbar"));

const App = () => {
  return (
    <>
      <Navbar />
      <TrendingSection />
    </>
  );
};

export default App;
