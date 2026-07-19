import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Job from './src/models/Job.js';

dotenv.config();

const jobs = [
  {
    title: "Civil Engineering Estimator (BOQ Specialist)",
    department: "Engineering",
    location: "Patna, Bihar (Hybrid)",
    salaryRange: "₹35,000 - ₹55,000 / month",
    experienceRequired: "2-4 Years",
    description: "We are seeking a detail-oriented Civil Estimator to handle Project Cost Estimation, BOQ preparation, and structural measurement book (MB) entries. You will collaborate directly with government contractors to deliver accurate material billing projections.",
    requirements: [
      "Bachelor's degree or Diploma in Civil Engineering.",
      "Proficient in AutoCAD, MS Excel, and structural measurement systems.",
      "Comprehensive knowledge of CPWD specifications and Analysis of Rates (DSR).",
      "Excellent quantitative and mathematical skills."
    ],
    responsibilities: [
      "Prepare item-wise cost estimations and Detailed Project Reports (DPR).",
      "Perform measurements and record quantity surveys on site.",
      "Draft bills of quantities (BOQ) for government and private tenders.",
      "Validate MB entries and coordinate billing logs with agency engineers."
    ]
  },
  {
    title: "CPWD & GeM Compliance Manager",
    department: "Corporate Compliance",
    location: "Patna, Bihar (On-site)",
    salaryRange: "₹45,000 - ₹65,000 / month",
    experienceRequired: "3+ Years",
    description: "We are hiring an expert in corporate and government registrations to manage contractor licenses (CPWD, PWD, RWD) and execute bid submissions on the Government e-Marketplace (GeM).",
    requirements: [
      "Graduate in Business Admin, Commerce, or related domain.",
      "Extensive experience working with the CPWD portal, EPF/ESIC portals, and GeM bidding dashboards.",
      "Strong understanding of partnership deeds, solvency declarations, and technical eligibility criteria.",
      "Detail-oriented with strong documentation tracking skills."
    ],
    responsibilities: [
      "Prepare and compile documents for CPWD and State PWD class licensing.",
      "Upload and manage bids, product listings, and service catalogs on the GeM portal.",
      "Liaise with financial bodies and government desks to clear solvency files.",
      "Keep track of regulatory changes in CPWD contractor rules."
    ]
  },
  {
    title: "Junior Web Developer (IT Infrastructure)",
    department: "Engineering",
    location: "Patna, Bihar (Hybrid)",
    salaryRange: "₹30,000 - ₹45,000 / month",
    experienceRequired: "1-3 Years",
    description: "Join our IT division to maintain client portal configurations, database backups, and assist in building automated estimation systems. You will work on keeping our cloud assets secure and fast.",
    requirements: [
      "B.Tech in Computer Science or BCA/MCA degree.",
      "Hands-on experience with HTML, CSS, JavaScript, React.js, and Node.js.",
      "Familiarity with MongoDB, REST APIs, and git workflows.",
      "Eager to learn and work in a fast-paced environment."
    ],
    responsibilities: [
      "Support the development of internal automation utilities.",
      "Maintain portal uptime, database configurations, and backup scripts.",
      "Optimize API performance and configure frontend dashboards.",
      "Assist in deploying client document folders safely."
    ]
  },
  {
    title: "Tax Consultant & ITR Analyst",
    department: "Sales & Advisory",
    location: "Patna, Bihar (On-site)",
    salaryRange: "₹28,000 - ₹40,000 / month",
    experienceRequired: "1-3 Years",
    description: "Looking for an enthusiastic Tax Associate to file ITR, GST, and process MSME/Startup India compliance registrations for our client base.",
    requirements: [
      "B.Com, M.Com, or MBA in Finance.",
      "Practical experience with ITR-1 to ITR-6 filing and GST portal filings.",
      "Knowledge of Startup India recognition certificates and MSME portals.",
      "Clear verbal communication skills to support client advisory calls."
    ],
    responsibilities: [
      "Prepare and submit monthly/quarterly GST returns.",
      "Analyze income reports and file Income Tax Returns (ITR) for contractors.",
      "Execute MSME Udyam and Startup India certificates filing.",
      "Handle customer queries regarding registration documents."
    ]
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to Database...");
    await connectDB();

    console.log("Clearing existing jobs...");
    await Job.deleteMany({});

    console.log("Seeding jobs...");
    const createdJobs = await Job.create(jobs);
    console.log(`✅ Seeded ${createdJobs.length} Job openings successfully!`);
    
    console.log(createdJobs.map(j => `- ${j.title} (${j.department})`).join("\n"));
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seedDB();
