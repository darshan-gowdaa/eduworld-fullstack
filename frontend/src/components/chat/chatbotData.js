// Chatbot predefined texts, responses, and suggestions for EduWorld (Indian context)

export const initialBotMessage = {
  id: 1,
  type: "bot",
  text: `Hello! 👋 Welcome to EduWorld. I'm here to help you with information about our courses, admissions, fees, and more. How can I assist you today?`,
  timestamp: new Date(),
  rating: null,
};

export const quickReplies = [
  "Course information",
  "Admission process",
  "Fee structure",
  "Scholarship details",
  "Campus facilities",
  "Contact information",
];

export const responses = {
  course: {
    text: `We offer a comprehensive range of courses including:\n\n🎓 Undergraduate Programs:\n• B.Tech (Computer Science & Engineering)\n• BBA (Business Administration)\n• B.E. (Mechanical Engineering)\n• B.A. (Arts & Literature)\n• B.Sc. (Sciences)\n\n🎓 Postgraduate Programs:\n• MBA\n• M.Tech\n• M.Sc\n• Ph.D Programmes\n\nEach programme combines practical skills with theoretical knowledge. Would you like details about any specific programme?`,
    suggestions: [
      "B.Tech Computer Science",
      "MBA programme details",
      "Engineering courses",
      "Arts & Science programs",
    ],
  },
  apply: {
    text: `Here's how to apply to EduWorld:\n\n📝 Application Process:\n1. Fill out our online application form\n2. Submit required documents (marksheets, ID proof)\n3. Pay application fee (₹4,000)\n4. Attend virtual/in-person interview\n5. Receive admission decision\n\n⏰ Timeline: Usually 2-3 weeks after submission\n\nWould you like me to guide you through any specific step?`,
    suggestions: [
      "Required documents list",
      "Application fee payment",
      "Interview preparation",
      "Application deadlines",
    ],
  },
  fee: {
    text: `💰 Tuition Fees Structure:\n\n🎓 Undergraduate Programmes:\n• B.Tech (Computer Science): ₹2,00,000/year\n• BBA: ₹1,80,000/year\n• B.E. (Engineering): ₹2,20,000/year\n• B.A./B.Sc.: ₹1,50,000/year\n\n🎓 Postgraduate Programmes:\n• MBA: ₹3,50,000/year\n• M.Tech: ₹2,80,000/year\n• M.Sc: ₹2,50,000/year\n\n💡 Good News: We offer scholarships up to 70% fee waiver!\n\nWould you like to know about scholarship opportunities?`,
    suggestions: [
      "Scholarship opportunities",
      "Payment plan options",
      "Financial aid details",
      "Fee breakdown by semester",
    ],
  },
  contact: {
    text: `📞 Get in Touch with EduWorld:\n\n📱 Phone: +91 9876543210 (WhatsApp available)\n📧 Email: dummy@email.com\n📍 Address: Nagasandra, Bengaluru - 560073\n\n🕒 Office Hours:\n• Monday - Friday: 9:00 AM - 6:00 PM\n• Saturday: 10:00 AM - 4:00 PM\n• Sunday: Closed\n\n🚀 Quick Response: WhatsApp is the fastest way to reach us!`,
    suggestions: [
      "WhatsApp contact",
      "Email support",
      "Campus visit",
      "Schedule consultation",
    ],
  },
  admission: {
    text: `🎯 Admission Requirements:\n\n🎓 For Undergraduate:\n• 10+2 (minimum 75%)\n• JEE/State CET scores (if applicable)\n• English proficiency (if required)\n• 2 recommendation letters\n• Personal statement\n\n🎓 For Postgraduate:\n• Bachelor's degree (minimum 60%)\n• GATE/CAT/MAT scores (if applicable)\n• Work experience (preferred)\n• 3 recommendation letters\n• Statement of purpose\n\n🌍 International Students: Additional visa documentation required.`,
    suggestions: [
      "English proficiency requirements",
      "Required documents checklist",
      "International student admission",
      "Entrance exam scores",
    ],
  },
  scholarship: {
    text: `🏆 Scholarship Opportunities:\n\n🥇 Merit-Based Scholarships:\n• Excellence Award: Up to 70% tuition waiver\n• Dean's List: Up to 50% tuition waiver\n• Academic Achievement: Up to 30% tuition waiver\n\n🤝 Need-Based Scholarships:\n• Financial Support: Up to 60% tuition waiver\n• Community Service: Up to 40% tuition waiver\n\n⭐ Special Scholarships:\n• Sports Excellence: Up to 50% tuition waiver\n• Arts & Culture: Up to 40% tuition waiver\n\n📝 Application: Separate scholarship application required.`,
    suggestions: [
      "Merit scholarship criteria",
      "Need-based aid application",
      "Sports scholarship details",
      "Scholarship application process",
    ],
  },
  campus: {
    text: `🏫 Our Beautiful Campus:\n\n📚 Academic Facilities:\n• Modern classrooms with smart boards\n• State-of-the-art laboratories\n• Digital library with 1,00,000+ books\n• Research centres\n\n🎮 Student Life:\n• Sports complex with gym & pool\n• Student centre with cafeteria\n• Recreation areas & gaming zones\n• Beautiful gardens & study spaces\n\n🏠 Accommodation:\n• On-campus hostels (AC & non-AC)\n• Wi-Fi throughout campus\n• 24/7 security\n\n🎥 Would you like a virtual campus tour?`,
    suggestions: [
      "Virtual campus tour",
      "Hostel accommodation details",
      "Sports facilities tour",
      "Library virtual visit",
    ],
  },
  faculty: {
    text: `👨‍🏫 Meet Our Faculty:\n\n🎓 Qualifications:\n• 95% hold Ph.D degrees\n• Average 12+ years teaching experience\n• Industry professionals & researchers\n• Published authors & consultants\n\n📖 Teaching Approach:\n• Interactive learning methods\n• Practical project-based learning\n• Individual mentoring\n• Industry case studies\n\n🤝 Student Support:\n• Regular office hours\n• Academic counselling\n• Research guidance\n• Career mentoring`,
    suggestions: [
      "Faculty profiles & expertise",
      "Research opportunities",
      "Mentoring programs",
      "Teaching methodology",
    ],
  },
  deadline: {
    text: `📅 Important Deadlines:\n\n📚 Academic Year 2024-25:\n• Early Decision: 1st November 2024\n• Regular Decision: 1st March 2025\n• Late Application: 15th May 2025 (limited seats)\n\n💡 Note: Early applications get priority for scholarships!`,
    suggestions: [
      "Early decision benefits",
      "Late application process",
      "Scholarship deadlines",
      "Document submission timeline",
    ],
  },
  housing: {
    text: `🏠 Housing Options:\n\n🏢 On-Campus Housing:\n• Single rooms: ₹8,000/month\n• Shared rooms: ₹5,000/month\n• Apartment-style living: ₹10,000/month\n• All utilities included\n\n🏡 Amenities:\n• Wi-Fi & cable TV\n• Laundry facilities\n• Common areas & kitchens\n• 24/7 security\n\n🏘️ Off-Campus Assistance:\n• Housing office support\n• Verified landlord database\n• Roommate matching service\n• Transportation info\n\n🔑 Booking: Housing applications open in March!`,
    suggestions: [
      "Room types & pricing",
      "Housing amenities details",
      "Off-campus housing options",
      "Housing booking process",
    ],
  },
  internship: {
    text: `💼 Internship & Career Support:\n\n🤝 Industry Partners:\n• 200+ companies for internships\n• Top MNCs: Infosys, TCS, Wipro, Google, Microsoft\n• Local startups & established firms\n• Government organisations\n\n🎯 Career Services:\n• Resume building workshops\n• Mock interview sessions\n• Networking events\n• Job fair participation\n\n📊 Success Rate:\n• 95% students get internships\n• 85% receive job offers\n• Average salary: ₹4.5–6.5 LPA\n\n🎯 Placement Support: Dedicated career counsellors for each student!`,
    suggestions: [
      "Company partners list",
      "Resume building help",
      "Interview preparation",
      "Salary expectations",
    ],
  },
  job: {
    text: `💼 Career Opportunities & Placement:\n\n📈 Placement Statistics:\n• 92% placement rate\n• Average package: ₹5.5 LPA\n• Highest package: ₹12 LPA\n• 150+ recruiting companies\n\n🏢 Top Recruiters:\n• Technology: Infosys, TCS, Wipro, Google, Microsoft\n• Finance: HDFC, ICICI, SBI\n• Consulting: Deloitte, KPMG, EY\n• Healthcare: Apollo, Fortis\n\n🤝 Career Support:\n• Lifetime career services\n• Alumni network access\n• Professional development workshops\n• Industry mentorship programmes\n\n🚀 Success Guarantee: We're committed to your career success!`,
    suggestions: [
      "Top recruiting companies",
      "Salary package details",
      "Alumni network access",
      "Career support services",
    ],
  },
  // New response categories
  btech: {
    text: `🎓 B.Tech (Computer Science & Engineering):\n\n📚 Program Overview:\n• Duration: 4 years (8 semesters)\n• Total Credits: 160\n• Specializations: AI/ML, Cybersecurity, Data Science\n\n📖 Curriculum Highlights:\n• Core CS subjects\n• Programming languages (Python, Java, C++)\n• Database management\n• Web development\n• Cloud computing\n• Machine learning\n\n💼 Career Prospects:\n• Software Developer\n• Data Scientist\n• AI Engineer\n• Cybersecurity Analyst\n• Full Stack Developer\n\n💰 Fee: ₹2,00,000/year\n\nWould you like to know about admission requirements or placement statistics?`,
    suggestions: [
      "Admission requirements",
      "Placement statistics",
      "Curriculum details",
      "Specialization options",
    ],
  },
  mba: {
    text: `🎓 MBA Program:\n\n📚 Program Overview:\n• Duration: 2 years (4 semesters)\n• Total Credits: 120\n• Specializations: Finance, Marketing, HR, Operations\n\n📖 Curriculum Highlights:\n• Core business subjects\n• Case study methodology\n• Industry projects\n• International exposure\n• Leadership development\n\n💼 Career Prospects:\n• Business Analyst\n• Marketing Manager\n• HR Manager\n• Financial Analyst\n• Operations Manager\n\n💰 Fee: ₹3,50,000/year\n\nWould you like to know about admission criteria or placement opportunities?`,
    suggestions: [
      "Admission criteria",
      "Specialization details",
      "Placement opportunities",
      "Industry partnerships",
    ],
  },
  documents: {
    text: `📋 Required Documents for Application:\n\n🎓 Undergraduate Programs:\n• 10th & 12th mark sheets\n• Transfer certificate\n• Character certificate\n• Caste certificate (if applicable)\n• Income certificate (for scholarship)\n• Passport size photographs\n• ID proof (Aadhar/PAN)\n\n🎓 Postgraduate Programs:\n• Bachelor's degree certificate\n• All semester mark sheets\n• Transfer certificate\n• Character certificate\n• Work experience certificate (if any)\n• Recommendation letters\n• Statement of purpose\n• ID proof\n\n🌍 International Students:\n• Passport copy\n• Visa documents\n• English proficiency certificate\n• Financial statements\n\n📝 Note: All documents should be self-attested copies.`,
    suggestions: [
      "Document submission process",
      "Document verification",
      "International student documents",
      "Scholarship documents",
    ],
  },
  payment: {
    text: `💳 Payment Options & Plans:\n\n💰 Application Fee: ₹4,000 (one-time)\n\n📊 Tuition Fee Payment Plans:\n\nOption 1: Full Payment\n• 5% discount on total fee\n• Pay entire year's fee upfront\n\nOption 2: Semester-wise\n• Pay ₹1,00,000 per semester\n• 2 installments per year\n\nOption 3: Monthly Installments\n• Pay ₹16,667 per month\n• 12 installments per year\n• 2% processing fee\n\n💳 Payment Methods:\n• Online banking\n• Credit/Debit cards\n• UPI payments\n• Demand draft\n• Education loans available\n\n🏦 Education Loan Partners:\n• SBI, HDFC, ICICI, Axis Bank\n• Up to 100% fee coverage\n• Low interest rates\n• Easy repayment options`,
    suggestions: [
      "Education loan details",
      "Payment schedule",
      "Online payment process",
      "Fee structure breakdown",
    ],
  },
  virtual: {
    text: `🎥 Virtual Campus Tour:\n\n🏫 Campus Overview:\n• 50-acre modern campus\n• Green environment with gardens\n• State-of-the-art infrastructure\n\n📚 Academic Buildings:\n• 10-story main building\n• Smart classrooms with projectors\n• Computer labs with latest technology\n• Library with study spaces\n• Research laboratories\n\n🎮 Student Facilities:\n• Sports complex with indoor games\n• Swimming pool & gym\n• Cafeteria with multiple cuisines\n• Student lounge areas\n• Gaming zones\n\n🏠 Hostel Facilities:\n• Separate blocks for boys & girls\n• AC & non-AC options\n• Common dining halls\n• Recreation rooms\n• 24/7 security\n\n🚗 Transportation:\n• College bus service\n• Metro connectivity\n• Parking facilities\n\nWould you like to schedule a live virtual tour or visit in person?`,
    suggestions: [
      "Schedule live tour",
      "Hostel virtual tour",
      "Sports facilities tour",
      "Library virtual visit",
    ],
  },
  english: {
    text: `🌍 English Proficiency Requirements:\n\n📚 For Undergraduate Programs:\n• IELTS: 6.0 overall (minimum 5.5 in each band)\n• TOEFL: 80 overall\n• PTE: 50 overall\n• Duolingo: 95 overall\n\n📚 For Postgraduate Programs:\n• IELTS: 6.5 overall (minimum 6.0 in each band)\n• TOEFL: 90 overall\n• PTE: 58 overall\n• Duolingo: 105 overall\n\n📝 Exemptions:\n• Students from English-medium schools\n• Previous degree in English\n• Work experience in English-speaking environment\n\n🎯 English Support:\n• Pre-sessional English courses\n• English language lab\n• Conversation practice sessions\n• Academic writing workshops\n\n⏰ Test Validity: 2 years from test date`,
    suggestions: [
      "English preparation courses",
      "Test booking assistance",
      "English support programs",
      "Exemption criteria",
    ],
  },
  international: {
    text: `🌍 International Student Admission:\n\n📋 Additional Requirements:\n• Valid passport (minimum 6 months validity)\n• Student visa (F-1 category)\n• Financial statements (minimum ₹15,00,000)\n• Health insurance coverage\n• Medical fitness certificate\n\n📚 Academic Requirements:\n• Equivalent qualification recognition\n• English proficiency scores\n• Academic transcripts evaluation\n• Recommendation letters\n\n💰 International Student Fees:\n• Tuition: 1.5x domestic fee\n• Hostel: ₹12,000/month\n• Health insurance: ₹15,000/year\n• Other expenses: ₹50,000/year\n\n🏠 International Student Support:\n• Airport pickup service\n• Orientation program\n• Cultural integration support\n• Dedicated international office\n• 24/7 emergency support\n\n📅 Application Deadlines:\n• Fall semester: 1st May\n• Spring semester: 1st November`,
    suggestions: [
      "Visa application help",
      "Financial requirements",
      "International student support",
      "Application timeline",
    ],
  },
};

