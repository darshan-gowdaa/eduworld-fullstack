import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">EduWorld</h3>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Empowering students with quality education and innovative learning experiences. 
              Join us in shaping the future of education.
            </p>
            <div className="flex space-x-5">
              <Link to="#" className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors font-medium">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <Phone className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">contact@eduworld.edu</span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground font-medium max-w-[200px] leading-relaxed group-hover:text-foreground transition-colors">
                  123 Innovation Dr, San Francisco, CA 94105
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border mt-16 pt-8">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} EduWorld. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;