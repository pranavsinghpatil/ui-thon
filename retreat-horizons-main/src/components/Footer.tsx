
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#71BBB2]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Cormorant_Garamond'] text-white">About</h3>
            <ul className="space-y-2 font-['Montserrat'] text-sm text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Cormorant_Garamond'] text-white">Community</h3>
            <ul className="space-y-2 font-['Montserrat'] text-sm text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">Diversity & Belonging</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Referrals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift cards</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Cormorant_Garamond'] text-white">Host</h3>
            <ul className="space-y-2 font-['Montserrat'] text-sm text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">Host your home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Host an experience</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Responsible hosting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resource center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Cormorant_Garamond'] text-white">Support</h3>
            <ul className="space-y-2 font-['Montserrat'] text-sm text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation options</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Neighborhood support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trust & safety</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-white/80 mb-4 md:mb-0 font-['Montserrat']">
            &copy; {new Date().getFullYear()} HorizonStay, Inc. All rights reserved. (this is a sample project)<br />
            <div className="flex items-center space-x-4 mt-2">
              {/* GitHub Icon */}
              <a
                href="https://github.com/pranavsinghpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fab fa-github text-lg"></i> {/* Using Font Awesome */}
              </a>

              {/* Twitter Icon */}
              <a
                href="https://twitter.com/pranavenv"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>

              {/* Mail Icon */}
              <a
                href="mailto:puneet.pranav04@gmail.com"
                className="hover:text-white"
              >
                <i className="fas fa-envelope text-lg"></i>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-['Montserrat'] text-white/80">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <span>·</span>
            <div className="flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" /> in the universe
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
