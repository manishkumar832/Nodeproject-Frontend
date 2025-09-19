// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function FrontPage() {
//   const navigate = useNavigate();

//   const handleNavigation = () => {
//     const role = localStorage.getItem("role"); 
//     const token = localStorage.getItem("token");

//     if (!token || !role) {
      
//       navigate("/login");
//     } else if (role === "jobseeker") {
//       navigate("/jobs");
//     } else if (role === "employee") {
//       navigate("/manage-jobs");
//     }
//   };

//   return (
//     <div className="min-h-screen max-w-screen bg-gray-50 flex flex-col pt-16 overflow-x-hidden">
      
//       <header className="bg-gradient-to-l from-white to-indigo-700 text-white py-24 text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold">
//           Find Your Next Opportunity with{" "}
//           <span className="text-yellow-300">NextHire</span>
//         </h1>
//         <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
//           Discover the latest job openings and connect with top employers around
//           the world.
//         </p>
//         <div className="mt-8">
//           <button
//             onClick={handleNavigation}
//             className="px-8 py-3 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition font-semibold"
//           >
//             Browse Jobs
//           </button>
//         </div>
//       </header>

  
//       <section className="py-16 px-6 md:px-20 bg-white text-center">
//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
//             <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
//             <p className="mt-2 text-gray-600">Active Job Listings</p>
//           </div>
//           <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
//             <h3 className="text-3xl font-bold text-blue-600">5K+</h3>
//             <p className="mt-2 text-gray-600">Employers</p>
//           </div>
//           <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
//             <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
//             <p className="mt-2 text-gray-600">Job Seekers</p>
//           </div>
//         </div>
//       </section>

  
//       <section className="py-16 bg-gray-50 text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">
//           Explore Job Categories
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {["IT & Software", "Marketing", "Finance", "Design"].map(
//             (category) => (
//               <button
//                 key={category}
//                 onClick={handleNavigation}
//                 className="p-6 bg-white rounded-lg shadow hover:bg-blue-50 hover:shadow-md transition font-medium cursor-pointer"
//               >
//                 {category}
//               </button>
//             )
//           )}
//         </div>
//       </section>

//       <footer className="py-6 bg-gray-900 text-gray-400 text-center">
//         © {new Date().getFullYear()} NextHire. All rights reserved.
//       </footer>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaGoogle, 
  FaMicrosoft, 
  FaAmazon, 
  FaApple, 
  FaFacebook, 
  FaTwitter,
  FaUber,
  FaAirbnb,
  FaSpotify,
  FaSlack,
  FaShopify,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaWhatsapp,
  FaGitlab,
  FaReddit,
  FaSkype
} from "react-icons/fa";

export default function FrontPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "NextHire helped me find my dream job in just two weeks! The process was smooth and efficient.",
      author: "Sarah Johnson",
      role: "Software Engineer at TechCorp"
    },
    {
      id: 2,
      text: "As a recruiter, NextHire has simplified our hiring process and connected us with quality candidates.",
      author: "Michael Chen",
      role: "HR Director at InnovateCo"
    },
    {
      id: 3,
      text: "The platform is intuitive and the job matches are incredibly accurate. Highly recommended!",
      author: "Jessica Williams",
      role: "Marketing Specialist at BrandWorks"
    }
  ];

  // Array of company logos with React Icons
  const companyLogos = [
    { id: 1, name: "Google", icon: <FaGoogle className="text-blue-500" /> },
    { id: 2, name: "Microsoft", icon: <FaMicrosoft className="text-blue-600" /> },
    { id: 3, name: "Amazon", icon: <FaAmazon className="text-yellow-500" /> },
    { id: 4, name: "Apple", icon: <FaApple className="text-gray-700" /> },
    { id: 5, name: "YouTube", icon: <FaYoutube className="text-red-600" /> },
    { id: 6, name: "Facebook", icon: <FaFacebook className="text-blue-700" /> },
    { id: 7, name: "Twitter", icon: <FaTwitter className="text-blue-400" /> },
    { id: 8, name: "Uber", icon: <FaUber className="text-gray-800" /> },
    { id: 9, name: "Airbnb", icon: <FaAirbnb className="text-red-500" /> },
    { id: 10, name: "Spotify", icon: <FaSpotify className="text-green-500" /> },
    { id: 11, name: "Slack", icon: <FaSlack className="text-purple-500" /> },
    { id: 12, name: "Shopify", icon: <FaShopify className="text-green-600" /> },
    { id: 13, name: "LinkedIn", icon: <FaLinkedin className="text-blue-600" /> },
    { id: 14, name: "Pinterest", icon: <FaPinterest className="text-red-600" /> },
    { id: 15, name: "Snapchat", icon: <FaSnapchat className="text-yellow-400" /> },
    { id: 16, name: "WhatsApp", icon: <FaWhatsapp className="text-green-500" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNavigation = () => {
    const role = localStorage.getItem("role"); 
    const token = localStorage.getItem("token");

    if (!token || !role) {
      navigate("/login");
    } else if (role === "jobseeker") {
      navigate("/jobs");
    } else if (role === "employee") {
      navigate("/manage-jobs");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-100 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Find Your Next Opportunity with{" "}
            <span className="text-indigo-600">NextHire</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
            Discover the latest job openings and connect with top employers around
            the world.
          </p>
          <div className="mt-8">
            <button
              onClick={handleNavigation}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition font-semibold"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose NextHire?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-indigo-600">10K+</h3>
              <p className="mt-2 text-gray-600">Active Job Listings</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-indigo-600">5K+</h3>
              <p className="mt-2 text-gray-600">Employers</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-indigo-600">50K+</h3>
              <p className="mt-2 text-gray-600">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Carousel */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Trusted by Industry Leaders
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <div 
                  key={`${company.id}-${index}`} 
                  className="inline-flex flex-col items-center justify-center mx-8 px-6 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition min-w-[140px]"
                >
                  <div className="text-4xl mb-2">
                    {company.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-700">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `}</style>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Explore Job Categories
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Browse through our most popular categories and find your perfect match
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["IT & Software", "Marketing", "Finance", "Design", "Healthcare", "Education", "Sales", "Engineering"].map(
              (category) => (
                <button
                  key={category}
                  onClick={handleNavigation}
                  className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:bg-indigo-50 hover:shadow-md transition font-medium cursor-pointer"
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="relative overflow-hidden h-64">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <p className="text-gray-600 text-xl italic">"{testimonial.text}"</p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to take the next step in your career?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through NextHire
          </p>
          <button
            onClick={handleNavigation}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition font-semibold"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <footer className="py-8 bg-gray-800 text-gray-400 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} NextHire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}