import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-primary rounded-lg">
      {/* --------- Top Navigation --------- */}
      <nav className="flex items-center justify-between px-6 md:px-10 lg:px-20 py-4 text-white">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold">MediChain+</span>
        </div>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/listofdoctors" className="hover:text-gray-200 transition">
              Doctors
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button (optional) */}
        <button className="md:hidden p-2 rounded-md hover:bg-white/20 transition">
          <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
        </button>
      </nav>

      {/* --------- Hero Section --------- */}
      <div className="flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20">
        {/* Left side */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p>
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden sm:block" /> schedule your appointment
              hassle-free.
            </p>
          </div>
          <Link
            to="/listofdoctors"
            className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            Book appointment{" "}
            <img className="w-3" src={assets.arrow_icon} alt="" />
          </Link>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 relative">
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;