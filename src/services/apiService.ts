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
    // First, format the interests to be more readable
    const formattedInterests = formData.interests.map(interest => {
      // Convert camelCase or kebab-case to Title Case
      return interest
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }).join(', ');

    // Format dates
    const dateInfo = formData.dateType === 'flexible' 
      ? 'Flexible dates – suggest an ideal duration and timeline'
      : `${formData.startDate} to ${formData.endDate}`;

    const prompt = `# Travel Itinerary

## Trip Details
- **Destinations**: ${formData.destinations.join(', ')}
- **Dates**: ${dateInfo}
- **Budget**: $${formData.budget} per person
- **Interests**: ${formattedInterests}
- **Weather Preference**: ${formData.weatherPreference}
- **Pace**: ${formData.pace}
- **Trip Type**: ${formData.tripType}
- **Accessibility**: ${formData.accessibility ? 'Wheelchair accessible options required' : 'Standard accessibility'}

## Daily Itinerary

${formData.destinations.map((destination, index) => `
# Day ${index + 1}: ${destination}

### 🗓 Morning
- **Breakfast**: [Restaurant Name] + [Address]
  - *Local Tip: Best time to visit is early morning*
- **Activity**: [Description]
  - Location: [Address]
  - Duration: [Time]
  - Cost: $[Amount]

### ☀️ Afternoon
- **Lunch**: [Restaurant Name] + [Address]
  - *Estimated cost: $[Amount]*
- **Activity**: [Description]
  - Location: [Address]
  - Duration: [Time]
  - Cost: $[Amount]

### 🌙 Evening
- **Dinner**: [Restaurant Name] + [Address]
  - *Ambiance: [Description]*
- **Activity**: [Description]
  - Location: [Address]
  - Duration: [Time]
  - Cost: $[Amount]

💡 **Cultural Tips**:
- [Insight 1]
- [Insight 2]

🔄 **Transit Notes**:
- [Transit details between locations]
`).join('\n')}`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner. Create a detailed itinerary using the provided markdown template. Replace all placeholder text in brackets with specific, realistic recommendations. Maintain the exact markdown formatting provided."
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