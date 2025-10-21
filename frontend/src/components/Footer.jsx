import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-gray-400 py-10 px-40">
      {/* Top Section */}
      <div className="flex flex-col items-center mb-10">
        <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
        <ul className="space-y-2 text-center">
          <li>
            <a href="/" className="hover:text-white transition">
              About us
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-white transition">
              Terms of use
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-white transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-white transition">
              Disclaimer
            </a>
          </li>
        </ul>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <p className="text-sm mb-4 md:mb-0">Copyright © 2021, Cryptous</p>

        <div className="flex space-x-4">
          <a
            href="/"
            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-md hover:bg-gray-700 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="/"
            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-md hover:bg-red-500 hover:border-red-500 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="/"
            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-md hover:bg-gray-700 transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="/"
            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-md hover:bg-gray-700 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
