import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true
});

export interface TripFormData {
  destinations: string[];
  dateType: string;
  startDate: string;
  endDate: string;
  interests: string[];
  budget: number;
  weatherPreference: string;
  pace: string;
  tripType: string;
  accessibility: boolean;
}

export const generateItinerary = async (formData: TripFormData): Promise<string> => {
  try {
    const prompt = `You are a professional AI travel planner. Create a detailed, day-by-day travel itinerary based on the following preferences Format everything in proper Markdown with headings (##), bullet points, bold text for key items, and emojis for sections like Morning, Evening, etc. Do not include any explanation or extra text - just the markdown itinerary:

Destinations: ${formData.destinations.join(', ')}
Dates: ${formData.dateType === 'flexible' ? 'Flexible dates – suggest an ideal duration and timeline' : `${formData.startDate} to ${formData.endDate}`}
Budget: $${formData.budget} per person – include estimated daily costs for meals, transportation, and activities
Interests: ${formData.interests.join(', ')}
Weather Preference: ${formData.weatherPreference} – avoid seasons or dates that conflict with this
Pace: ${formData.pace} – adjust number of activities per day accordingly
Trip Type: ${formData.tripType}
Accessibility Needs: ${formData.accessibility ? 'Yes – ensure locations and travel are mobility-friendly' : 'No specific accessibility requirements'}

---

For each day of the trip, include:

🗓 Morning
- Activity + address
- Travel time + local tip
- Nearby breakfast or brunch recommendation

☀️ Afternoon
- Activity + description + address
- Lunch recommendation + estimated cost
- Estimated time required for activity

🌙 Evening
- Light cultural or nightlife activity (based on interests)
- Dinner recommendation + vibe (casual, upscale, etc.)
- Optional late-night tip (if trip pace is balanced or fast)

Also include:
- 🔄 Local transit or walking times between activities
- 📍 Realistic geographic grouping to reduce travel time
- 💡 Cultural insights (e.g., "Tuesdays this market closes early" or "Tipping is optional here")
- 📱 Booking links or site suggestions where possible

---

Formatting:
Respond in clear Markdown format with:
Day 1: [Location or Region]
- Sections: Morning, Afternoon, Evening
- Bullet points, emojis (optional), and line breaks for clarity
- Use bold for names, italics for local tips or descriptions

---

🎯 Goal:
Make the itinerary realistic, enjoyable, and smartly paced, as if a local expert curated it with budget-conscious recommendations and time-saving transitions. Balance activity density based on the selected trip pace.`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner creating detailed, day-by-day itineraries. Focus on providing specific, actionable plans that include exact locations, costs, and timing. Use proper Markdown formatting for clear organization."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again later.");
  }
};