// ============================================================
//  EduWorld ChatBot Data  —  Enhanced & Comprehensive Edition
//  Indian education context · keyword-driven · client-side only
// ============================================================

// ─── Opening message ────────────────────────────────────────
export const initialBotMessage = {
  id: 1,
  type: "bot",
  text: `👋 Hello! Welcome to **EduWorld**!\n\nI'm your AI-powered admission assistant, available 24/7 to help you with:\n\n🎓 Course & Program info\n📝 Admissions & Applications\n💰 Fees, Scholarships & Loans\n🏫 Campus Life & Facilities\n💼 Placements & Careers\n\nWhat would you like to explore today?`,
  timestamp: new Date(),
  rating: null,
};

// ─── Initial quick-reply chips ───────────────────────────────
export const quickReplies = [
  "🎓 Explore Courses",
  "📝 How to Apply",
  "💰 Fee Structure",
  "🏆 Scholarships",
  "🏫 Campus Tour",
  "💼 Placements",
];

// ============================================================
//  RESPONSES
//  Each entry: { text: string, suggestions: string[] }
// ============================================================
export const responses = {

  // ── Greeting ──────────────────────────────────────────────
  greeting: {
    text: `👋 Hello! Great to connect with you!\n\nI'm here to make your EduWorld journey smooth and exciting. Whether you're exploring programs, checking admission requirements, or curious about campus life — I've got you covered!\n\nWhat's on your mind today?`,
    suggestions: ["🎓 Explore Courses", "📝 Admission Process", "💰 Fee Structure", "🏫 Campus Tour"],
  },

  // ── Thank you ─────────────────────────────────────────────
  thanks: {
    text: `😊 You're very welcome! I'm always happy to help.\n\nIf you have more questions about EduWorld — admissions, programs, campus life, placements, or anything else — feel free to ask anytime. Good luck with your educational journey! 🌟`,
    suggestions: ["📝 Apply Now", "📞 Contact Admissions", "🏫 Campus Visit", "🎓 View All Courses"],
  },

  // ── Courses (overview) ────────────────────────────────────
  course: {
    text: `🎓 **EduWorld Program Catalog**\n\n━━━ Undergraduate Programs ━━━\n🖥️  B.Tech – Computer Science & Engineering\n💼  BBA – Business Administration\n⚙️  B.E. – Mechanical Engineering\n📖  B.A. – English Literature\n🔬  B.Sc. – Biology / Physics / Chemistry\n🎨  B.Des – Design & Visual Communication\n\n━━━ Postgraduate Programs ━━━\n📊  MBA – Business Administration\n💻  M.Tech – Computer Science\n🧪  M.Sc – Data Science / Biotechnology\n🎓  Ph.D – Research Programs (multiple streams)\n\n━━━ Certification Programs ━━━\n⚡  Full Stack Web Development (6 months)\n🤖  AI & Machine Learning (6 months)\n📈  Digital Marketing & Analytics (3 months)\n\n📌 All programs are UGC-approved and NAAC-accredited.\n\nWant details on a specific program?`,
    suggestions: ["💻 B.Tech CS Details", "📊 MBA Details", "🤖 M.Tech / M.Sc", "📜 Certification Courses"],
  },

  // ── B.Tech CS ─────────────────────────────────────────────
  btech: {
    text: `💻 **B.Tech – Computer Science & Engineering**\n\n📋 Program Overview\n• Duration: 4 years (8 semesters)\n• Credits: 160 | Mode: Full-time\n• Intake: 120 seats per year\n\n🗂️ Specializations (choose in 3rd year)\n   ➤ Artificial Intelligence & ML\n   ➤ Cybersecurity & Ethical Hacking\n   ➤ Cloud Computing & DevOps\n   ➤ Data Science & Big Data\n   ➤ Full Stack Development\n\n📚 Core Curriculum\n• Programming: Python, Java, C++, JavaScript\n• Data Structures & Algorithms\n• Computer Networks & OS\n• Database Management Systems\n• Software Engineering & Agile\n• Machine Learning & Deep Learning\n\n🏆 Highlights\n• Google Developer Student Club chapter\n• Dedicated AI/ML lab with GPU servers\n• Mandatory 6-month industry internship\n• Capstone project with industry mentors\n\n💰 Fee: ₹2,00,000 / year\n📈 Average Package: ₹6.5 LPA | Highest: ₹18 LPA\n\nWould you like admission requirements or placement stats?`,
    suggestions: ["📋 Admission Requirements", "📈 Placement Stats", "🗂️ Specializations", "💰 Scholarships Available"],
  },

  // ── MBA ───────────────────────────────────────────────────
  mba: {
    text: `📊 **MBA – Master of Business Administration**\n\n📋 Program Overview\n• Duration: 2 years (4 semesters)\n• Credits: 120 | Mode: Full-time\n• Intake: 60 seats per year\n\n🗂️ Specializations\n   ➤ Finance & Investment Banking\n   ➤ Marketing & Brand Management\n   ➤ Human Resources & OD\n   ➤ Operations & Supply Chain\n   ➤ Entrepreneurship & Innovation\n   ➤ Business Analytics\n\n📚 Curriculum Highlights\n• Harvard-style case study methodology\n• Live consulting projects with real companies\n• 2-month international exchange (partner universities)\n• Leadership & Communication bootcamp\n• Industry mentor programme (1-on-1)\n\n🏆 Highlights\n• Bloomberg Terminal access in Finance lab\n• Annual startup pitch competition (₹5L prize pool)\n• Alumni network of 3,000+ managers & executives\n\n💰 Fee: ₹3,50,000 / year\n📈 Average Package: ₹9.2 LPA | Highest: ₹22 LPA\n\nElligibility: Bachelor's degree (min. 50%) + CAT/MAT/XAT score`,
    suggestions: ["📋 Eligibility & Documents", "🗂️ Specialization Details", "📈 Placement Record", "💰 Scholarship Info"],
  },

  // ── Engineering ───────────────────────────────────────────
  engineering: {
    text: `⚙️ **Engineering Programs at EduWorld**\n\n🔵 B.E. Mechanical Engineering (4 years)\n• Specializations: Robotics, Thermal, Manufacturing\n• State-of-the-art CNC & 3D printing lab\n• Tie-ups with Bosch, Toyota, L&T\n• Fee: ₹1,90,000 / year\n\n🟢 B.E. Civil Engineering (4 years)\n• Specializations: Structural, Environmental, Urban\n• AutoCAD, STAAD Pro, and BIM labs\n• Live infrastructure projects\n• Fee: ₹1,70,000 / year\n\n🟠 B.E. Electronics & Communication (4 years)\n• Specializations: VLSI, Embedded, IoT\n• Fully equipped PCB & signal processing labs\n• Fee: ₹1,85,000 / year\n\n🔴 M.Tech Computer Science (2 years)\n• Research-oriented with thesis component\n• GATE scholarship available\n• Fee: ₹2,80,000 / year\n\nAll engineering programs are NBA-accredited and eligible for GATE exam pathways.`,
    suggestions: ["⚙️ Mechanical Engineering", "🖥️ M.Tech Details", "📋 Engineering Admission", "💰 Fee & Scholarships"],
  },

  // ── Arts & Sciences ───────────────────────────────────────
  arts: {
    text: `📖 **Arts & Science Programs**\n\n🎨 B.A. – English Literature (3 years)\n• Creative Writing, Journalism & Media, Linguistics\n• Annual literary fest & publishing club\n• Fee: ₹90,000 / year\n\n🔬 B.Sc. – Data Science (3 years) ★ NEW\n• Python, R, SQL, Machine Learning, Stats\n• Industry projects + Internship\n• Fee: ₹1,20,000 / year\n\n🧬 B.Sc. – Biotechnology (3 years)\n• Genomics, Microbiology, Bioinformatics\n• CSIR-affiliated research lab access\n• Fee: ₹1,10,000 / year\n\n🔭 B.Sc. – Physics / Chemistry / Mathematics (3 years)\n• Strong foundation for M.Sc. / IIT-JAM\n• Fee: ₹80,000 / year\n\n🎓 M.Sc. – Data Science / AI (2 years)\n• Industry-partnered curriculum\n• Average package: ₹7.5 LPA\n• Fee: ₹2,50,000 / year`,
    suggestions: ["🔬 B.Sc Data Science", "🧬 Biotechnology", "📚 B.A. English", "📋 Admission Requirements"],
  },

  // ── Admission Process ─────────────────────────────────────
  apply: {
    text: `📝 **How to Apply to EduWorld**\n\n✅ Step-by-Step Process\n\n1️⃣  **Online Registration** (15 min)\n   → Visit eduworld.ac.in → Click "Apply Now"\n   → Create your account with email & phone\n\n2️⃣  **Fill Application Form** (30–45 min)\n   → Personal & academic details\n   → Select program + intake semester\n   → Upload required documents\n\n3️⃣  **Pay Application Fee**\n   → ₹4,000 (non-refundable)\n   → UPI, Net Banking, Credit/Debit card\n\n4️⃣  **Entrance Test / Interview** (if applicable)\n   → Online aptitude test (for UG programs)\n   → Personal interview (for PG programs)\n   → Scheduled within 5 days of form submission\n\n5️⃣  **Merit List & Offer Letter**\n   → Results in 7–10 working days\n   → Offer letter sent via email\n\n6️⃣  **Fee Payment & Enrollment**\n   → Pay first-semester fee to confirm seat\n   → Collect ID & start orientation!\n\n⏱️ Total timeline: ~2–3 weeks from submission`,
    suggestions: ["📋 Required Documents", "📅 Application Deadlines", "💳 Application Fee Info", "❓ Need Help Applying?"],
  },

  // ── Admission requirements ────────────────────────────────
  admission: {
    text: `🎯 **Admission Eligibility Criteria**\n\n━━━ Undergraduate Programs ━━━\n📌 B.Tech / B.E.\n• 10+2 with PCM — minimum **75%** (70% for SC/ST/OBC)\n• JEE Main / State CET score accepted\n• No age bar\n\n📌 BBA / B.A. / B.Sc.\n• 10+2 in any stream — minimum **60%**\n• No entrance test required for most programs\n\n━━━ Postgraduate Programs ━━━\n📌 MBA\n• Bachelor's degree (any stream) — minimum **50%**\n• CAT / MAT / XAT / CMAT score mandatory\n• Work experience preferred but not required\n\n📌 M.Tech / M.Sc.\n• Relevant bachelor's degree — minimum **55%**\n• GATE score (for M.Tech) — scholarship eligible\n• IIT-JAM score (for M.Sc.)\n\n📌 Ph.D.\n• Master's degree — minimum **55%**\n• UGC-NET / GATE qualified preferred\n• Research proposal submission required\n\n━━━ International Students ━━━\n• Equivalent qualification recognised by AIU\n• English proficiency: IELTS 6.0+ / TOEFL 80+\n• Valid student visa required`,
    suggestions: ["📋 Documents Checklist", "🌍 International Admission", "📅 Key Deadlines", "💰 Scholarship for Merit"],
  },

  // ── Fees ──────────────────────────────────────────────────
  fee: {
    text: `💰 **EduWorld Fee Structure 2024–25**\n\n━━━ Undergraduate (per year) ━━━\n🖥️  B.Tech CS / IT              ₹2,00,000\n⚙️  B.E. Mechanical / Civil    ₹1,80,000\n📊  BBA                         ₹1,50,000\n📖  B.A. / B.Sc.                ₹80,000 – ₹1,20,000\n\n━━━ Postgraduate (per year) ━━━\n📊  MBA                         ₹3,50,000\n💻  M.Tech                      ₹2,80,000\n🔬  M.Sc.                       ₹2,50,000\n🎓  Ph.D. (per semester)        ₹75,000\n\n━━━ One-Time Fees ━━━\n📝  Application Fee             ₹4,000 (non-refundable)\n🎓  Admission / Enrollment      ₹15,000\n🪪  Identity & Library Card     ₹2,000\n\n━━━ Additional (optional) ━━━\n🏠  Hostel (AC double room)     ₹8,500 / month\n🍽️  Mess (veg + non-veg)        ₹4,000 / month\n🚌  Campus Bus Pass             ₹2,500 / semester\n\n💡 Up to **70% scholarship** available for merit & need!\n🏦 Education loan tie-up with 8 major banks.`,
    suggestions: ["🏆 Scholarship Details", "🏦 Education Loan Help", "💳 Payment Plans", "💰 Fee Waiver Criteria"],
  },

  // ── Scholarships ──────────────────────────────────────────
  scholarship: {
    text: `🏆 **EduWorld Scholarship Programs**\n\n━━━ Merit-Based Scholarships ━━━\n🥇 Chancellor's Excellence Award\n   • 10+2 / Degree > 95% → **70% fee waiver**\n   • Renewable annually on CGPA ≥ 8.5\n\n🥈 Dean's Merit Scholarship\n   • 85–94.9% marks → **50% fee waiver**\n   • Renewable on CGPA ≥ 7.5\n\n🥉 Academic Achievement Award\n   • 75–84.9% marks → **25% fee waiver**\n   • Renewed semester-by-semester\n\n━━━ Need-Based Scholarships ━━━\n🤝 Financial Assistance Scheme\n   • Family income < ₹3 LPA → up to **60% waiver**\n   • Apply with income certificate + Aadhaar\n\n━━━ Special Category Scholarships ━━━\n🏸 Sports Excellence\n   • National / State level athletes → **50% waiver**\n   • Must maintain CGPA ≥ 6.0\n\n🎨 Arts & Culture\n   • Recognised achievements in music, dance, visual arts\n   • Up to **40% waiver**\n\n👩 Women in STEM\n   • Female students in engineering / data science\n   • **30% additional fee concession**\n\n🏛️ Government Schemes\n   • SC/ST/OBC students: Post-Matric Scholarship\n   • PM Scholarship, NSP portal supported\n\n📅 Scholarship applications close: **March 31, 2025**`,
    suggestions: ["📋 Scholarship Application", "📅 Application Deadline", "🏦 Education Loan", "📞 Contact Scholarship Cell"],
  },

  // ── Campus ────────────────────────────────────────────────
  campus: {
    text: `🏫 **EduWorld Campus — Bengaluru**\n\n📍 Location: Tech Park, Koramangala, Bengaluru – 560034\n   (Near Koramangala Metro Station, 25 miles from Airport)\n\n━━━ Academic Facilities ━━━\n📚  Central Library — 1,00,000+ books, 50+ e-databases\n🖥️  10 Computer Labs — 500+ workstations, 1 Gbps Wi-Fi\n🔬  Research & Innovation Centre\n🤖  Dedicated AI / ML Lab (GPU cluster)\n🧪  Advanced Science Laboratories\n📡  Electronics & Communication Lab\n\n━━━ Student Life ━━━\n🏟️  Sports Complex: cricket, football, basketball, badminton\n🏊  Olympic-size swimming pool + gym\n🎭  Auditorium (1,200 capacity) for cultural events\n🎮  Student Lounge & Gaming Zone\n☕  4 Cafeterias + food courts (veg & non-veg)\n🌿  Landscaped gardens & open-air study areas\n\n━━━ Support Services ━━━\n🏥  24×7 Medical Centre with resident doctor\n🚌  Campus bus service covering 15+ routes\n🔒  24×7 CCTV security & access control\n📶  Gigabit Wi-Fi across entire campus\n♿  Fully accessible buildings (ramps, lifts)\n\n🏠 On-campus hostels for 2,000+ students`,
    suggestions: ["🏠 Hostel Details", "🚌 Transport & Bus Routes", "📅 Schedule a Visit", "🎉 Student Clubs & Events"],
  },

  // ── Hostel / Housing ──────────────────────────────────────
  housing: {
    text: `🏠 **Campus Accommodation Guide**\n\n━━━ Boys' Hostel ━━━\n🛏️  Single AC Room           ₹12,000 / month\n🛏️  Double Sharing AC        ₹8,500 / month\n🛏️  Triple Sharing Non-AC    ₹5,500 / month\n\n━━━ Girls' Hostel ━━━\n🛏️  Single AC Room           ₹13,000 / month\n🛏️  Double Sharing AC        ₹9,000 / month\n🛏️  Triple Sharing Non-AC    ₹6,000 / month\n\n━━━ All Rooms Include ━━━\n✅  High-speed Wi-Fi (100 Mbps per floor)\n✅  Hot water (24×7)\n✅  Study table, chair, wardrobe & cot\n✅  CCTV monitored common areas\n✅  Laundry service (₹500/month extra)\n✅  Common TV & recreation room\n\n━━━ Mess Options ━━━\n🍽️  Veg Mess Plan             ₹3,800 / month\n🍗  Non-Veg Mess Plan        ₹4,500 / month\n🥗  Special Diet (on request) ₹5,000 / month\n\n━━━ Off-Campus Assistance ━━━\n🏘️  Verified PG database (500+ options)\n🤝  Roommate matching service\n📍  Proximity: hostels from ₹6,000/month nearby\n\n🗓️ Hostel applications open with admission offer.\nSeats are limited — apply early!`,
    suggestions: ["🍽️ Mess Menu & Timings", "📋 Hostel Application Process", "🏘️ Off-Campus PGs", "📞 Hostel Warden Contact"],
  },

  // ── Contact ───────────────────────────────────────────────
  contact: {
    text: `📞 **Get in Touch with EduWorld**\n\n━━━ Admissions Office ━━━\n📱  Phone: +91 99000 11223\n📲  WhatsApp: +91 99000 11223 (fastest response)\n📧  Email: admissions@eduworld.in\n🕒  Hours: Mon–Fri 9 AM–6 PM | Sat 10 AM–4 PM\n\n━━━ General Enquiries ━━━\n📧  info@eduworld.in\n📞  +91 80 4123 4567 (landline)\n\n━━━ Campus Address ━━━\n📍  EduWorld University\n    Tech Park, Koramangala,\n    Bengaluru – 560034, Karnataka\n\n━━━ Other Departments ━━━\n🏦  Fees & Finance: finance@eduworld.in\n🏠  Housing Office: housing@eduworld.in\n💼  Placements: placements@eduworld.in\n🏥  Medical Centre: +91 80 4123 4000\n\n🗺️ Nearest Metro: Koramangala Metro Station\n🚌 Bus Routes: 252, 254C, 600\n\n💡 Tip: WhatsApp gives the fastest response — usually within 15 minutes during office hours!`,
    suggestions: ["📧 Email Admissions", "💬 WhatsApp Us", "🗺️ Get Directions", "📅 Book Campus Visit"],
  },

  // ── Placements / Jobs ─────────────────────────────────────
  job: {
    text: `💼 **Placement & Career Services**\n\n━━━ 2023–24 Placement Highlights ━━━\n🎯  Overall Placement Rate: **94%**\n💰  Average Package: **₹7.2 LPA**\n🚀  Highest Package: **₹28 LPA** (International)\n🏢  Companies Visited: **180+**\n🎓  Students Placed: **1,200+**\n\n━━━ Top Recruiters ━━━\n🖥️  Tech: Google, Microsoft, Amazon, Infosys, TCS, Wipro, Accenture, Cognizant\n📊  Finance: HDFC Bank, ICICI, Goldman Sachs, Deloitte\n💡  Startups: Swiggy, Razorpay, CRED, Meesho, Zepto\n🏭  Core: Bosch, L&T, Tata Steel, ISRO (research)\n\n━━━ Career Development Programmes ━━━\n📝  Resume & LinkedIn workshops (every semester)\n🎤  Mock interviews with industry panels\n🧠  Aptitude & coding bootcamps\n🌐  Networking events & alumni connects\n💡  Entrepreneurship cell & startup funding support\n\n━━━ Internship Statistics ━━━\n✅  95% students secure internships\n✅  40% internships convert to PPO\n✅  Average stipend: ₹15,000–₹40,000/month\n\n🤝 Lifetime access to career services — even after graduation!`,
    suggestions: ["🏢 Top Recruiting Companies", "📊 Stream-wise Packages", "🎤 Interview Preparation", "📝 Internship Info"],
  },

  // ── Internships ───────────────────────────────────────────
  internship: {
    text: `🏢 **Internship Programme**\n\n━━━ Programme Structure ━━━\n📅  Duration: 6 months (mandatory for B.Tech / BBA / MBA)\n🗓️  Timing: Semester 7 (July–December)\n🏢  Mode: On-site / Remote / Hybrid\n\n━━━ How It Works ━━━\n1️⃣  Skill Assessment in Semester 5\n2️⃣  Resume & Profile Building (Semester 6)\n3️⃣  Company Shortlisting & Drives (Semester 6–7)\n4️⃣  Internship Execution + Weekly Reports\n5️⃣  Final Presentation + Internship Certificate\n\n━━━ Partner Companies ━━━\n🌟  200+ active company partners\n🌍  Opportunities across Bengaluru, Mumbai, Hyderabad, Pune, Chennai & Remote\n💻  Sectors: IT, Finance, Marketing, Engineering, Research\n\n━━━ Stipend Range ━━━\n💰  IT / Software: ₹20,000–₹60,000/month\n📊  Finance / Analytics: ₹15,000–₹40,000/month\n🎨  Design / Marketing: ₹10,000–₹25,000/month\n⚙️  Core Engineering: ₹12,000–₹30,000/month\n\n✅  40% of interns receive a **Pre-Placement Offer (PPO)**\n✅  Dedicated Internship Coordinator for each department`,
    suggestions: ["📋 Internship Application", "🏢 Company List", "💰 Stipend Details", "📜 Certificate Process"],
  },

  // ── Faculty ───────────────────────────────────────────────
  faculty: {
    text: `👨‍🏫 **EduWorld Faculty — World-Class Educators**\n\n━━━ Faculty Profile ━━━\n🎓  Total Faculty: 250+\n📜  Ph.D. holders: 92%\n📚  Average experience: 14 years\n🏭  Industry professionals: 35%\n📖  Published researchers: 180+\n🌍  International faculty: 15%\n\n━━━ Teaching Philosophy ━━━\n✅  Problem-based & project-based learning\n✅  Flipped classroom model\n✅  Case studies + live industry simulations\n✅  Research integration from Year 1\n\n━━━ Student Support ━━━\n🕒  Open-door policy (2 hrs/day per faculty)\n🧑‍🎓  1 Faculty Mentor per 15 students\n📊  Academic counselling every semester\n🔬  Research guidance for final-year projects\n💼  Career mentoring & reference letters\n\n━━━ Notable Faculty ━━━\n🏅  Dr. Ananya Iyer — AI & NLP (ex-Google Research)\n🏅  Prof. Rajesh Nair — Finance (ex-Goldman Sachs)\n🏅  Dr. Priya Venkat — Biotechnology (CSIR Fellow)\n🏅  Prof. Arjun Das — Entrepreneurship (Founder, 2 startups)\n\n📌 All faculty profiles are available on the EduWorld website.`,
    suggestions: ["📚 Academic Calendar", "🔬 Research Opportunities", "🧑‍🎓 Mentorship Program", "🏅 Distinguished Alumni"],
  },

  // ── Deadlines ─────────────────────────────────────────────
  deadline: {
    text: `📅 **Important Dates — Academic Year 2025–26**\n\n━━━ Application Deadlines ━━━\n⭐ Early Decision Round\n   → Deadline: **15 October 2024**\n   → Benefit: First pick of hostels + scholarship priority\n\n📝 Regular Round\n   → Deadline: **15 February 2025**\n   → Standard admission process\n\n🔁 Late / Spot Admission\n   → Deadline: **30 May 2025** (limited seats only)\n   → Subject to availability\n\n━━━ Scholarship Deadlines ━━━\n🏆 Merit Scholarships: **31 March 2025**\n🤝 Need-Based Aid: **15 April 2025**\n🏸 Sports / Arts Scholarships: **28 February 2025**\n\n━━━ Academic Calendar ━━━\n🏫 Odd Semester Begins: **15 July 2025**\n🏫 Even Semester Begins: **2 January 2026**\n🎓 Convocation: **May 2026**\n\n━━━ Key Entrance Test Dates ━━━\n📊 Internal Aptitude Test: **Every Saturday (by appointment)**\n🎤 MBA Interviews: **Rolling basis, March–May 2025**\n\n💡 Pro tip: Apply in Round 1 for scholarship priority and best hostel options!`,
    suggestions: ["📝 Start Application", "🏆 Scholarship Deadline", "📞 Contact Admissions", "📋 Document Checklist"],
  },

  // ── Documents ─────────────────────────────────────────────
  documents: {
    text: `📋 **Required Documents Checklist**\n\n━━━ Undergraduate (B.Tech / BBA / B.Sc.) ━━━\n☑️  Class 10 Marksheet & Certificate\n☑️  Class 12 / Final Year Marksheet\n☑️  Transfer Certificate (TC)\n☑️  Character Certificate from last institution\n☑️  Community Certificate (SC/ST/OBC if applicable)\n☑️  Income Certificate (for fee concession)\n☑️  Aadhaar Card (mandatory)\n☑️  6 Passport-size photographs\n☑️  Medical Fitness Certificate\n\n━━━ Postgraduate (MBA / M.Tech / M.Sc.) ━━━\n☑️  All UG semester marksheets\n☑️  Degree / Provisional Certificate\n☑️  Transfer & Character Certificates\n☑️  CAT / MAT / GATE / IIT-JAM scorecard\n☑️  Work experience letter (if applicable)\n☑️  2 Letters of Recommendation\n☑️  Statement of Purpose (500–800 words)\n☑️  Aadhaar + PAN Card\n\n━━━ International Students (additional) ━━━\n☑️  Passport (min. 6 months validity)\n☑️  AIU Equivalency Certificate\n☑️  IELTS / TOEFL scorecard\n☑️  Bank statement (min. ₹15,00,000 balance)\n☑️  Medical insurance (valid in India)\n\n📌 All copies must be **self-attested**. Originals required for verification on Day 1.`,
    suggestions: ["🌍 International Documents", "💰 Income Certificate Help", "📝 Statement of Purpose Tips", "📞 Document Helpdesk"],
  },

  // ── Payment / Loan ────────────────────────────────────────
  payment: {
    text: `💳 **Payment Options & Education Loans**\n\n━━━ Fee Payment Plans ━━━\n\n🟢 Full-Year Payment (Best Value)\n   • Pay entire annual fee upfront\n   • **5% discount** on total fee\n\n🔵 Semester-Wise Payment\n   • 2 instalments per year\n   • No additional charges\n\n🟡 Monthly Instalment Plan\n   • 12 EMIs over the year\n   • 2.5% processing fee\n   • Requires ECS/NACH mandate\n\n━━━ Payment Methods ━━━\n✅  UPI (Google Pay, PhonePe, Paytm)\n✅  Net Banking (all major banks)\n✅  Credit / Debit Card\n✅  NEFT / RTGS / IMPS\n✅  Demand Draft (in favour of "EduWorld University")\n\n━━━ Education Loan Partners ━━━\n🏦  SBI — up to 100%, 8.5% p.a., 15-year repayment\n🏦  HDFC Credila — up to ₹40L, minimal collateral\n🏦  ICICI Bank — pre-approved in 48 hours\n🏦  Axis Bank — special rate for EduWorld students\n🏦  Avanse Financial — study abroad + domestic loans\n\n💡 **Vidyalakshmi Portal** — apply to multiple government loan schemes at once.\n\n📞 Loan counsellor available on campus: Tues & Thurs, 10 AM–4 PM`,
    suggestions: ["🏦 Loan Application Help", "💰 Scholarship Comparison", "📊 EMI Calculator", "📞 Finance Office Contact"],
  },

  // ── Events / Life ─────────────────────────────────────────
  events: {
    text: `🎉 **Student Life & Campus Events**\n\n━━━ Annual Flagship Events ━━━\n🌐 **TechFusion** (February)\n   • National-level hackathon (₹3L prize pool)\n   • Paper presentations & project expo\n\n🎭 **Resonance** (March)\n   • Cultural festival: music, dance, drama, fashion\n   • Inter-college competitions, celebrity performances\n\n🏆 **Sportopia** (January)\n   • Inter-college sports meet\n   • 20+ sports, 500+ participants\n\n💼 **EduWorld Career Fair** (November)\n   • 80+ companies, on-spot interviews\n   • Open to final-year & pre-final-year students\n\n━━━ Student Clubs & Societies ━━━\n💻  Coding Club (LeetCode contests, competitive programming)\n🤖  Robotics & AI Club (ROS, Arduino, drone building)\n📸  Photography & Filmmaking Club\n🌿  Green Earth (sustainability & environment)\n📰  Campus Media & Journalism Club\n🎵  Music & Performing Arts Society\n🧘  Yoga & Wellness Club\n🌍  Model UN & Debate Society\n\n💡 All students are encouraged to join 1–2 clubs — great for resume & networking!`,
    suggestions: ["🏆 Upcoming Events", "🤖 Robotics Club Join", "💻 Coding Club", "🎭 Cultural Fest Details"],
  },

  // ── Research ──────────────────────────────────────────────
  research: {
    text: `🔬 **Research & Innovation at EduWorld**\n\n━━━ Research Centres ━━━\n🤖  Centre for AI & Machine Learning\n🧬  Biotechnology & Life Sciences Lab\n⚡  Renewable Energy Research Lab\n📡  IoT & Embedded Systems Lab\n📊  Business Analytics & Decision Sciences Centre\n🌍  Centre for Sustainable Development\n\n━━━ Funding & Grants ━━━\n💰  DST, CSIR, SERB, DBT-funded projects\n💰  Industry-sponsored research (₹2.5 Cr active grants)\n💰  Annual EduWorld Research Seed Fund — ₹2L per project\n\n━━━ Student Research Opportunities ━━━\n🎓  Research Internship: ₹8,000–₹15,000/month stipend\n📜  UG Research Programme (from Year 2)\n📖  Co-authorship on faculty publications\n🏅  Best Research Paper Award at TechFusion\n\n━━━ Publications & Patents ━━━\n📄  350+ research papers (2023–24)\n💡  12 patents filed | 4 granted\n📚  3 international journal tie-ups\n\n━━━ Ph.D. Programme ━━━\n• Full-time & Part-time modes\n• Monthly fellowship: ₹31,000 (JRF) / ₹35,000 (SRF)\n• Duration: 3–5 years\n• 25+ Ph.D. guides across departments`,
    suggestions: ["🎓 Ph.D. Admissions", "💰 Research Fellowship", "🤖 AI Lab Projects", "📄 Publication Database"],
  },

  // ── International ─────────────────────────────────────────
  international: {
    text: `🌍 **International Students — Complete Guide**\n\n━━━ Application Requirements ━━━\n📋  Valid passport (6+ months validity)\n📋  Student Visa (X-1 / F-1 category)\n📋  Notarised academic transcripts\n📋  AIU equivalency certificate\n📋  IELTS 6.0+ / TOEFL 80+ / PTE 50+\n📋  Bank statement (₹15,00,000 minimum)\n📋  Medical fitness certificate\n📋  Health insurance (valid in India)\n\n━━━ Fee Structure (International) ━━━\n💰  Tuition: 1.5× domestic fee\n🏠  Hostel (single AC): ₹15,000/month\n🏥  Health Insurance: ₹20,000/year\n📚  Books & Supplies: ~₹30,000/year\n\n━━━ Dedicated Support ━━━\n✈️  Free airport pickup (Bengaluru)\n🎉  International Student Orientation (3 days)\n🤝  Buddy Programme (paired with senior student)\n🏛️  International Affairs Office (dedicated staff)\n📞  24×7 emergency helpline\n🌐  Cultural integration events monthly\n🗣️  Hindi / Kannada language classes (free)\n\n━━━ Partner Universities ━━━\n🇺🇸  3 US universities | 🇬🇧 2 UK universities\n🇩🇪  2 German universities | 🇦🇺 1 Australian university\n(Exchange programmes available in Semester 5–6)`,
    suggestions: ["📋 Visa Application Help", "💰 International Fee Waiver", "✈️ Arrival & Orientation", "🌐 Exchange Programme"],
  },

  // ── English Proficiency ───────────────────────────────────
  english: {
    text: `🗣️ **English Proficiency Requirements**\n\n━━━ Accepted Tests & Minimum Scores ━━━\n\n📌 Undergraduate Programs\n• IELTS: 6.0 overall (min. 5.5 each band)\n• TOEFL iBT: 80 overall\n• PTE Academic: 50 overall\n• Duolingo English Test: 95\n\n📌 Postgraduate Programs\n• IELTS: 6.5 overall (min. 6.0 each band)\n• TOEFL iBT: 92 overall\n• PTE Academic: 58 overall\n• Duolingo English Test: 105\n\n━━━ Exemptions ━━━\n✅  Students from English-medium institutions\n✅  Previous degree fully taught in English\n✅  Citizens of English-speaking countries\n\n━━━ English Support Programmes ━━━\n📚  Pre-sessional English Course (6 weeks before term)\n🖥️  English Language Lab (self-paced, free access)\n✍️  Academic Writing Workshop (every Saturday)\n💬  Conversation Exchange with native speakers\n📖  IELTS / TOEFL preparation support\n\n⏰ Test score validity: 2 years from test date\n\n💡 Tip: IELTS is the most widely accepted — book your test at the British Council or IDP in Bengaluru.`,
    suggestions: ["📝 IELTS Preparation Tips", "🗣️ English Support Courses", "✅ Check Exemption", "📞 International Admissions"],
  },

  // ── Virtual / Campus Visit ────────────────────────────────
  virtual: {
    text: `🎥 **Campus Tours — Virtual & In-Person**\n\n━━━ Virtual Tour (Anytime) ━━━\n🌐  360° campus walkthrough at eduworld.ac.in/tour\n📹  Departmental video tours (15 labs featured)\n🤖  AI Lab & Innovation Centre live demo\n🏠  Hostel room walkthroughs\n🏊  Sports complex & swimming pool preview\n\n━━━ Live Virtual Tour (Scheduled) ━━━\n📅  Every Tuesday & Thursday: 4:00 PM – 5:00 PM\n💻  Platform: Zoom (link sent on registration)\n🗣️  Hosted by current students + admission team\n❓  Q&A session included\n👉  Register: eduworld.ac.in/live-tour\n\n━━━ In-Person Campus Visit ━━━\n📅  Open House Days: Every 1st & 3rd Saturday\n🕒  Timings: 10 AM – 2 PM\n✅  Includes: campus tour, department demos, faculty interaction, hostel visit\n🚌  Free shuttle from Nagasandra Metro Station\n\n━━━ Schedule a Private Visit ━━━\n📞  Call: +91 9876543210\n📧  Email: visit@eduworld.ac.in\n⏱️  Private tours available Mon–Fri by appointment\n\n💡 Tip: Visit on a weekday to interact with actual students and see labs in action!`,
    suggestions: ["📅 Book Campus Visit", "💻 Join Live Tour", "🏠 See Hostel Rooms", "📞 Call for Private Tour"],
  },

  // ── Transport ─────────────────────────────────────────────
  transport: {
    text: `🚌 **Transport & Commute Guide**\n\n━━━ College Bus Service ━━━\n🚌  15+ routes covering major Bengaluru zones\n📍  Key pick-up points:\n   • Majestic Bus Stand (Route 1)\n   • Whitefield (Route 5)\n   • Koramangala (Route 8)\n   • Jayanagar (Route 11)\n   • Electronic City (Route 13)\n\n💰  Bus Pass: ₹2,500 per semester (₹250 per day)\n🕒  First bus: 7:00 AM | Last bus: 7:30 PM\n📱  Live tracking via EduWorld Mobile App\n\n━━━ Public Transport ━━━\n🚇  Nearest Metro: **Nagasandra** (Purple Line)\n   → 10-min walk from campus\n   → Well connected to Majestic, MG Road, Whitefield\n\n🚌  BMTC Bus Routes: 252, 252A, 254C, 600, 600K\n   → Stop: "EduWorld College Gate"\n\n🛺  Auto / Cab from Nagasandra Metro: ~₹50–₹80\n\n━━━ On-Campus ━━━\n🚲  Free bicycle docking station (50 cycles)\n🛵  Two-wheeler parking: free for students\n🚗  Four-wheeler parking: ₹500/month\n🔌  EV charging points (2 stations)\n\n📲 Download the EduWorld App for real-time bus tracking!`,
    suggestions: ["🗺️ View Bus Routes Map", "📱 Download EduWorld App", "🚇 Metro Directions", "🚌 Buy Bus Pass"],
  },

  // ── Health & Wellness ─────────────────────────────────────
  health: {
    text: `🏥 **Health & Wellness Services**\n\n━━━ Medical Centre ━━━\n🏥  Location: Block A, Ground Floor\n👩‍⚕️  Resident Doctor: Mon–Sat, 8 AM–8 PM\n🚑  24×7 Nurse on duty\n💊  In-campus pharmacy (subsidised rates)\n🩺  Free OPD for all enrolled students\n📋  Specialist consultation (Tues & Fri)\n\n━━━ Mental Health Support ━━━\n🧠  Counselling Centre: 3 certified psychologists\n📞  Helpline: +91 9876500099 (24×7)\n🤝  Peer Support Programme\n🧘  Weekly mindfulness & meditation sessions\n💬  Anonymous chat support via EduWorld App\n\n━━━ Fitness & Wellness ━━━\n🏋️  Gym: 6 AM–9 PM (free for students)\n🧘  Yoga Centre: Daily 6 AM & 6 PM\n🏊  Swimming Pool: 6 AM–8 PM\n🏃  200m running track on campus\n\n━━━ Health Insurance ━━━\n🛡️  Group health cover: ₹2L/year (included in fees)\n🏥  Covers: hospitalisation, surgery, dental, vision\n🌍  International students: ₹5L cover available\n\n💡 Tip: Register at the Medical Centre in the first week — your student health card is free!`,
    suggestions: ["🧠 Counselling Appointment", "🏋️ Gym Schedule", "💊 Pharmacy Info", "🛡️ Insurance Details"],
  },

  // ── Library ───────────────────────────────────────────────
  library: {
    text: `📚 **EduWorld Central Library**\n\n━━━ Collection ━━━\n📖  1,10,000+ physical books\n💻  50+ e-database subscriptions (JSTOR, IEEE, Springer, Elsevier)\n📰  200+ national & international journals\n🎥  5,000+ e-learning video courses (NPTEL, Coursera)\n📜  10,000+ past question papers & study materials\n\n━━━ Facilities ━━━\n🪑  500 reading seats across 3 floors\n🖥️  80 computer terminals (free access)\n🔕  Silent study zones + group discussion rooms\n🖨️  Printing & scanning (₹2/page)\n📦  Book loaning kiosks (24×7 self-service)\n\n━━━ Access & Timings ━━━\n🕒  Mon–Sat: 8 AM–10 PM\n🕒  Sun & Holidays: 10 AM–6 PM\n🆔  Student ID card required for entry\n📱  Remote access via library portal (home access)\n\n━━━ Services ━━━\n📬  Inter-library loan (ILL) with 10 partner universities\n🎓  Research assistance desk (11 AM–4 PM)\n📚  Referencing & citation workshops (monthly)\n🔔  New arrivals alert (email subscription)`,
    suggestions: ["🖥️ Library Portal Login", "📖 Borrow Books Online", "📚 E-Database Access", "📅 Workshop Schedule"],
  },

  // ── Clubs & Activities ────────────────────────────────────
  clubs: {
    text: `🎭 **Student Clubs & Extra-Curricular Activities**\n\n━━━ Technical Clubs ━━━\n💻  Code Club — DSA, competitive programming, hackathons\n🤖  Robotics & Automation Club — ROS, drones, Arduino\n🔐  Cybersecurity Club — CTF challenges, ethical hacking\n📊  Data Science & Analytics Club\n📱  App Development Club (Flutter, React Native)\n\n━━━ Cultural & Arts ━━━\n🎵  Music Society — classical, western, fusion\n💃  Dance Troupe — classical, hip-hop, folk\n🎭  Drama & Theatre Club\n🎨  Fine Arts & Photography Club\n✍️  Creative Writing & Literary Society\n\n━━━ Sports Teams ━━━\n🏏  Cricket | ⚽ Football | 🏀 Basketball\n🏸  Badminton | 🎾 Tennis | ♟️ Chess\n🤸  Athletics | 🏊 Swimming\n\n━━━ Social & Leadership ━━━\n🌍  Model United Nations (MUN) Society\n📰  Campus Media — newspaper & YouTube channel\n🌿  Green Earth — sustainability & environment\n🤝  NSS (National Service Scheme)\n🚀  Entrepreneurship & Innovation Cell (E-Cell)\n\n━━━ How to Join ━━━\n📅  Club Expo: First week of every semester\n📝  Register via EduWorld Student Portal\n💡  No prior experience needed — all levels welcome!`,
    suggestions: ["🤖 Join Robotics Club", "💻 Coding Club Register", "📅 Club Expo Dates", "🌍 MUN Society Info"],
  },

  // ── Fallback ──────────────────────────────────────────────
  fallback: {
    text: `🤔 Thanks for your question! I want to make sure I give you the most accurate answer.\n\nHere are some popular topics I can help with right now:\n\n🎓 **Academics** — Courses, curriculum, specializations\n📝 **Admissions** — Process, eligibility, documents\n💰 **Finances** — Fees, scholarships, education loans\n🏫 **Campus** — Facilities, hostel, transport, events\n💼 **Careers** — Placements, internships, career support\n📞 **Contact** — Reach the right department quickly\n\nOr feel free to type your question in detail — I'll do my best to help! 😊`,
    suggestions: ["🎓 Explore Courses", "📝 Admission Process", "💰 Fees & Scholarships", "📞 Talk to Admissions"],
  },
};

