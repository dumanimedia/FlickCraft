import "./index.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import AboutUsPage from "./pages/about-us";
import ContactUsPage from "./pages/contact-us";
import NotFoundPage from "./pages/not-found";

import Header from "./components/header";
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
