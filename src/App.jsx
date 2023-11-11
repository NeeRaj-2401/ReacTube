import React from "react";
// import Navbar from "./Components/Navbar";
// import TrendingSection from "./Components/TrendingSection";
import Footer from "./Components/Footer";
const TrendingSection = React.lazy(() =>
  import("./Components/TrendingSection")
);
const Navbar = React.lazy(() => import("./Components/Navbar"));

const baseUrl = "https://pipedapi.kavin.rocks";

const App = () => {
  return (
    <>
      <Navbar baseUrl={baseUrl}/>
      <TrendingSection baseUrl={baseUrl}/>
      <Footer/>
    </>
  );
};

export default App;
