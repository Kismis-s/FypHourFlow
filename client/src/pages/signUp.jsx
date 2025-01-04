import watchs from "../assets/watches.jpg";

function SignUp() {
  return (
    <div>
      <div className="grid grid-cols-[11fr_9fr] h-screen">
        {/* Left Form Section */}
        <div className="flex items-center justify-center font-serif">
            
          <form>
          <h2 className="text-3xl font-bold text-blue-900 py-6">Create Account</h2>
            <div >
                <label for ="name" className="text-lg">Name</label><br></br>
                <input type="text" className="border border-gray-400 text-gray-500 text-base w-96 h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"placeholder="  Enter your name..."></input>
            </div>
            <div >
                <label for ="email" className="text-lg">Email</label><br></br>
                <input type="text" className="border border-gray-400 text-gray-400 text-base w-96 h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"placeholder="  Enter your email..."></input>
            </div>
            <div >
                <label for ="pw" className="text-lg">Password</label><br></br>
                <input type="text" className="border border-gray-400 text-gray-400 text-base w-96 h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"placeholder="  Enter your password..."></input>
            </div>
            <div >
                <label for ="confirm_pw" className="text-lg">Confirm Password</label><br></br>
                <input type="text" className="border border-gray-400 text-gray-400 text-base w-96 h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"placeholder="  Re-enter your password..."></input>
            </div>
            <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900">I agree with the <a href="#" class="text-blue-600 hover:underline ">terms and conditions</a>.</label>
    </div>
          </form>
        </div>

        {/* Right Image Section */}
        <div>
          <img
            src={watchs}
            alt="login/signup pic"
            className="w-full h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
