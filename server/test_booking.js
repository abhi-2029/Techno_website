import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Booking from './src/models/Booking.js';

dotenv.config();

const runTest = async () => {
  try {
    console.log("Connecting to Database...");
    await connectDB();

    // 1. Create a travel booking
    console.log("Creating Test Flight Booking...");
    const testBooking = await Booking.create({
      bookingType: "Flight",
      from: "New Delhi (DEL)",
      to: "Patna (PAT)",
      departureDate: new Date("2026-08-15"),
      travelClass: "Economy",
      carrierName: "IndiGo (6E-452)",
      price: 4200,
      passengers: [
        { name: "Rahul Kumar", age: 34, identityNumber: "PAN123456" }
      ],
      contactEmail: "rahul@example.com",
      contactPhone: "+91 9876543210"
    });
    console.log("✅ Booking Created Successfully!");
    console.log(JSON.stringify(testBooking, null, 2));

    // 2. Query booking
    console.log("Querying Booking from Database...");
    const queried = await Booking.findById(testBooking._id);
    if (queried) {
      console.log("✅ Query successful!");
      console.log(`Type: ${queried.bookingType}, Route: ${queried.from} -> ${queried.to}, Price: ₹${queried.price}`);
    } else {
      throw new Error("Failed to retrieve booking from database.");
    }

    // 3. Update Status and ticket PDF
    console.log("Testing status update (Pending -> Confirmed)...");
    queried.status = 'Confirmed';
    queried.ticketUrl = 'https://cardtechnocrats.com/tickets/IND-6E-452.pdf';
    await queried.save();
    console.log("✅ Status and Ticket URL updated successfully!");
    console.log(`New Status: ${queried.status}, Ticket Link: ${queried.ticketUrl}`);

    // 4. Clean up
    console.log("Cleaning up test record...");
    await Booking.deleteOne({ _id: testBooking._id });
    console.log("✅ Test record cleaned up successfully.");

    console.log("\n🎉 ALL TRAVEL BOOKING DATABASE TESTS PASSED SUCCESSFULLY! The Booking Flow is 100% working.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
    process.exit(1);
  }
};

runTest();
