import React from "react";
// import Navbar from "./Components/Navbar";
// import TrendingSection from "./Components/TrendingSection";
import Footer from "./Components/Footer";
const TrendingSection = React.lazy(() =>
  import("./Components/TrendingSection")
);
const Navbar = React.lazy(() => import("./Components/Navbar"));

const App = () => {
  return (
    <>
      <Navbar />
      <TrendingSection />
      <Footer/>
    </>
  );
};

export default App;
