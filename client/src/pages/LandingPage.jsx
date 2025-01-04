import puzzle from "../assets/puzzle.jpg";
import idea from "../assets/idea.avif";
import Testimonial from "../components/testimonial";
import handleSlide from "../controllers/handleSlide";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function LandingPage() {
  return (
    
    <div className="text-gray-700 font-serif m-0">
      {/* Content Wrapper */}
      <Navbar/>
      <div>
        {/* Main Section */}
        <main className="mt-6">
          {/*sub section*/}
          <section className="mb-6 grid grid-cols-2 gap-8">
            <div className="ml-28">
            <h2 className="text-4xl font-extrabold text-primary text-blue-950 mt-14 leading-10">Empowering Communities,<br />One <span className="text-blue-700">Hour</span> at a Time.</h2>
            <p className="text-lg text-secondary text-gray-500 mt-4"> Empowering individuals to share skills and services and build connections and celebrate mutual support.</p>
            <button className="px-4 py-2 mt-6 bg-blue-950 text-white rounded hover:bg-blue-700">
              Join our Community
            </button>
            </div>
            <div>
                <img src={puzzle} alt="image" className="h-80 w-auto ml-32"></img>
            </div>
          </section>

          {/*sub section*/}
          <section className="mb-6 grid grid-cols-2 gap-6 mt-9 mr-12">
            <div>
                <img src={idea} alt="image" className="h-80 w-auto ml-32"></img>
            </div>
            <div className="ml-16">
            <h2 className="text-4xl font-extrabold text-primary text-blue-950 mt-14 leading-10">Where Time Becomes Currency and <span className="text-blue-700">Skills</span> Build Communities.</h2>
            <p className="text-lg text-secondary text-gray-500 mt-4"> Inspiring individuals to exchange their unique talents, fostering collaboration <br/>and skill-sharing within local communities.</p>
            <button className="px-4 py-2 mt-6 bg-blue-950 text-white rounded hover:bg-blue-700">
              Browse services
            </button>
            </div>
          </section>

          {/* About Us */}
          <section className="py-12">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-blue-950 mb-8">About Us</h2>
    <p className="text-lg text-gray-600 mb-12">
      Welcome to <span className="font-bold text-blue-700">HourFlow</span>, a revolutionary platform dedicated to empowering individuals and fostering meaningful connections within communities. 
      By redefining how we value time and skills, HourFlow encourages collaboration, mutual support, and growth.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
  
      <div className="flex flex-col items-center">
      <div className="bg-blue-100 rounded-full p-6 mb-4">
          <svg
            className="w-10 h-10 text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
            <path d="M10.9 16.3l-3.8-3.8 1.4-1.4 2.4 2.4 4.7-4.7 1.4 1.4z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-blue-950 mb-2">Our Mission</h3>
        <p className="text-gray-700 leading-7 text-wrap">
          To create a community where time is the currency, encouraging members to exchange their skills and services while building lasting relationships.
        </p>
      </div>
  
      <div className="flex flex-col items-center">
      <div className="bg-blue-100 rounded-full p-6 mb-4">
          <svg
            className="w-10 h-10 text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
            <path d="M15 11h-3V8h-2v3H9v2h3v3h2v-3h3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-blue-950 mb-2">Our Vision</h3>
        <p className="text-gray-700 leading-7 text-wrap">
          To inspire a future where communities thrive through shared efforts, valuing time and skills over money, and building trust in local neighborhoods.
        </p>
      </div>
   
      <div className="flex flex-col items-center">
      <div className="bg-blue-100 rounded-full p-6 mb-4">
          <svg
            className="w-10 h-10 text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
            <path d="M12 6a6 6 0 016 6h-6z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-blue-950 mb-2">Why HourFlow?</h3>
        <p className="text-gray-700 leading-7 text-wrap">
          HourFlow is more than a platform—it’s a movement. We focus on building connections, fostering mutual respect, and offering a unique way to contribute to and benefit from your community without financial constraints.
        </p>
      </div>
    </div>
  </div>
</section>

<div>
  {/* Testimonials Section */}
<h2 className="text-4xl font-bold text-blue-950 mb-8 flex justify-center py-7">
  Testimonials
</h2>

<div  id="controls-carousel"className="relative w-full overflow-hidden h-80" data-carousel="static">
  {/* Carousel Wrapper */}
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: "translateX(0%)" }}
    id="carousel-slides"
  >
    {/* Slide 1 */}
    <div className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  ml-8">
      <Testimonial />
      <Testimonial />
      <Testimonial />
      <Testimonial />
    </div>

    {/* Slide 2 */}
    <div className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      <Testimonial />
      <Testimonial />
      <Testimonial />
      <Testimonial />
    </div>
  </div>

  {/* Navigation Buttons */}
  <button
    type="button"
    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    onClick={() => handleSlide("prev")}
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 group-hover:bg-blue-500 group-focus:ring-4 roup-focus:ring-blue-400">
      <svg
        className="w-4 h-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 1 1 5l4 4" />
      </svg>
      <span className="sr-only">Previous</span>
    </span>
  </button>
  <button
    type="button"
    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    onClick={() => handleSlide("next")}
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 group-hover:bg-blue-500 group-focus:ring-4 group-focus:ring-blue-400">
      <svg
        className="w-4 h-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 9l4-4-4-4" />
      </svg>
      <span className="sr-only">Next</span>
    </span>
  </button>
</div>
<div className="mt-7">
  <Footer />
</div>
</div>


        </main>
      </div>
    </div>
  );
}


export default LandingPage;
