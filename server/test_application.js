import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Service from './src/models/Service.js';
import Application from './src/models/Application.js';

dotenv.config();

const runTest = async () => {
  try {
    console.log("Connecting to Database...");
    await connectDB();

    // 1. Find a service
    let targetService = await Service.findOne({});
    if (!targetService) {
      console.log("⚠️ No service found in DB! Creating a mock service for test validation...");
      targetService = await Service.create({
        title: "Test PWD Registration",
        slug: "test-pwd-registration",
        shortDescription: "Test description",
        fullDescription: "Full description",
        processingTime: "10 Days",
        eligibility: "Class A",
        governmentFees: "₹10,000",
        professionalCharges: "₹5,000",
        requiredDocuments: ["PAN", "Aadhaar"],
        benefits: ["Direct tenders"],
        faqs: []
      });
      console.log("Mock service created:", targetService._id);
    } else {
      console.log(`Found Service: "${targetService.title}" (${targetService._id})`);
    }

    // 2. Create Application
    console.log("Creating Test Application...");
    const testApp = await Application.create({
      service: targetService._id,
      serviceTitle: targetService.title,
      applicantName: "Abhishek Kumar",
      email: "abhishek.test@example.com",
      phone: "+91 9999999999",
      companyName: "Abhishek Construction Corp",
      entityType: "LLP",
      solvencyAmount: 1500000,
      status: "Pending",
      documents: [
        { name: "PAN_Card.pdf", url: "/uploads/PAN_Card.pdf" },
        { name: "Solvency_Certificate.pdf", url: "/uploads/Solvency_Certificate.pdf" }
      ],
      notes: "Please review ASAP for class A tender bidding."
    });
    console.log("✅ Application Created Successfully!");
    console.log(JSON.stringify(testApp, null, 2));

    // 3. Query Application
    console.log("Querying Application from Database...");
    const queriedApp = await Application.findById(testApp._id).populate('service', 'title');
    if (queriedApp) {
      console.log("✅ Query successful!");
      console.log(`Applicant: ${queriedApp.applicantName}, Status: ${queriedApp.status}, Target Service: ${queriedApp.serviceTitle}`);
    } else {
      throw new Error("Failed to retrieve application from database.");
    }

    // 4. Update Status
    console.log("Testing status update (Pending -> Reviewing)...");
    queriedApp.status = 'Reviewing';
    queriedApp.notes = 'Verified solvency certificate is valid';
    await queriedApp.save();
    console.log("✅ Status updated successfully!");
    console.log(`New Status: ${queriedApp.status}, Admin Notes: ${queriedApp.notes}`);

    // 5. Clean up
    console.log("Cleaning up test record...");
    await Application.deleteOne({ _id: testApp._id });
    console.log("✅ Test record cleaned up successfully.");

    console.log("\n🎉 ALL DATABASE VERIFICATION TESTS PASSED SUCCESSFULLY! The Application Registration Flow is 100% working.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
    process.exit(1);
  }
};

runTest();
