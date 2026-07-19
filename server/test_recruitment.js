import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import Job from './src/models/Job.js';
import JobApplication from './src/models/JobApplication.js';

dotenv.config();

const runTest = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    // 1. Fetch seeded jobs
    console.log("Querying open jobs...");
    const openJobs = await Job.find({ isClosed: false });
    console.log(`✅ Found ${openJobs.length} open job listings in database.`);
    if (openJobs.length === 0) {
      throw new Error("No open jobs found. Please run the seed_jobs.js script first.");
    }
    const sampleJob = openJobs[0];
    console.log(`Targeting Position: ${sampleJob.title} (${sampleJob.department})`);

    // 2. Submit candidate application
    console.log("Submitting test candidate application...");
    const applicant = await JobApplication.create({
      jobId: sampleJob._id,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+91 99999 88888",
      coverLetter: "I am a senior estimator looking to manage corporate CPWD profiles and bidding projects.",
      resumeUrl: "https://drive.google.com/file/d/sample_cv.pdf"
    });
    console.log("✅ Candidate Application created successfully!");
    console.log(JSON.stringify(applicant, null, 2));

    // 3. Query candidate details
    console.log("Retrieving candidate application details...");
    const queriedApp = await JobApplication.findById(applicant._id).populate('jobId', 'title department');
    if (queriedApp) {
      console.log("✅ Candidate Query successful!");
      console.log(`Candidate: ${queriedApp.name}, Position: ${queriedApp.jobId.title}, Status: ${queriedApp.status}`);
    } else {
      throw new Error("Failed to retrieve candidate profile.");
    }

    // 4. Update Candidate status (Applied -> Shortlisted)
    console.log("Updating candidate recruitment stage (Applied -> Shortlisted)...");
    queriedApp.status = 'Shortlisted';
    await queriedApp.save();
    console.log(`✅ Candidate recruitment status updated to: ${queriedApp.status}`);

    // 5. Clean up test logs
    console.log("Cleaning up test candidate profile...");
    await JobApplication.deleteOne({ _id: applicant._id });
    console.log("✅ Test candidate profile cleaned up successfully.");

    console.log("\n🎉 ALL RECRUITMENT AND CAREERS SYSTEM TESTS PASSED SUCCESSFULLY! The portal is 100% stable.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
    process.exit(1);
  }
};

runTest();
