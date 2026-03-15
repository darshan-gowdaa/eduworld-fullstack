import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, GraduationCap, Users, Star, BookOpen, Award, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CallToAction from '../components/common/CallToAction';
import HeroSection from '../components/common/HeroSection';

// Shadcn UI Components
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'computer-science', name: 'Computer Science', icon: BookOpen },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'engineering', name: 'Engineering', icon: Award },
    { id: 'arts', name: 'Arts & Humanities', icon: Heart },
    { id: 'sciences', name: 'Sciences', icon: GraduationCap }
  ];

  const courses = [
    {
      id: 1,
      title: 'Bachelor of Computer Science',
      category: 'computer-science',
      duration: '4 years',
      students: 450,
      rating: 4.8,
      price: 150000,
      originalPrice: 180000,
      description: 'Comprehensive program covering software development, algorithms, and computer systems with hands-on projects.',
      features: ['Industry Projects', 'AI/ML Focus', 'Internship Program'],
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Popular',
      level: 'Undergraduate'
    },
    {
      id: 2,
      title: 'Master of Business Administration',
      category: 'business',
      duration: '2 years',
      students: 320,
      rating: 4.9,
      price: 200000,
      originalPrice: 220000,
      description: 'Advanced business management program with focus on leadership, strategy, and global business perspectives.',
      features: ['Case Studies', 'Global Exposure', 'Startup Incubation'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Premium',
      level: 'Postgraduate'
    },
    {
      id: 3,
      title: 'Bachelor of Mechanical Engineering',
      category: 'engineering',
      duration: '4 years',
      students: 280,
      rating: 4.7,
      price: 170000,
      originalPrice: 190000,
      description: 'Engineering fundamentals with hands-on projects, industry collaboration, and cutting-edge research.',
      features: ['Lab Access 24/7', 'Industry Mentors', 'Research Projects'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Accredited',
      level: 'Undergraduate'
    },
    {
      id: 4,
      title: 'Bachelor of Arts in English',
      category: 'arts',
      duration: '4 years',
      students: 180,
      rating: 4.6,
      price: 90000,
      originalPrice: 100000,
      description: 'Explore literature, creative writing, critical thinking, and develop strong communication skills.',
      features: ['Creative Writing', 'Literary Analysis', 'Media Studies'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Acclaimed',
      level: 'Undergraduate'
    },
    {
      id: 5,
      title: 'Bachelor of Science in Biology',
      category: 'sciences',
      duration: '4 years',
      students: 220,
      rating: 4.8,
      price: 120000,
      originalPrice: 140000,
      description: 'Study living organisms, genetics, ecology, and their interactions with advanced laboratory experience.',
      features: ['Modern Labs', 'Field Studies', 'Research Opportunities'],
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Research Lab',
      level: 'Undergraduate'
    },
    {
      id: 6,
      title: 'Master of Data Science',
      category: 'computer-science',
      duration: '2 years',
      students: 150,
      rating: 4.9,
      price: 180000,
      originalPrice: 200000,
      description: 'Advanced analytics, machine learning, and AI for data-driven decision making in modern businesses.',
      features: ['Big Data Analytics', 'Machine Learning', 'Industry Capstone'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'New',
      level: 'Postgraduate'
    }
  ];

  const toggleFavorite = (e, courseId) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(courseId)) {
      newFavorites.delete(courseId);
    } else {
      newFavorites.add(courseId);
    }
    setFavorites(newFavorites);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'students': return b.students - a.students;
      default: return b.rating - a.rating;
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleApplyNowClick = (e) => {
    e.stopPropagation();
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Refined Minimal Hero */}
      <HeroSection
        title="Discover Your Future"
        subtitle="Academic Excellence"
        description="Transform your potential into expertise with our world-class, globally recognized programs."
        buttons={[]}
      />

      {/* Clean Filters */}
      <section className="py-8 bg-background/80 backdrop-blur-xl border-y border-border sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
            {/* Minimal Search Line */}
            <div className="relative w-full xl:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-full bg-secondary/50 border-transparent focus-visible:ring-primary/50"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-nowrap overflow-x-auto w-full xl:w-auto hide-scrollbar gap-2 touch-pan-x pb-2 xl:pb-0 scroll-smooth">
              {categories.map(category => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center shrink-0 gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      isSelected
                        ? 'bg-foreground text-background border-foreground shadow-sm hover:opacity-90'
                        : 'bg-background text-muted-foreground border-border hover:border-border/80 hover:bg-secondary'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-4 py-2 bg-background border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer appearance-none hover:bg-secondary transition-colors"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233f3f46'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem', paddingRight: '2.5rem' }}
              >
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="students">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {filteredCourses.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center py-24 bg-background rounded-3xl border border-border shadow-sm max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">No programs found</h3>
              <p className="text-muted-foreground mb-8 max-w-sm">We couldn't find any courses matching your current filters. Try adjusting your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map(course => (
                <motion.div 
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  onClick={() => navigate('/register')}
                >
                  <Card className="h-full flex flex-col overflow-hidden bg-background border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    {/* Image Section */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground border border-border/50 shadow-sm">
                        {course.badge}
                      </div>
                      <button
                        onClick={(e) => toggleFavorite(e, course.id)}
                        className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-md rounded-full shadow-sm hover:bg-background transition-colors border border-border/50"
                      >
                        <Heart className={`h-4 w-4 ${favorites.has(course.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      </button>
                    </div>

                    <CardHeader className="p-6 pb-0">
                      <div className="flex items-center justify-between mb-3 text-xs font-medium text-muted-foreground">
                        <span className="uppercase tracking-wider px-2 py-0.5 bg-secondary rounded-full">{course.level}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-foreground font-semibold">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 pt-4 flex-1 flex flex-col">
                      <CardDescription className="text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                        {course.description}
                      </CardDescription>

                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-6 pt-6 border-t border-border">
                        <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.duration}</div>
                        <div className="flex items-center gap-1.5"><Users className="h-4 w-4" />{course.students}</div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex items-end justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground/60 line-through mb-0.5">{formatPrice(course.originalPrice)}</div>
                        <div className="text-2xl font-bold tracking-tight text-foreground">{formatPrice(course.price)}</div>
                      </div>
                      
                      <button 
                        onClick={handleApplyNowClick}
                        className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center shadow-sm"
                      >
                        Apply
                        <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Modern Call to Action */}
      <CallToAction
        title="Ready to Secure Your Future?"
        description="Join thousands of successful graduates who started their journey with us. Applications for the next intake are open now."
        primaryBtn={{ text: 'Start Application', href: '/register', icon: <ArrowRight className="ml-2 w-4 h-4 transition-transform" /> }}
        secondaryBtn={{ text: 'Contact Admission', href: '/contact', icon: null }}
        showTrust={false}
        gradient="bg-secondary/30 border-t border-border"
      />
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Courses;