export const keywordMap = {
  course: [
    "course",
    "program",
    "degree",
    "study",
    "curriculum",
    "subject",
    "bachelor",
    "master",
    "phd",
  ],
  apply: [
    "apply",
    "application",
    "admission",
    "enroll",
    "register",
    "join",
    "admission process",
  ],
  fee: [
    "fee",
    "cost",
    "price",
    "tuition",
    "expensive",
    "money",
    "payment",
    "fees",
    "payment plan",
  ],
  contact: [
    "contact",
    "phone",
    "email",
    "address",
    "reach",
    "call",
    "whatsapp",
  ],
  scholarship: [
    "scholarship",
    "financial aid",
    "grant",
    "funding",
    "discount",
    "merit",
    "need-based",
  ],
  campus: [
    "campus",
    "facility",
    "building",
    "infrastructure",
    "library",
    "hostel",
    "accommodation",
  ],
  faculty: ["faculty", "teacher", "professor", "staff", "instructor", "mentor"],
  deadline: ["deadline", "date", "when", "timeline", "schedule", "last date"],
  housing: ["housing", "hostel", "accommodation", "room", "stay", "residence"],
  internship: ["internship", "placement", "job", "career", "work", "training"],
  job: [
    "job",
    "employment",
    "career",
    "salary",
    "placement",
    "recruit",
    "package",
  ],
  btech: [
    "btech",
    "b.tech",
    "computer science",
    "engineering",
    "cse",
    "computer engineering",
  ],
  mba: ["mba", "business", "management", "business administration"],
  documents: [
    "document",
    "documents",
    "certificate",
    "marksheet",
    "id proof",
    "required",
  ],
  payment: ["payment", "installment", "loan", "education loan", "emi", "pay"],
  virtual: ["virtual", "tour", "campus tour", "visit", "see campus"],
  english: ["english", "ielts", "toefl", "language", "proficiency", "pte"],
  international: [
    "international",
    "foreign",
    "visa",
    "passport",
    "overseas",
    "abroad",
  ],
};
