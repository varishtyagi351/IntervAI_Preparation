import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HERO_IMG from '../assets/hero.png';
import { LuSparkles } from 'react-icons/lu';
import APP_FEATURES from '../utils/data';
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const handleAuthButtonClick = () => {
    setOpenAuthModal(true);
    setCurrentPage("login");
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF] relative">
        {/* Background Blur Effect */}
        <div className="w-[400px] h-[400px] bg-amber-200/20 blur-[80px] absolute top-0 left-0 -z-10" />

        {/* Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-20 relative z-10">
          
          {/* Header */}
<header className="flex items-center justify-between flex-wrap gap-4 mb-16">
  {/* Logo */}
  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
    Interv.AI
  </div>

  {/* Button or Profile */}
  <div className="w-auto">
    {user ? (
      <ProfileInfoCard />
    ) : (
      <button
        onClick={handleAuthButtonClick}
        className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-200"
      >
        Login / Sign Up
      </button>
    )}
  </div>
</header>


          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 w-max mb-4">
                <LuSparkles /> AI Powered
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-medium leading-tight mb-4">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <p className="text-base sm:text-lg md:text-[17px] text-gray-900 leading-relaxed mb-6">
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery – your ultimate interview toolkit is here.
              </p>
              <button
                className="w-full sm:w-max bg-black text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black cursor-pointer border border-yellow-50 hover:border-yellow-300 transition-colors duration-200"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </section>

          {/* Hero Image */}
          <section className="flex justify-center items-center mt-16">
            <img
              src={HERO_IMG}
              alt="Hero Illustration"
              className="w-full max-w-4xl rounded-xl shadow-md"
            />
          </section>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#FFFCEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-20">
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12">
              Features That Make You Shine
            </h2>
            
            {/* First 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow hover:shadow-xl shadow-amber-100 border border-amber-100 transition-all"
                >
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Remaining 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow hover:shadow-xl shadow-amber-100 border border-amber-100 transition-all"
                >
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-sm bg-gray-50 text-secondary text-center p-5">
        Made With ❤️ — Happy Coding
      </footer>

      {/* Auth Modal */}
      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
            {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
          </div>
        </Modal>
      )}
    </>
  );
};

export default LandingPage;
