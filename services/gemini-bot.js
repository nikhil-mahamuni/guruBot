import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);


function configureGeminiModel(){
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  return model
}

export async function generateTextGeminiModel(prompt){
  const model = configureGeminiModel()
  const result = await model.generateContent(prompt);
  return result
}