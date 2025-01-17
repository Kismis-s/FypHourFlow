import Hourflow from "../assets/Hourflow.png";
import girl from "../assets/girl.jpg";

function LoggedNavbar() {
  return (
    <div className="text-gray-700 font-serif m-0">
      {/* Navigation */}
      <nav className="border-b border-gray-200 flex items-center justify-between px-8 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Hourflow} alt="logo" className="h-16 w-16  ml-4" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-10">
          <li>
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Offers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              About Us
            </a>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="flex items-center space-x-20">
          <form className="h-8 w-64 border border-gray-400 rounded-md flex items-center overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 placeholder-gray-500 text-gray-500 flex-1 border-none outline-none"
            />
            <button type="submit" className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>

          <div className="flex flex-row space-x-14">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9"fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>
          </div>
          <div>
            <img src={girl} alt="profile" className="rounded-full h-10 w-10 mr-8"></img>
          </div>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default LoggedNavbar;