// ============================================================
//  KEYWORD MAP
//  Maps response keys to arrays of trigger words/phrases
// ============================================================
export const keywordMap = {
  greeting: [
    "hi", "hello", "hey", "good morning", "good afternoon",
    "good evening", "howdy", "sup", "hiya", "namaste", "vanakkam",
  ],
  thanks: [
    "thank", "thanks", "thank you", "thankyou", "thx", "ty",
    "appreciate", "helpful", "great help", "awesome help",
  ],
  course: [
    "course", "program", "programme", "degree", "study", "curriculum",
    "subject", "branch", "stream", "what courses", "list of courses",
    "available programs", "which course",
  ],
  btech: [
    "btech", "b.tech", "b tech", "computer science", "cse",
    "software engineering", "information technology", "it course",
    "cs degree", "computer engineering", "coding degree",
  ],
  mba: [
    "mba", "master of business", "business administration",
    "management degree", "pgdm", "postgraduate management",
  ],
  engineering: [
    "mechanical", "civil", "electronics", "ece", "mtech", "m.tech",
    "m tech", "core engineering", "electrical", "vlsi", "embedded",
  ],
  arts: [
    "arts", "science", "bsc", "b.sc", "ba", "b.a", "english",
    "biology", "biotechnology", "physics", "chemistry", "mathematics",
    "data science", "humanities", "literature",
  ],
  apply: [
    "apply", "application", "how to apply", "apply now",
    "admission form", "enroll", "enroll", "register", "join",
    "steps to apply", "application process", "how do i apply",
  ],
  admission: [
    "admission", "eligibility", "criteria", "qualification",
    "minimum marks", "cut off", "cutoff", "requirement",
    "entrance exam", "jee", "cat", "mat", "gate", "who can apply",
  ],
  fee: [
    "fee", "fees", "cost", "price", "tuition", "how much",
    "expensive", "cheap", "annual fee", "semester fee",
    "total cost", "fee structure", "charges",
  ],
  scholarship: [
    "scholarship", "scholarships", "financial aid", "grant",
    "funding", "discount", "fee waiver", "merit", "need based",
    "free education", "concession", "stipend",
  ],
  campus: [
    "campus", "facility", "facilities", "infrastructure",
    "building", "lab", "laboratory", "wifi", "internet",
    "campus life", "what is on campus",
  ],
  housing: [
    "hostel", "housing", "accommodation", "room", "stay",
    "residence", "pg", "where to stay", "hostel fee",
    "single room", "double room", "boys hostel", "girls hostel",
  ],
  contact: [
    "contact", "phone", "email", "address", "reach",
    "call", "whatsapp", "helpline", "office", "how to contact",
    "talk to someone", "speak to",
  ],
  job: [
    "job", "placement", "placements", "salary", "package",
    "lpa", "recruit", "recruitment", "hired", "employment",
    "career", "how much salary", "average package", "highest package",
  ],
  internship: [
    "internship", "intern", "stipend", "summer internship",
    "industrial training", "company training", "work experience",
    "6 month internship", "ppo", "pre placement offer",
  ],
  faculty: [
    "faculty", "teacher", "professor", "staff", "instructor",
    "mentor", "who teaches", "phd faculty", "qualified teachers",
  ],
  deadline: [
    "deadline", "last date", "when to apply", "application date",
    "closing date", "expire", "due date", "timeline", "schedule",
    "when does admission open", "when does admission close",
  ],
  documents: [
    "document", "documents", "certificate", "marksheet",
    "id proof", "what documents", "required documents",
    "upload", "aadhaar", "transfer certificate",
  ],
  payment: [
    "payment", "installment", "emi", "loan", "education loan",
    "bank loan", "how to pay", "payment mode", "upi",
    "net banking", "vidyalakshmi", "monthly payment",
  ],
  events: [
    "event", "events", "fest", "festival", "hackathon",
    "tech fest", "cultural", "sports", "club", "activities",
    "extracurricular", "extra curricular", "annual day",
  ],
  research: [
    "research", "phd", "ph.d", "publish", "publication",
    "paper", "patent", "innovation", "project", "fellowship",
    "csir", "dst", "serb", "research lab",
  ],
  international: [
    "international", "foreign", "visa", "passport", "overseas",
    "abroad", "nri", "foreign student", "oci", "study in india",
  ],
  english: [
    "english", "ielts", "toefl", "pte", "language",
    "proficiency", "english test", "language requirement",
    "english score", "duolingo",
  ],
  virtual: [
    "virtual tour", "campus tour", "online tour", "visit",
    "see campus", "360 tour", "open house", "campus visit",
    "can i visit",
  ],
  transport: [
    "transport", "bus", "metro", "commute", "travel",
    "how to reach", "directions", "distance", "bus pass",
    "college bus", "pickup", "route", "location",
  ],
  health: [
    "health", "medical", "doctor", "hospital", "sick",
    "medicine", "pharmacy", "mental health", "counselling",
    "counselor", "wellness", "gym", "fitness", "insurance",
  ],
  library: [
    "library", "book", "books", "study material", "e-book",
    "database", "journal", "ieee", "reading", "borrow",
    "library card", "research paper",
  ],
  clubs: [
    "club", "clubs", "society", "coding club", "robotics",
    "mun", "music", "dance", "drama", "sport team",
    "nss", "ecell", "e-cell", "photography", "chess",
  ],
};