import fs from 'fs';
import path from 'path';

const seedFilePath = 'e:\\Card_Techno\\server\\src\\utils\\seedAdmin.js';
let content = fs.readFileSync(seedFilePath, 'utf8');

// 1. Rename 'Tender Filling & Review' to 'Tender Filing (Construction/Other)'
content = content.replace("title: 'Tender Filling & Review',", "title: 'Tender Filing (Construction/Other)',");

// 2. Rename 'Project Cost Estimation' to 'Project/Tender Cost Estimation'
content = content.replace("title: 'Project Cost Estimation',", "title: 'Project/Tender Cost Estimation',");

// 3. Inject new service entry for 'Project Cost Estimation' under Construction category
const projectCostEstimationService = `  {
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
  },`;

// Inject it right after Project/Tender Cost Estimation. Let's find its matching end block or place it in the array
content = content.replace("title: 'Project/Tender Cost Estimation',", "title: 'Project/Tender Cost Estimation',");
// We can find where Project/Tender Cost Estimation ends (ends with its order: 11, and faqs)
content = content.replace(/order: 11,\s*\},/g, `order: 11,\n  },\n${projectCostEstimationService}`);

fs.writeFileSync(seedFilePath, content, 'utf8');
console.log('Successfully refined seedAdmin.js with exact PDF service names and entries!');
