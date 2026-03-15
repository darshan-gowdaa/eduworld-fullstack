import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import HeroSection from '../components/common/HeroSection';
import { showToast } from '../components/ui/Toast';
import api from '../utils/api';

// Shadcn UI components
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast.error('Please fix the errors in the form before submitting.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const payload = {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        phone: formData.phone,
        course: formData.subject,
        message: formData.message,
        preferredContact: formData.preferredContact,
        urgency: formData.urgency
      };
      
      const response = await api.post('/api/enquiries', payload);
      if (response.status !== 200 && response.status !== 201) throw new Error('Failed to send enquiry');

      showToast.success("Message sent successfully! We'll get back to you soon.");
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
    } catch (error) {
      showToast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      subtitle: 'Call us directly',
      info: '+91 9876543210',
      subInfo: 'WhatsApp Available',
      action: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email',
      subtitle: 'Send us a message',
      info: 'dummy@email.com',
      subInfo: 'Response within 24hrs',
      action: 'mailto:dummy@email.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      subtitle: 'Visit our campus',
      info: 'Nagasandra, Bengaluru',
      subInfo: 'Karnataka - 560073',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Hours',
      subtitle: 'We\'re available',
      info: 'Mon-Fri: 9AM-6PM',
      subInfo: 'Sat: 10AM-4PM',
      action: null
    }
  ];

  const faqs = [
    {
      question: 'How quickly will I receive a response?',
      answer: 'We typically respond to inquiries within 2 hours during business hours and within 24 hours on weekends.'
    },
    {
      question: 'Can I schedule a campus visit?',
      answer: 'Yes! Contact us to schedule a personalized campus tour. We offer both in-person and virtual tour options.'
    },
    {
      question: 'What information should I include in my inquiry?',
      answer: 'Please include your program of interest, preferred start date, and any specific questions you have about admissions or academics.'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <HeroSection
        title="Get In Touch"
        subtitle="Contact Us"
        description="We're here to help you take the next step in your educational journey. Reach out and let's start a conversation."
        buttons={[]}
      />

      {/* Clean Contact Methods Cards */}
      <section className="py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Multiple ways to connect.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Choose the communication method that works best for you and our team will be ready to assist.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="group relative">
                <div className={`bg-background rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center h-full hover:border-primary/50`}>
                  <div className={`bg-secondary rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all text-foreground`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{method.subtitle}</p>
                  
                  {method.title !== 'Hours' && (
                    <div className="mb-6 flex-1 flex flex-col justify-center">
                      <p className="font-semibold text-foreground mb-1">{method.info}</p>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{method.subInfo}</p>
                    </div>
                  )}

                  {method.action && method.action !== '#' ? (
                    <a
                      href={method.action}
                      className="inline-flex flex-1 items-end justify-center w-full mt-auto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                        Connect Now
                      </span>
                    </a>
                  ) : method.title === 'Address' ? (
                    <button className="inline-flex flex-1 items-end justify-center w-full mt-auto cursor-not-allowed opacity-50" disabled>
                      <span className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-secondary text-foreground">
                        View on Map
                      </span>
                    </button>
                  ) : method.title === 'Hours' ? (
                    <div className="mt-auto mb-2 flex flex-col items-center flex-1 justify-end w-full">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border mb-2 w-full justify-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">Mon-Fri: 9AM-6PM</span>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Sat: 10AM-4PM</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Minimal Contact Form */}
            <div className="bg-background rounded-[2rem] p-8 md:p-12 shadow-sm border border-border">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Send us a message</h2>
              <p className="text-muted-foreground mb-10 text-lg">Allow us to assist you with any inquiries you may have regarding our programs.</p>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground">First Name</label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'border-destructive focus-visible:ring-destructive/20' : ''}
                      placeholder="Jane"
                    />
                    {errors.firstName && (<p className="text-xs text-destructive font-medium">{errors.firstName}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground">Last Name</label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'border-destructive focus-visible:ring-destructive/20' : ''}
                      placeholder="Doe"
                    />
                    {errors.lastName && (<p className="text-xs text-destructive font-medium">{errors.lastName}</p>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-destructive focus-visible:ring-destructive/20' : ''}
                      placeholder="jane@example.com"
                    />
                    {errors.email && (<p className="text-xs text-destructive font-medium">{errors.email}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone Number</label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-destructive focus-visible:ring-destructive/20' : ''}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (<p className="text-xs text-destructive font-medium">{errors.phone}</p>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${errors.subject ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input'}`}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem', paddingRight: '2rem' }}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Admissions</option>
                      <option value="academic">Academic Programs</option>
                      <option value="financial">Financial Aid</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (<p className="text-xs text-destructive font-medium">{errors.subject}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="urgency" className="block text-sm font-medium text-foreground">Priority Level</label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem', paddingRight: '2rem' }}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">Preferred Contact Method</label>
                  <div className="flex flex-wrap gap-4">
                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors w-32 ${formData.preferredContact === 'email' ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary'}`}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-border focus:ring-primary accent-primary"
                      />
                      <span className="ml-2 flex items-center text-sm font-medium text-foreground">
                        <Mail className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        Email
                      </span>
                    </label>
                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors w-32 ${formData.preferredContact === 'phone' ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary'}`}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-border focus:ring-primary accent-primary"
                      />
                      <span className="ml-2 flex items-center text-sm font-medium text-foreground">
                        <Phone className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        Phone
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`flex min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input'}`}
                    placeholder="How can we help you?"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-xs text-destructive font-medium">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <p className="text-xs text-muted-foreground font-medium">
                      {formData.message.length}/500
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-base font-medium h-12"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar info block */}
            <div className="space-y-6">
              {/* FAQ Section */}
              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group border border-border rounded-xl bg-secondary/50 overflow-hidden">
                      <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-sm text-foreground hover:bg-secondary transition-colors">
                        {faq.question}
                        <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="p-4 pt-0 text-sm text-muted-foreground bg-secondary/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Quick Support directly as modern card map */}
              <div className="bg-foreground rounded-3xl p-8 text-background relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight mb-3">Live Support</h3>
                  <p className="text-muted mb-8 text-sm leading-relaxed">
                    Need an immediate response? Our enrollment advisors are online and ready to guide you.
                  </p>
                  <div className="space-y-3">
                    <a href="tel:+919876543210" className="flex items-center bg-background/10 hover:bg-background/20 border border-background/10 p-4 rounded-xl transition-colors group">
                      <div className="bg-background/10 p-2 rounded-lg mr-4">
                        <Phone className="h-5 w-5 text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-background">Call Advisor</div>
                        <div className="text-xs text-background/70 mt-0.5">Available 9am - 6pm EST</div>
                      </div>
                    </a>
                    <a href="https://wa.me/919876543210" className="flex items-center bg-background/10 hover:bg-background/20 border border-background/10 p-4 rounded-xl transition-colors group">
                      <div className="bg-background/10 p-2 rounded-lg mr-4">
                        <MessageCircle className="h-5 w-5 text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-background">Chat on WhatsApp</div>
                        <div className="text-xs text-background/70 mt-0.5">Typical response: 5 mins</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Call to Action */}
      <CallToAction
        title="Ready to Start Your Journey?"
        description="Contact our admissions team to learn more about our programs and begin your application process."
        primaryBtn={{ text: 'Apply Now', href: '/register', icon: <ArrowRight className="ml-2 w-4 h-4 transition-transform" /> }}
        secondaryBtn={{ text: 'Explore Courses', href: '/courses', icon: null }}
        showTrust={false}
        gradient="bg-background border-t border-border"
      />
    </div>
  );
};

export default Contact;