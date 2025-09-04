// frontend/src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 w-full fixed bottom-0 left-0 z-40" >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Branding */}
        <div className="w-full md:w-auto text-right md:text-left">
          <h3 className="text-lg font-semibold text-white tracking-wide">
            Sri Nitish
          </h3>
          <p className="text-sm mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right: Optional message */}
        <div className="w-full md:w-auto mt-2 md:mt-0 text-right md:text-right text-sm italic text-gray-500">
          Designed and Developed ❤️ using MERN
        </div>
      </div>
    </footer>
  );
}
