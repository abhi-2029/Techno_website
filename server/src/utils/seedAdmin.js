/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Category from '../models/Category.js';
import Pricing from '../models/Pricing.js';
import Testimonial from '../models/Testimonial.js';
import connectDB from '../config/db.js';

dotenv.config();

const categoriesData = [
  { name: 'Registration', slug: 'registration', icon: 'ClipboardDocumentCheckIcon', description: 'Government and Business Registrations', order: 1 },
  { name: 'Tender', slug: 'tender', icon: 'DocumentTextIcon', description: 'Tender Procurement and Filing Services', order: 2 },
  { name: 'Tax', slug: 'tax', icon: 'CalculatorIcon', description: 'GST, ITR and Taxation Services', order: 3 },
  { name: 'Construction', slug: 'construction', icon: 'BuildingOfficeIcon', description: 'Engineering, Estimation and Construction Project Reports', order: 4 },
  { name: 'Government', slug: 'government', icon: 'BriefcaseIcon', description: 'Official Government Portal Registrations', order: 5 },
  { name: 'Others', slug: 'others', icon: 'SparklesIcon', description: 'Miscellaneous Business and Booking Assistance Services', order: 6 },
];

const servicesData = [
  // Contractor Registrations (Registration)
  {
    title: 'CPWD Registration',
    shortDescription: 'Get registered with Central Public Works Department (CPWD) as a Class I, II, III or IV contractor.',
    categoryName: 'Registration',
    icon: 'CPWD',
    fullDescription: 'CPWD registration allows contractors to bid for central government civil, electrical, and horticulture works. It is one of the most prestigious contractor registrations in India and opens doors to large-scale national infrastructure projects.',
    requiredDocuments: [
      'Digital Signature Certificate (DSC)',
      'PAN Card & Aadhaar Card of partners/proprietor',
      'GST Registration Certificate',
      'Bank Solvency Certificate',
      'Work Experience Certificates (Form 26AS/Completion certificates)',
      'EPF & ESIC Registration Certificates',
      'Electrical License (for electrical works)',
    ],
    eligibility: 'Civil / Electrical Engineers, Diploma Holders, or experienced contractors with valid work completions matching CPWD criteria.',
    processingTime: '30 to 45 working days',
    governmentFees: 'Class-dependent (ranges from ₹5,000 to ₹1,00,000)',
    professionalCharges: '₹30,000',
    benefits: [
      'Eligibility for large-scale central government contracts',
      'Nationwide bidding eligibility',
      'Enhanced business credibility and prestige',
      'Preference in various state government tenders',
    ],
    faqs: [
      { question: 'What is the validity of CPWD registration?', answer: 'CPWD contractor registration is generally valid for a period of 5 years, after which it needs to be renewed.' },
      { question: 'Can an individual register, or is a firm necessary?', answer: 'Both sole proprietorships, partnership firms, and private limited companies are eligible to apply for CPWD registration.' },
    ],
    order: 1,
  },
  {
    title: 'PWD Registration',
    shortDescription: 'Obtain state-level Public Works Department (PWD) registration for local government contracts.',
    categoryName: 'Registration',
    icon: 'PWD',
    fullDescription: 'PWD registration enables contractors to bid for civil and construction projects initiated by the State Government. We handle the process from compiling documents to follow-ups with department engineers.',
    requiredDocuments: [
      'Aadhaar and PAN Card',
      'Affidavit of non-blacklisting',
      'Bank Solvency Certificate',
      'Three years ITR & Audited Balance Sheets',
      'Technical staff details and qualifications',
      'Machinery ownership proof',
    ],
    eligibility: 'Contractors or Engineers with prior civil works experience and required machinery ownership.',
    processingTime: '20 to 30 working days',
    governmentFees: '₹2,000 - ₹25,000 depending on Class (Class I to IV)',
    professionalCharges: '₹20,000',
    benefits: [
      'Bid for municipal and state public works',
      'Access to local tenders with lower EMD requirements',
      'Build local execution history for higher class upgrades',
    ],
    faqs: [
      { question: 'What is Class IV registration?', answer: 'Class IV is the entry-level contractor registration, allowing bidding up to ₹50 Lakhs in state projects.' },
      { question: 'Is a technical degree mandatory?', answer: 'No, but having a degree/diploma engineer on your payroll gives relaxation in experience and financial criteria.' },
    ],
    order: 2,
  },
  {
    title: 'RWD Registration',
    shortDescription: 'Get registered with Rural Works Department (RWD) for rural road and infrastructure contracts.',
    categoryName: 'Registration',
    icon: 'RWD',
    fullDescription: 'RWD focuses on rural connectivity and infrastructure. Registering here grants access to local PMGSY (Pradhan Mantri Gram Sadak Yojana) and rural development tenders.',
    requiredDocuments: [
      'PAN Card and GSTIN',
      'Bank Solvency Certificate',
      'Proof of machinery ownership (Roller, Mixer, Tipper, etc.)',
      'Character Certificate from Superintendent of Police',
      'EPF Registration certificate',
    ],
    eligibility: 'Indian citizens/firms with experienced personnel in road construction.',
    processingTime: '25 to 35 working days',
    governmentFees: '₹5,000 to ₹50,000',
    professionalCharges: '₹10,000',
    benefits: [
      'Bidding rights for local rural roads & building works',
      'Regular flow of medium-sized government contracts',
      'Simpler document compliance compared to central bodies',
    ],
    faqs: [
      { question: 'Is character certificate mandatory?', answer: 'Yes, an SP-issued character certificate not older than 6 months is required.' },
    ],
    order: 3,
  },
  {
    title: 'PHED Registration',
    shortDescription: 'Obtain Public Health Engineering Department (PHED) registration for water supply and sanitation projects.',
    categoryName: 'Registration',
    icon: 'PHED',
    fullDescription: 'PHED handles drinking water pipelines, tube-well drilling, water treatment plants, and sewerage systems. PHED registration is ideal for plumbing, mechanical, and civil contractors looking to bid on clean water missions.',
    requiredDocuments: [
      'GST & PAN Cards',
      'Plumbing / Mechanical / Civil experience certificates',
      'Partnership deed or incorporation documents',
      'Bank Solvency Letter',
      'Equipment declaration (Welding machines, pipe cutters, pressure pumps)',
    ],
    eligibility: 'Contractors with experience in pipelines, plumbing, drilling, or water storage structures.',
    processingTime: '20 to 30 working days',
    governmentFees: '₹3,000 to ₹35,000',
    professionalCharges: '₹10,000',
    benefits: [
      'Access to water supply and sanitation tenders',
      'Bidding on massive Jal Jeevan Mission projects',
      'Growth in public utility sector contracts',
    ],
    faqs: [
      { question: 'Does PHED require specialized licenses?', answer: 'Yes, for pipeline and drilling works, specialized machinery declarations and experienced labor certificates are preferred.' },
    ],
    order: 4,
  },
  {
    title: 'District Class IV Registration',
    shortDescription: 'Fast-track entry-level contractor registration at the district level for minor works.',
    categoryName: 'Registration',
    icon: 'DistrictClassIV',
    fullDescription: 'Perfect for new entrepreneurs and young engineering graduates. District Class IV registration enables you to take up small local tenders (usually up to ₹10-25 Lakhs) issued by block, panchayat, or district municipal corporations.',
    requiredDocuments: [
      'Aadhaar and PAN Card',
      'GST Certificate (if applicable)',
      'Character Certificate from SP office',
      'Bank account statement & solvency affidavit',
      'Educational credentials (engineering degree holder get exemptions)',
    ],
    eligibility: 'New entrepreneurs, diploma/degree engineers, or local residents starting a contracting business.',
    processingTime: '10 to 15 working days',
    governmentFees: 'Included in professional charges',
    professionalCharges: '₹10,000 (Including Govt. Fee)',
    benefits: [
      'Easiest and cheapest way to start government contracting',
      'EMD exemption for engineering graduates in some states',
      'Gain initial experience for higher class promotions',
    ],
    faqs: [
      { question: 'What is the limit of bidding for Class IV?', answer: 'Usually up to ₹25 Lakhs per single work order, depending on state regulations.' },
    ],
    order: 5,
  },
  {
    title: 'Indian Railway Registration',
    shortDescription: 'Register as an approved contractor with Indian Railways for civil, electrical, or signaling works.',
    categoryName: 'Registration',
    icon: 'Railway',
    fullDescription: 'Registering with the Indian Railways allows contractors to participate in zonal and national railway tenders. This includes track maintenance, station redevelopment, signaling, overhead electrification, and supply contracts.',
    requiredDocuments: [
      'IRS / IREPS account registration details',
      'Partnership Deed / Company Incorporation details',
      'Audited balance sheets of last 3 years showing turnover',
      'High-value similar work experience certificates',
      'Class 3 Digital Signature Certificate (DSC)',
    ],
    eligibility: 'Firms with strong financial backing and high-level civil/electrical engineering execution experience.',
    processingTime: '30 to 45 working days',
    governmentFees: 'Varies by class and zone (typically ₹10,000 to ₹50,000)',
    professionalCharges: '₹25,000',
    benefits: [
      'Bidding on premium, highly-funded railway projects',
      'Nationwide execution scope',
      'Prestigious portfolio addition',
      'Timely government payments under railway escrow',
    ],
    faqs: [
      { question: 'What is IREPS?', answer: 'IREPS (Indian Railways E-Procurement System) is the portal where all railway tenders are hosted and bid.' },
    ],
    order: 6,
  },

  // GeM Registration (Government)
  {
    title: 'GeM Registration',
    shortDescription: 'Register your business on Government e-Marketplace (GeM) to sell goods/services directly to government departments.',
    categoryName: 'Government',
    icon: 'GeM',
    fullDescription: 'Government e-Marketplace (GeM) is the mandatory portal for all central and state government organizations to procure goods and services. Registering as a primary seller or service provider allows you to tap into this multi-billion dollar government purchase ecosystem.',
    requiredDocuments: [
      'PAN Card of organization & key personnel',
      'GSTIN Certificate',
      'Aadhaar linked with active mobile number',
      'Bank Account Details & Cancelled Cheque',
      'Income Tax Return (ITR) details',
    ],
    eligibility: 'Manufacturers, Authorized Dealers, Resellers, and Service Providers across all categories.',
    processingTime: '3 to 5 working days',
    governmentFees: 'Free (Registration is free, though caution money deposit might apply based on turnover)',
    professionalCharges: '₹3,000',
    benefits: [
      'Direct access to all government buying departments',
      'Paperless, contactless, transparent procurement',
      'L1 bidding and Direct Purchase options for low-value orders',
    ],
    faqs: [
      { question: 'What is Direct Purchase on GeM?', answer: 'Government buyers can buy goods directly up to ₹25,000 from any seller who meets the specs, without floating a tender.' },
      { question: 'Is caution money mandatory on GeM?', answer: 'Yes, GeM charges a nominal interest-free refundable caution money depending on your annual turnover (₹5,000 to ₹25,000).' },
    ],
    order: 7,
  },
  {
    title: 'Catalogue Management',
    shortDescription: 'Product listing, brand authorization, OEM dashboard setup, and inventory management on the GeM portal.',
    categoryName: 'Government',
    icon: 'Catalogue',
    fullDescription: 'Registering on GeM is only the first step. To sell, you must create a catalog of products or services. We manage product listings, OEM panel creation, brand approvals, paired offerings, pricing updates, and inventory synchronization.',
    requiredDocuments: [
      'GeM Login details',
      'Product images (high quality, white background)',
      'Product datasheets, specifications, and warranty terms',
      'Brand authorization letter (if selling branded goods as reseller)',
      'Trademark certificate (for OEMs)',
    ],
    eligibility: 'Registered GeM sellers wanting to list and update their products/services.',
    processingTime: '5 to 7 working days',
    governmentFees: 'Nil',
    professionalCharges: '₹5,000',
    benefits: [
      'Perfect listing complying with GeM standards to avoid rejection',
      'Proper brand tagging and search optimization for buyer visibility',
      'Zero hassle upload for large bulk inventory catalogs',
    ],
    faqs: [
      { question: 'What is OEM panel on GeM?', answer: 'Original Equipment Manufacturer (OEM) status allows you to approve resellers for your brand and directly control catalog pricing.' },
    ],
    order: 8,
  },

  // Tender Services (Tender)
  {
    title: 'Tender Online Filing',
    shortDescription: 'Professional compilation, digital signing, and online submission of government e-tenders.',
    categoryName: 'Tender',
    icon: 'TenderFiling',
    fullDescription: 'Submitting a government tender online requires absolute precision. A single missing document or incorrect file format can lead to technical disqualification. Our team reviews the tender conditions, compiles all documents, verifies EMD, and securely uploads your bid via e-procurement portals.',
    requiredDocuments: [
      'Tender ID & Tender Document (NIT)',
      'Class 3 Digital Signature Certificate (DSC)',
      'Financial documents (Audited BS, turnover certificates)',
      'Technical capability certificates (Prior work completions)',
      'BOQ (Bill of Quantities) price bid configuration',
    ],
    eligibility: 'Registered contractors or companies intending to participate in a specific tender.',
    processingTime: '1 to 2 working days (prior to tender submission deadline)',
    governmentFees: 'Tender Fee & EMD as specified in the tender document',
    professionalCharges: '₹10,000 to ₹15,000',
    benefits: [
      'Zero rejection risk due to technical filing errors',
      'Secure encryption and timely upload before deadlines',
      'Expert review of technical checklists',
    ],
    faqs: [
      { question: 'What is EMD in tenders?', answer: 'Earnest Money Deposit (EMD) is security money submitted along with the bid to guarantee earnest participation.' },
      { question: 'Will I get notifications about tender results?', answer: 'Yes, we track and inform you about the technical bid opening, evaluation status, and financial bid results.' },
    ],
    order: 9,
  },
  {
    title: 'Tender Filing (Construction/Other)',
    shortDescription: 'Complete bid advisory, document compilation, bid security checks, and tender tracking.',
    categoryName: 'Tender',
    icon: 'TenderFilling',
    fullDescription: 'Comprehensive consulting for bidding strategies. We review the request for proposal (RFP), check joint venture feasibility, prepare query responses for pre-bid meetings, evaluate competitor bidding trends, and structure the pricing bid for optimal competitiveness.',
    requiredDocuments: [
      'RFP / Tender notice',
      'Company credential profile',
      'Price lists and subcontractor quotes',
      'Joint Venture / Consortium agreement drafts (if bidding together)',
    ],
    eligibility: 'Contractors targeting high-value infrastructure or service tenders.',
    processingTime: '5 to 10 working days',
    governmentFees: 'Nil (Advisory only)',
    professionalCharges: '₹10,000 to ₹15,000',
    benefits: [
      'In-depth review of risk clauses and compliance checklist',
      'Strategized price bidding (BOQ preparation)',
      'Pre-bid representation support',
    ],
    faqs: [
      { question: 'What is a pre-bid meeting?', answer: 'A meeting organized by the tender authority where prospective bidders clarify doubts in the RFP before final submission.' },
    ],
    order: 10,
  },

  // Project Engineering & Billing (Construction)
  {
    title: 'Project/Tender Cost Estimation',
    shortDescription: 'Accurate civil and electrical project cost estimations based on standard Schedule of Rates (SOR).',
    categoryName: 'Construction',
    icon: 'Estimation',
    fullDescription: 'Accurate estimation is crucial before bidding or commencing construction. We analyze architectural designs and structural layouts to provide detailed material quantities, labor requirements, and direct/indirect costs based on CPWD/State SOR.',
    requiredDocuments: [
      'Architectural plans, elevation drawings, and structural drawings',
      'Soil testing reports (optional)',
      'Specific materials choice guidelines',
    ],
    eligibility: 'Real estate developers, private builders, government contractors preparing bid estimates.',
    processingTime: '5 to 7 working days',
    governmentFees: 'Nil',
    professionalCharges: 'Based on project build area and scale',
    benefits: [
      'Accurate cost projection preventing budget overruns',
      'Profitable bidding strategy formation',
      'Optimized material utilization planning',
    ],
    faqs: [
      { question: 'What is SOR?', answer: 'Schedule of Rates (SOR) is a comprehensive document published by government public works indicating standardized rates for building materials and labor.' },
    ],
    order: 11,
  },
  {
    title: 'Project Cost Estimation',
    shortDescription: 'Accurate civil and electrical project cost estimations based on standard Schedule of Rates (SOR).',
    categoryName: 'Construction',
    icon: 'Estimation',
    fullDescription: 'Accurate estimation is crucial before bidding or commencing construction. We analyze architectural designs and structural layouts to provide detailed material quantities, labor requirements, and direct/indirect costs based on CPWD/State SOR.',
    requiredDocuments: [
      'Architectural plans, elevation drawings, and structural drawings',
      'Soil testing reports (optional)',
      'Specific materials choice guidelines'
    ],
    eligibility: 'Real estate developers, private builders, government contractors preparing bid estimates.',
    processingTime: '5 to 7 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Accurate cost projection preventing budget overruns',
      'Profitable bidding strategy formation',
      'Optimized material utilization planning'
    ],
    faqs: [
      { question: 'What is DSR/SOR?', answer: 'Delhi Schedule of Rates (DSR) or Schedule of Rates (SOR) is a standardized list indicating rates for construction materials and labor.' }
    ],
    order: 11
  },
  {
    title: 'BOQ Preparation',
    shortDescription: 'Professional preparation of Bill of Quantities (BOQ) for commercial, residential and infrastructure works.',
    categoryName: 'Construction',
    icon: 'BOQ',
    fullDescription: 'A Bill of Quantities (BOQ) itemizes the materials, parts, and labor required for a construction project. A precise BOQ is vital for tendering, progress payments, and managing contract changes. We develop detailed, audit-compliant BOQs.',
    requiredDocuments: [
      'Drawings (AutoCAD files preferred)',
      'Scope of work document',
      'Specifications sheet',
    ],
    eligibility: 'Architects, Contractors, and Project Owners.',
    processingTime: '4 to 7 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Standardized item description for bidding clarity',
      'Enables transparent pricing comparisons among contractors',
      'Essential framework for monthly billing calculations',
    ],
    faqs: [
      { question: 'Do you prepare BOQs as per CPWD DSR?', answer: 'Yes, we prepare BOQs aligned with CPWD Delhi Schedule of Rates (DSR) or state-specific public works schedule of rates.' },
    ],
    order: 12,
  },
  {
    title: 'Billing Work',
    shortDescription: 'Preparation of Running Account (RA) bills, final bills, and measurement sheets (M-Book entries) for civil works.',
    categoryName: 'Construction',
    icon: 'Billing',
    fullDescription: 'Government and commercial construction billing requires systematic documentation. We compile Measurement Book (MB) recordings, prepare detailed Running Account (RA) bills, coordinate client clearance, track approvals, and compile deviation statements.',
    requiredDocuments: [
      'Work Order / Agreement copy',
      'Site measurement sheets (MB records)',
      'Previous paid bill copies (if any)',
      'Sanctioned BOQ items list',
    ],
    eligibility: 'Contractors executing active government or commercial construction works.',
    processingTime: 'Ongoing / monthly service',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Faster bill approval and cash-flow maintenance',
      'Zero errors in compound math or quantities exceeding BOQ limits',
      'Audit-proof documentation ready for departmental review',
    ],
    faqs: [
      { question: 'What is an M-Book?', answer: 'The Measurement Book (MB) is the original record of work done, used to calculate quantities for bill payments.' },
    ],
    order: 13,
  },
  {
    title: 'BBS Preparation',
    shortDescription: 'Detailed Bar Bending Schedule (BBS) calculations for reinforcement steel estimation.',
    categoryName: 'Construction',
    icon: 'BBS',
    fullDescription: 'A Bar Bending Schedule (BBS) details the cutting length, bending shape, and weight of steel rebars for concrete reinforcement. We provide highly detailed BBS sheets that minimize structural steel wastage on site.',
    requiredDocuments: [
      'Structural drawings (RCC column, beam, slab, foundation details)',
      'Reinforcement specifications',
    ],
    eligibility: 'RCC contractors, structural engineers, and site managers.',
    processingTime: '3 to 5 working days',
    governmentFees: 'Nil',
    professionalCharges: 'Based on steel tonnage estimation scale',
    benefits: [
      'Minimizes steel rebar scrap and cutting waste',
      'Accelerates rebar cutting and bending on site',
      'Ensures compliance with structural designs',
    ],
    faqs: [
      { question: 'Do you provide BBS in Excel format?', answer: 'Yes, we provide fully detailed and formula-driven Excel spreadsheets along with marked bar diagrams.' },
    ],
    order: 14,
  },

  // Security (Government)
  {
    title: 'Digital Signature Certificate',
    shortDescription: 'Class 3 DSC issuing for e-tendering, company incorporation, and taxation filing.',
    categoryName: 'Government',
    icon: 'DSC',
    fullDescription: 'A Class 3 Digital Signature Certificate (DSC) is mandatory for submitting online bids in government e-procurement portals, incorporating limited companies, and signing tax returns. We provide secure, licensed USB token DSCs with 2-year validity.',
    requiredDocuments: [
      'PAN Card of applicant',
      'Aadhaar Card (Mobile number must be linked for OTP)',
      'Recent passport size photo',
      'Video verification of the applicant (self-recorded)',
    ],
    eligibility: 'Business owners, contractors, legal representatives, and individuals bidding online.',
    processingTime: '1 to 2 hours (super-fast activation)',
    governmentFees: 'Varies by Certifying Authority',
    professionalCharges: '₹5,000',
    benefits: [
      'Required for all online government bid submissions',
      'Ensures authenticity and non-repudiation of documents',
      'Fast online validation process',
    ],
    faqs: [
      { question: 'What is the validity of Class 3 DSC?', answer: 'Normally issued with a 2-year validity, which can be renewed online thereafter.' },
      { question: 'Is video verification mandatory?', answer: 'Yes, government guidelines require a 15-second video confirmation from the applicant for Class 3 DSC.' },
    ],
    order: 15,
  },

  // Financial & Reports (Tax)
  {
    title: 'Project Report & DPR',
    shortDescription: 'Detailed Project Reports (DPR) for bank loan approvals, government subsidies, and startup investments.',
    categoryName: 'Tax',
    icon: 'ProjectReport',
    fullDescription: 'A Detailed Project Report (DPR) outlines the business model, market feasibility, technical parameters, capital machinery, infrastructure, and financial projections of a business. We write comprehensive DPRs compliant with bank loan requirements and government subsidy schemes.',
    requiredDocuments: [
      'Proposed business profile & activities list',
      'Quotation for land, building, and machinery',
      'Raw material availability & sales price forecasts',
      'Promoter profiles and financial backgrounds',
    ],
    eligibility: 'SMEs, Startups, and Industrialists seeking bank financing or subsidies.',
    processingTime: '7 to 10 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Bank-ready financial modeling with key ratios (DSCR, IRR, BEP)',
      'Increases chances of loan sanctions and subsidies (like PMEGP, Mudra)',
      'Clear roadmap for project execution',
    ],
    faqs: [
      { question: 'What is DPR?', answer: 'A Detailed Project Report (DPR) is a comprehensive plan detailing every aspect of a proposed business project for external evaluation.' },
    ],
    order: 16,
  },
  {
    title: 'Cash Flow Statements',
    shortDescription: 'Monthly and annual Cash Flow projections and historical statements for working capital loans.',
    categoryName: 'Tax',
    icon: 'CashFlow',
    fullDescription: 'Cash flow analysis is critical for assessing corporate liquidity and debt servicing ability. We design prospective and retrospective cash flow charts showing operating, investing, and financing cash movements to back credit applications.',
    requiredDocuments: [
      'Audited balance sheets of previous years',
      'Sales and purchase projections',
      'Current debt repayment schedules',
    ],
    eligibility: 'Businesses seeking bank working capital (CC/OD limits).',
    processingTime: '3 to 5 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Visualizes cash cycles to prevent working capital gaps',
      'Fulfills banker requirements for loan renewal assessment',
    ],
    faqs: [
      { question: 'Is a cash flow projection different from a P&L sheet?', answer: 'Yes, P&L tracks revenue and expenses, while cash flow tracks the actual movement of cash in and out of the bank.' },
    ],
    order: 17,
  },

  // Project Progress Visuals (Construction)
  {
    title: 'Pictorial Progress Chart',
    shortDescription: 'Visual photographic progress monitoring reports for bank disbursements and client presentations.',
    categoryName: 'Construction',
    icon: 'PictorialProgress',
    fullDescription: 'Lenders and high-value clients need proof of construction progress before releasing financial stages. We compile systematically captioned, date-stamped photographic progress charts mapped against scheduled project milestones.',
    requiredDocuments: [
      'Raw site photographs showing structural completions',
      'Project master schedule',
      'Stage release criteria document',
    ],
    eligibility: 'Real estate developers and government infrastructure contractors.',
    processingTime: '2 to 3 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Ensures faster release of construction funds from banks',
      'Professional reporting for remote stakeholders/investors',
      'Historical record of execution milestones',
    ],
    faqs: [
      { question: 'Do you conduct site visits for photographs?', answer: 'We can arrange local site visits or compile and format the raw images sent directly by your site supervisors.' },
    ],
    order: 18,
  },
  {
    title: 'Project Completion Program',
    shortDescription: 'Project planning charts (PERT/CPM, MS Project files) showing timeline execution path.',
    categoryName: 'Construction',
    icon: 'CompletionProgram',
    fullDescription: 'A project completion program plots tasks, dependencies, resources, and critical pathways. We draft MS Project or Primavera planning charts showing Gantt schedules, helping contractors coordinate materials and labor to meet deadlines.',
    requiredDocuments: [
      'Detailed scope of work and milestones',
      'Resource availability constraints',
      'Target completion date',
    ],
    eligibility: 'Civil contractors bidding on tenders requiring planning schedules.',
    processingTime: '3 to 5 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Provides a visual Gantt chart of execution schedule',
      'Identifies critical paths to prevent delay penalties',
      'Meets mandatory tender submission requirements',
    ],
    faqs: [
      { question: 'What is a CPM chart?', answer: 'The Critical Path Method (CPM) is an algorithm for scheduling project activities, identifying the sequence of crucial steps.' },
    ],
    order: 19,
  },

  // Corporate Procurement (Others)
  {
    title: 'Quotation Preparation',
    shortDescription: 'Professional preparation of corporate and government business quotations.',
    categoryName: 'Others',
    icon: 'Quotation',
    fullDescription: 'A well-formatted quotation speaks volumes about business professionalism. We draft clean, structured pricing sheets including item specifications, terms of payment, delivery conditions, GST details, and corporate layouts.',
    requiredDocuments: [
      'Raw cost sheet and margins details',
      'Client request for quote (RFQ)',
      'Terms and conditions of supply',
    ],
    eligibility: 'Vendors, suppliers, and service providers bidding for private corporate orders.',
    processingTime: '1 to 2 working days',
    governmentFees: 'Nil',
    professionalCharges: '₹5,000',
    benefits: [
      'Increases bid conversion rate through professional presentation',
      'Legally binding terms to avoid payment disputes',
    ],
    faqs: [
      { question: 'Can you design custom corporate layouts?', answer: 'Yes, we design personalized corporate quotation layouts matching your brand identity.' },
    ],
    order: 20,
  },
  {
    title: 'Work Order Preparation',
    shortDescription: 'Legal drafting of Work Orders, Service Agreements, and Subcontractor contracts.',
    categoryName: 'Others',
    icon: 'WorkOrder',
    fullDescription: 'Protect your business interests. We draft complete Work Orders and subcontractor agreements detailing scope, delivery schedules, payment milestones, defect liability periods, penalty clauses, and arbitration terms.',
    requiredDocuments: [
      'Contractor and client profile details',
      'Scope of work and cost breakdown',
      'Special conditions of contract',
    ],
    eligibility: 'Builders, developers, and principal contractors hiring agencies.',
    processingTime: '2 to 4 working days',
    governmentFees: 'Stamp paper costs (optional)',
    professionalCharges: '₹5,000',
    benefits: [
      'Protects against subcontractor delays and abandonments',
      'Clearly defines legal and financial liabilities',
      'Reduces contract dispute resolutions time',
    ],
    faqs: [
      { question: 'Is a work order legally binding?', answer: 'Yes, when signed by both parties, it acts as a legally enforceable business contract.' },
    ],
    order: 21,
  },
  {
    title: 'Construction Material Supplier',
    shortDescription: 'Consultancy and trade connection for bulk sourcing of building materials.',
    categoryName: 'Others',
    icon: 'MaterialSupplier',
    fullDescription: 'We connect builders and contractors with top-tier direct manufacturers and wholesale suppliers for bulk procurement of cement, TMT steel rebars, sand, aggregates, bricks, fly ash, and structural finishing products at institutional prices.',
    requiredDocuments: [
      'Required quantities and specifications list',
      'Delivery site address and vehicle access feasibility',
    ],
    eligibility: 'Developers, contractors, and individual home builders buying in bulk.',
    processingTime: '2 to 3 working days',
    governmentFees: 'Nil',
    professionalCharges: 'As per project',
    benefits: [
      'Direct-from-plant rates bypassing distributor markups',
      'Guaranteed quality checks and certificate verifications',
      'Assured delivery schedules to keep site running',
    ],
    faqs: [
      { question: 'What is the minimum order quantity?', answer: 'Normally full truckloads (typically 15-25 tons for steel or 200+ bags for cement).' },
    ],
    order: 22,
  },

  // Taxation & Filings (Tax)
  {
    title: 'GST Filing & Services',
    shortDescription: 'Monthly GST returns, reconciliation, registration, and tax consultation.',
    categoryName: 'Tax',
    icon: 'GST',
    fullDescription: 'Failing to file GST returns on time leads to heavy late fees and blocking of Input Tax Credit (ITC). We handle GST registration, GSTR-1, GSTR-3B filings, purchase reconciliations with GSTR-2B, annual audits, and department notice responses.',
    requiredDocuments: [
      'Monthly sales register & purchase bills',
      'GST portal login credentials',
      'Bank account statements showing transactions',
    ],
    eligibility: 'Businesses with turnover above ₹20/40 Lakhs, or any firm with interstate transactions.',
    processingTime: 'Monthly filing cycles',
    governmentFees: 'GST liabilities + Late fees (if any)',
    professionalCharges: '₹1,500',
    benefits: [
      'Avoid high government penalty fees',
      'Accurate Input Tax Credit (ITC) matching and recovery',
      'Continuous compliance for hassle-free operations',
    ],
    faqs: [
      { question: 'What happens if GSTR-3B is filed late?', answer: 'A daily late fee is charged, and interest at 18% per annum is applicable on net tax liabilities.' },
      { question: 'What is GSTR-2B?', answer: 'An auto-drafted ITC statement showing all input credits available to you, based on returns filed by your suppliers.' },
    ],
    order: 23,
  },
  {
    title: 'ITR Filing',
    shortDescription: 'Individual and corporate Income Tax Return filing, tax planning, and audits.',
    categoryName: 'Tax',
    icon: 'ITR',
    fullDescription: 'Filing ITR is necessary to build financial track records for bank loans and government bid validations. We assist individuals, salaried professionals, partnerships, and corporations in filing accurate, optimized tax returns under current tax regimes.',
    requiredDocuments: [
      'PAN Card and Aadhaar Card',
      'Form 16 / 16A (for salaried/interest incomes)',
      'Bank account statements of the financial year',
      'Profit & Loss Statement and Balance Sheet (for businesses)',
      'Form 26AS & AIS (Annual Information Statement)',
    ],
    eligibility: 'Individuals and entities earning taxable income above exemptions.',
    processingTime: '2 to 4 working days',
    governmentFees: 'Self-assessment tax / late fees (if applicable)',
    professionalCharges: '₹2,000 (Individual)',
    benefits: [
      'Proof of income for visas, bank loans, and credit cards',
      'Avoid tax scrutiny and penalty notifications',
      'Claim eligible tax refunds seamlessly',
    ],
    faqs: [
      { question: 'What is the deadline for filing ITR?', answer: 'Usually July 31st for individuals, and October 31st for audited businesses.' },
    ],
    order: 24,
  },

  // Business Registrations (Registration)
  {
    title: 'MSME Registration',
    shortDescription: 'Obtain Udyam Registration to claim MSME subsidies, bank credit benefits, and delayed payment protections.',
    categoryName: 'Registration',
    icon: 'MSME',
    fullDescription: 'Udyam Registration is the official portal for MSMEs (Micro, Small and Medium Enterprises). Registration provides businesses with key benefits, including lower bank interest rates, credit guarantees, capital subsidies, and protection against delayed buyer payments.',
    requiredDocuments: [
      'Aadhaar Card of the proprietor / partner / director',
      'PAN Card of the business entity',
      'GSTIN Certificate (if applicable)',
      'Official bank details (Account number & IFSC)',
    ],
    eligibility: 'Proprietorships, Partnerships, LLPs, and Private Limited companies with investment up to ₹50 Cr and turnover up to ₹250 Cr.',
    processingTime: '2 to 3 working days',
    governmentFees: 'Nil (Official portal charges no fees)',
    professionalCharges: '₹3,000',
    benefits: [
      'Collateral-free bank loans (CGTMSE scheme)',
      'Priority sector lending concessions',
      'Strict legal protection against delayed buyer payments (45 days rule)',
      'Electricity bill and patent registration concessions',
    ],
    faqs: [
      { question: 'Do I need to renew my MSME certificate?', answer: 'No, Udyam registration is a permanent registration code that does not expire.' },
    ],
    order: 25,
  },
  {
    title: 'Startup India Registration',
    shortDescription: 'Register your business under Startup India (DPIIT recognition) to unlock tax holidays and government tenders exemptions.',
    categoryName: 'Registration',
    icon: 'StartupIndia',
    fullDescription: 'Department for Promotion of Industry and Internal Trade (DPIIT) recognition helps innovative startups secure tax holidays, exemption from public procurement tender experience criteria, access to venture funding, and fast-tracked patent approvals.',
    requiredDocuments: [
      'Certificate of Incorporation / Registration of entity',
      'Brief write-up on innovation, product development, or scalability model',
      'Pitch deck / Product images (optional)',
      'Patent details (if any)',
    ],
    eligibility: 'Private Limited Companies, LLPs, or Registered Partnerships incorporated less than 10 years ago, with annual turnover below ₹100 Cr.',
    processingTime: '7 to 15 working days',
    governmentFees: 'Nil',
    professionalCharges: '₹10,000',
    benefits: [
      'Income Tax exemption for 3 consecutive years (under Section 80-IAC)',
      'Exemption from prior turnover and experience in government tenders',
      'Easy self-compliance for labor and environment regulations',
    ],
    faqs: [
      { question: 'Can a sole proprietorship apply?', answer: 'No, Startup India recognition is only available to Private Limited Companies, LLPs, and Registered Partnership firms.' },
    ],
    order: 26,
  },
  {
    title: 'Startup Bihar Registration',
    shortDescription: 'Register with State Startup Policy of Bihar to access seed grants and incubation support.',
    categoryName: 'Registration',
    icon: 'StartupBihar',
    fullDescription: 'The Bihar Government offers a Startup Policy that includes seed funding of up to ₹10 Lakhs (interest-free loan for 10 years), free space at state incubators, and grants for product validation. We manage the application and pitch presentations for local recognition.',
    requiredDocuments: [
      'DPIIT Recognition Certificate (Startup India)',
      'Details of local operations in Bihar',
      'Detailed Project Report (DPR) or Business Plan',
      'Aadhaar card of founders (local residents preferred)',
    ],
    eligibility: 'DPIIT recognized startups set up in Bihar, with local resident promoters.',
    processingTime: '15 to 30 working days',
    governmentFees: 'Nil',
    professionalCharges: '₹8,000',
    benefits: [
      'Seed grant interest-free loan up to ₹10 Lakhs',
      'Free co-working space at state-sponsored incubation hubs',
      'Special funding incentives for SC/ST and women-led startups',
    ],
    faqs: [
      { question: 'Is seed funding guaranteed?', answer: 'Seed funding requires clearing a state pitch committee, for which we provide preparation and formatting support.' },
    ],
    order: 27,
  },
  {
    title: 'PAN Card Services',
    shortDescription: 'Fast processing for individual, partnership, trust, and corporate PAN Card applications.',
    categoryName: 'Registration',
    icon: 'PAN',
    fullDescription: 'Permanent Account Number (PAN) is mandatory for any banking transaction, hiring employees, or registering businesses. We apply for individual PANs and corporate PAN cards with fast digital signature verification.',
    requiredDocuments: [
      'Individual: Aadhaar card and photographs',
      'Firm/Company: Partnership deed / Certificate of Incorporation + Board Resolution',
    ],
    eligibility: 'Any individual or registered business entity in India.',
    processingTime: '3 to 5 working days for digital PAN, 10 days for physical card delivery',
    governmentFees: '₹107',
    professionalCharges: '₹400',
    benefits: [
      'Mandatory for all business taxation and bank accounts',
      'Primary identity card for financial verification',
    ],
    faqs: [
      { question: 'What is a corporate PAN?', answer: 'A PAN card issued to a partnership firm, LLP, trust, or company using their legal incorporation document.' },
    ],
    order: 28,
  },
  {
    title: 'Shop & Establishment Registration',
    shortDescription: 'Get your local shop license/Gumasta to open business bank accounts.',
    categoryName: 'Registration',
    icon: 'ShopRegistration',
    fullDescription: 'The Shop and Establishment Act license is a basic state-level registration required for any commercial shop, warehouse, office, or restaurant. This certificate acts as primary proof of business existence for commercial bank accounts.',
    requiredDocuments: [
      'PAN and Aadhaar Card of Owner',
      'Shop board image showing name in local language',
      'Rent Agreement / Property Tax receipt of the shop',
      'Partnership deed (if applicable)',
    ],
    eligibility: 'Any shop, office, hotel, or commercial establishment operating in the state.',
    processingTime: '3 to 5 working days',
    governmentFees: 'Varies by state and employee size (typically ₹500 to ₹5,000)',
    professionalCharges: 'As per project / Contact',
    benefits: [
      'Mandatory document for opening business current bank accounts',
      'Proof of legal commercial operations',
      'Access to local government commercial support schemes',
    ],
    faqs: [
      { question: 'Do home offices need a shop license?', answer: 'Depending on state regulations, home offices may be exempt, but many banks still require it to open current accounts.' },
    ],
    order: 29,
  },

  // Commercial Services (Others)
  {
    title: 'Bank Loan Assistance',
    shortDescription: 'Professional file compilation, business plans, and liaison support for bank loans.',
    categoryName: 'Others',
    icon: 'LoanAssistance',
    fullDescription: 'Applying for business loans (OD, CC, Term Loan) is highly documents-heavy. We assist in compiling your CMA (Credit Monitoring Arrangement) data, project report, ITR reconciliations, and represent your file with nationalized and private banks.',
    requiredDocuments: [
      'Last 3 years Audited Financials & ITR returns',
      'Proposed project report & machinery invoices',
      'KYC of promoters and collateral property papers',
      'GST returns of the current financial year',
    ],
    eligibility: 'Established business owners or startups with feasible project files.',
    processingTime: '15 to 30 working days',
    governmentFees: 'Processing fee charged by lender banks',
    professionalCharges: 'As per project / Contact',
    benefits: [
      'Higher approval rate with audit-compliant CMA data',
      'Representation with multiple banks to get optimal interest rates',
      'Guided assistance on documentation rules',
    ],
    faqs: [
      { question: 'What is CMA data?', answer: 'Credit Monitoring Arrangement (CMA) report is a financial statement projecting future financial ratios, required by banks for assessing commercial business loans.' },
    ],
    order: 30,
  },
  {
    title: 'Flight Ticket Booking',
    shortDescription: 'Institutional domestic and international flight ticket bookings at competitive rates.',
    categoryName: 'Others',
    icon: 'Flight',
    fullDescription: 'Corporate and business travel assistance. We provide institutional and corporate travel bookings, group discounts, free meal options, baggage add-ons, and cancellation coverages for national and global flights.',
    requiredDocuments: [
      'Name of travelers as per government ID',
      'Passport copies (for international travel)',
    ],
    eligibility: 'Open to all corporate clients, contractors, and individuals.',
    processingTime: 'Instantly (within 30 minutes)',
    governmentFees: 'Ticket fares charged by airlines',
    professionalCharges: 'As per project / Contact',
    benefits: [
      'Access to corporate discounts and flight schedules',
      'Instant invoicing for business tax deduction claims',
      'Dedicated helpline for ticket cancellations or rescheduling',
    ],
    faqs: [
      { question: 'Do you offer group booking discounts?', answer: 'Yes, we offer specialized fares for groups of 9 or more travelers booking together.' },
    ],
    order: 31,
  },
  {
    title: 'Thekedari & Contracts Assistance',
    shortDescription: 'Liaison and advisory services for securing sub-contracts, local works, and job orders.',
    categoryName: 'Others',
    icon: 'Briefcase',
    fullDescription: 'We assist local contractors and engineers in securing work contracts, sub-contracts, municipal job orders, and private tenders.',
    requiredDocuments: [
      'Contractor Class License (if any)',
      'Business profile and key machinery list',
      'Past work completions report'
    ],
    eligibility: 'Civil contractors, engineering graduates, and local job seekers.',
    processingTime: 'Ongoing consultation',
    governmentFees: 'Nil',
    professionalCharges: '₹5,000',
    benefits: [
      'Direct referrals to active infrastructure projects',
      'Assistance in joint-venture (JV) documentation',
      'Access to municipal and local body work orders'
    ],
    faqs: [
      { question: 'Is a contract placement guaranteed?', answer: 'We act as engineering liaison and advisors, matching your class/experience profile with active site requirements.' }
    ],
    order: 32
  },
];

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to database...');

    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Category.deleteMany();
    await Pricing.deleteMany();
    await Testimonial.deleteMany();
    console.log('Cleared existing data.');

    // Seed Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cardtechno.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    const admin = await User.create({
      name: 'Admin CARD Technocrats',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`Admin user created: ${admin.email}`);

    // Seed Categories
    const categories = await Category.insertMany(categoriesData);
    console.log(`Seeded ${categories.length} categories.`);

    // Map Category IDs
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Seed Services
    const preparedServices = servicesData.map((svc) => ({
      ...svc,
      slug: slugify(svc.title, { lower: true, strict: true }),
      category: categoryMap[svc.categoryName],
    }));

    const services = await Service.insertMany(preparedServices);
    console.log(`Seeded ${services.length} services.`);

    // Seed Pricing
    const pricingData = services.slice(0, 8).map((svc) => ({
      serviceName: svc.title,
      slug: svc.slug,
      tiers: [
        {
          name: 'Basic',
          price: svc.governmentFees !== 'Nil' ? '₹2,999' : '₹1,499',
          features: ['Document checklist verification', 'Portal registration setup', 'Single application filing', 'Email support'],
          isPopular: false,
        },
        {
          name: 'Standard',
          price: svc.governmentFees !== 'Nil' ? '₹7,999' : '₹4,999',
          features: ['Complete end-to-end documentation', 'Dedicated support officer', 'Official liaison representation', 'Correction support if rejected', 'WhatsApp support'],
          isPopular: true,
        },
        {
          name: 'Premium',
          price: 'Custom Pricing',
          features: ['Priority 24/7 submission track', 'On-site consultant review', 'Multiple state representation', 'Complementary GST/DSC services', 'Lifetime renewal tracking'],
          isPopular: false,
        },
      ],
      isActive: true,
      order: svc.order,
    }));

    await Pricing.insertMany(pricingData);
    console.log('Seeded sample pricing data.');

    // Seed Testimonials
    const testimonials = [
      {
        name: 'Rajesh Kumar',
        role: 'Managing Director',
        company: 'R. K. Infrastructure Ltd.',
        content: 'CARD Technocrats made our CPWD contractor upgrade smooth and quick. Their documentation checking is flawless.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        isActive: true,
        order: 1,
      },
      {
        name: 'Anjali Sharma',
        role: 'Founder',
        company: 'EduCorp Edutech Startup',
        content: 'Obtaining our DPIIT Startup India recognition and MSME registrations took less than 10 days. Exceptional service!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        isActive: true,
        order: 2,
      },
      {
        name: 'Amit Kumar Singh',
        role: 'Government Contractor',
        company: 'A. K. Builders',
        content: 'Our team relies entirely on CARD Technocrats for online tender filings and BOQ estimations. Highly professional and accurate engineering files.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        isActive: true,
        order: 3,
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Seeded testimonials.');

    console.log('Database seeding completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seed();
