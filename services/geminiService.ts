
import { GoogleGenAI, Modality } from "@google/genai";

const Y2K_PROMPT = `
Transform this photo to have a strong Y2K aesthetic.
Emulate the style of early 2000s cyberculture, using shiny, metallic, and iridescent textures.
Incorporate elements like lens flare, chromatic aberration, and a subtle digital grain.
The color palette should be dominated by glossy, futuristic blues, purples, and pinks.
The final image should feel like it's from a retro-futuristic music video, a Dreamcast game's cover art, or a poster for a late 90s tech expo. Make it look sleek, optimistic, and digital.
`;

export async function remixImageToY2K(base64ImageData: string, mimeType: string): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: Y2K_PROMPT,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      const textResponse = response.text || "No text response.";
      throw new Error(`API did not return an image. Response: ${textResponse}`);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process image with AI. Please check the console for details.");
  }
}
