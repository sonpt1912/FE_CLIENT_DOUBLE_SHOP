import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../page/Home";
import Pages from "../page/Pages";
import Blog from "../page/Blog";
import Contact from "../page/Contact";
import Shop from "../page/Shop";
import UserProfile from "../page/UserProfile";

const Content = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/pages" element={<Pages />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/userProfile" element={<UserProfile />} />
    </Routes>
  );
};

export default Content;
