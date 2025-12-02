import { GoogleGenAI, Type } from "@google/genai";
import { Job, CoverLetterRequest } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const searchJobsWithAI = async (query: string, location: string): Promise<Job[]> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Schema definition for strict JSON output
    const responseSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          company: { type: Type.STRING },
          location: { type: Type.STRING },
          salary: { type: Type.STRING },
          type: { type: Type.STRING },
          description: { type: Type.STRING },
          requirements: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          benefits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          postedAt: { type: Type.STRING, description: "Relative time e.g. '2 days ago'" }
        },
        required: ["title", "company", "location", "salary", "type", "description", "requirements", "benefits", "postedAt"]
      }
    };

    const isGovtSearch = query.toLowerCase().includes('government') || 
                         query.toLowerCase().includes('sarkari') || 
                         query.toLowerCase().includes('psu') ||
                         query.toLowerCase().includes('railways') ||
                         query.toLowerCase().includes('bank');

    let sectorInstructions = "";
    if (isGovtSearch) {
        sectorInstructions = `
        SECTOR: INDIAN GOVERNMENT & PSU (SARKARI NAUKRI)
        - Roles: Probationary Officer (PO), Junior Engineer (JE), Clerk, Section Officer, Assistant Professor, Scientist 'B', Constable, Administrative Officer.
        - Companies/Orgs: SBI, Indian Railways, LIC, ONGC, BHEL, ISRO, DRDO, UPSC, SSC, IBPS, GAIL, Coal India.
        - Salary: Use government pay scales where appropriate (e.g., "Pay Level 10 (₹56,100)", "₹8-12 LPA", "₹35,400 + DA").
        - Description tone: Formal, official, emphasizing eligibility and public service.
        `;
    } else {
        sectorInstructions = `
        SECTOR: PRIVATE SECTOR (Corporate, MNC, Startup)
        - Roles: Varied based on query (Software, Sales, Management, etc.).
        - Companies: Indian Unicorns (Swiggy, Zomato, Razorpay), MNCs (Google, Amazon, TCS, Infosys, Wipro), or realistic Startups.
        - Salary: Standard market rates in LPA (e.g. "₹12-18 LPA") or monthly.
        `;
    }

    const prompt = `Generate 6 realistic and detailed job postings for "${query || 'various roles'}" located in "${location || 'India'}". 
    
    CONTEXT: This is a job board specifically for the Indian market (NexGen India).
    
    ${sectorInstructions}

    GENERAL GUIDELINES:
    1. Locations: Strictly use Indian cities (e.g., Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Gurgaon, Noida) or 'Remote (India)'.
    2. Salary: Strictly use Indian Rupees (₹).
    3. Diversity: Provide a mix of senior and junior roles.
    4. Descriptions: Professional standard English. At least 2-3 sentences.
    5. Requirements: Include 3-5 specific requirements.
    6. Benefits: Include 3 benefits (e.g., Health Insurance, PF, Travel Allowance).
    
    Ensure a mix of job types (Full-time, Contract, etc).
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jobsRaw = JSON.parse(response.text || '[]');
    
    // Hydrate with client-side only fields (ID, logo seed)
    return jobsRaw.map((job: any) => ({
      ...job,
      id: generateId(),
      logoSeed: Math.floor(Math.random() * 1000),
      matchScore: Math.floor(Math.random() * (98 - 75) + 75) // Mock match score
    }));

  } catch (error) {
    console.error("Error fetching jobs from AI:", error);
    // Return empty array to handle gracefully in UI
    return [];
  }
};

export const generateCoverLetter = async (request: CoverLetterRequest): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a professional, persuasive, and concise cover letter for a ${request.jobTitle} position at ${request.companyName} in India.
    
    Candidate Details:
    Name: ${request.candidateName}
    Skills: ${request.skills}
    Experience: ${request.experience}
    
    The tone should be enthusiastic but professional (suitable for Indian corporate culture). Keep it under 250 words. Do not include placeholders like [Your Name], use the provided name.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not generate cover letter. Please try again.";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return "Error generating cover letter. Please check your connection.";
  }
};