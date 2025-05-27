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
    const formattedInterests = formData.interests.map(interest => {
      return interest
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }).join(', ');

    const dateInfo = formData.dateType === 'flexible' 
      ? 'Flexible dates – suggest an ideal duration and timeline'
      : `${formData.startDate} to ${formData.endDate}`;

    const systemMessage = `You are an expert travel planner with extensive knowledge of global destinations, local cuisines, and cultural experiences. Your role is to create detailed, actionable itineraries that include:

1. ONLY real, existing locations, restaurants, and attractions
2. Specific addresses and names - never use generic terms like "local restaurant" or "nearby cafe"
3. Accurate price ranges based on current market rates
4. Realistic travel times between locations
5. Actual operating hours and seasonal considerations
6. Genuine local insights and cultural tips

CRITICAL: Never use placeholders or generic descriptions. Every recommendation must be a real, verifiable place or experience.`;

    const prompt = `Create a detailed, day-by-day travel itinerary based on these preferences:

- **Destinations**: ${formData.destinations.join(', ')}
- **Dates**: ${dateInfo}
- **Budget**: $${formData.budget} per person
- **Interests**: ${formattedInterests}
- **Weather Preference**: ${formData.weatherPreference}
- **Pace**: ${formData.pace}
- **Trip Type**: ${formData.tripType}
- **Accessibility Needs**: ${formData.accessibility ? 'Yes – ensure locations are mobility-friendly' : 'No specific requirements'}

For each day, provide:

### 🗓 Morning
- Specific breakfast venue with exact name and address (e.g., "Cafe Louvre, Národní 22, Prague 1")
- Main activity with precise location and current admission price
- Actual walking/transit time from breakfast to activity

### ☀️ Afternoon
- Named lunch spot with signature dishes and price range
- Detailed activity description with exact location
- Real transit options between locations (e.g., "Take Metro Line A from Station X to Y")

### 🌙 Evening
- Specific dinner restaurant with ambiance description and price range
- Evening activity or entertainment venue with actual address
- Local tip based on real experiences

Requirements:
1. Use ONLY real, existing venues and attractions
2. Include actual addresses for every location
3. Provide current, accurate prices
4. Consider real opening hours and seasonal closures
5. Group activities geographically to minimize travel time
6. Include specific cultural insights and local customs

Example format:
# Day 1: Tokyo, Asakusa District

### 🗓 Morning
- **Mimiu Asakusa** (3-1-12 Nishi-Asakusa, Taito) - Traditional Japanese breakfast set ¥1,800
- 10-minute walk to Sensō-ji Temple
- **Sensō-ji Temple** (2-3-1 Asakusa, Taito) - Free admission, opens 6:00 AM

💡 Arrive before 8:00 AM to avoid tour groups and get the best photos

[Continue this level of detail and specificity throughout the itinerary]`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 2500,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again later.");
  }
};