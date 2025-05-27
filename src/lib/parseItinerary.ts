import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

interface Activity {
  title: string;
  description?: string;
  location?: string;
  time?: string;
  cost?: string;
  tip?: string;
}

interface ItineraryDay {
  day: number;
  location: string;
  sections: {
    morning: Activity[];
    afternoon: Activity[];
    evening: Activity[];
  };
}

export const parseItinerary = (markdown: string): ItineraryDay[] => {
  const days: ItineraryDay[] = [];
  const lines = markdown.split('\n');
  let currentDay: ItineraryDay | null = null;
  let currentSection: 'morning' | 'afternoon' | 'evening' | null = null;
  let currentActivity: Partial<Activity> = {};

  for (const line of lines) {
    // Match day header
    const dayMatch = line.match(/^#\s*Day\s*(\d+):\s*(.+)$/);
    if (dayMatch) {
      if (currentDay) {
        days.push(currentDay);
      }
      currentDay = {
        day: parseInt(dayMatch[1]),
        location: dayMatch[2].trim(),
        sections: {
          morning: [],
          afternoon: [],
          evening: [],
        },
      };
      continue;
    }

    // Match section headers
    if (line.includes('### 🗓 Morning')) {
      currentSection = 'morning';
      continue;
    } else if (line.includes('### ☀️ Afternoon')) {
      currentSection = 'afternoon';
      continue;
    } else if (line.includes('### 🌙 Evening')) {
      currentSection = 'evening';
      continue;
    }

    // Skip if we're not in a day or section
    if (!currentDay || !currentSection) continue;

    // Match activity items
    const activityMatch = line.match(/^-\s*(.+)$/);
    if (activityMatch) {
      const content = activityMatch[1];

      // Check for location
      const locationMatch = content.match(/\+\s*([^+]+)$/);
      if (locationMatch) {
        currentActivity.location = locationMatch[1].trim();
      }

      // Check for time
      const timeMatch = content.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/);
      if (timeMatch) {
        currentActivity.time = timeMatch[1];
      }

      // Check for cost
      const costMatch = content.match(/\$(\d+(?:-\d+)?)/);
      if (costMatch) {
        currentActivity.cost = costMatch[0];
      }

      // Main title/description
      currentActivity.title = content
        .replace(/\+\s*[^+]+$/, '') // Remove location
        .replace(/\$\d+(?:-\d+)?/, '') // Remove cost
        .replace(/\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)/, '') // Remove time
        .trim();

      if (currentActivity.title) {
        currentDay.sections[currentSection].push(currentActivity as Activity);
        currentActivity = {};
      }
    }

    // Match tips (lines starting with 💡)
    const tipMatch = line.match(/^💡\s*(.+)$/);
    if (tipMatch && currentDay.sections[currentSection].length > 0) {
      const lastActivity = currentDay.sections[currentSection][currentDay.sections[currentSection].length - 1];
      lastActivity.tip = tipMatch[1].trim();
    }
  }

  // Add the last day
  if (currentDay) {
    days.push(currentDay);
  }

  return days;
};