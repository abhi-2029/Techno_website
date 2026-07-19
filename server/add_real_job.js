import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import Job from './src/models/Job.js';

dotenv.config();

const realJob = {
  title: "Tender Executive – Road Projects (NH / PWD)",
  department: "Engineering",
  location: "Noida (Head Office)",
  salaryRange: "As per Interview (Immediate Joiner)",
  experienceRequired: "3-4 Years",
  description: "P S INFRACORP PVT. LTD. is seeking a qualified Tender Executive for Road & Highway Projects at our Head Office in Noida. The ideal candidate will be responsible for government tender identification, technical/financial bid preparations, and coordinating with engineering teams.",
  requirements: [
    "Diploma / Degree in Civil Engineering.",
    "3-4 Years Experience in Road / Highway Projects.",
    "Strong knowledge of Govt. Tendering (NH, NHAI, MoRTH, PWD, CPWD, EPC) and MS Excel skills."
  ],
  responsibilities: [
    "Government Tender Identification (NH, NHAI, MoRTH, PWD, CPWD, EPC, and all State Government Departments).",
    "BOQ Study & Rate Analysis.",
    "Technical & Financial Bid Preparation.",
    "Cost Estimation & Documentation.",
    "EMD & Bank Guarantee Handling.",
    "Coordination with Engineering & Finance Teams."
  ]
};

const insertJob = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Inserting P S Infracorp Job vacancy...");
    const job = await Job.create(realJob);
    
    console.log("\n✅ REAL JOB ADDED SUCCESSFULLY!");
    console.log(`Title: ${job.title}`);
    console.log(`Company: P S INFRACORP PVT. LTD.`);
    console.log(`Location: ${job.location}`);
    console.log(`Slug: ${job.slug}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Insertion failed:", error.message);
    process.exit(1);
  }
};

insertJob();
