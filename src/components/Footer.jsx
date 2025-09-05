export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 w-full fixed bottom-0 left-0 z-40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Mobile top row: left, center, right */}
        <div className="w-full flex justify-between md:justify-start items-center">
          {/* Left: Branding */}
          <div className="text-left md:mr-4">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              Sri Nitish
            </h3>
          </div>

          {/* Center: Copyright */}
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Right: Optional message */}
          <div className="text-right md:ml-auto text-sm italic text-gray-500">
            Designed and Developed ❤️ using MERN
          </div>
        </div>
      </div>
    </footer>
  );
}
