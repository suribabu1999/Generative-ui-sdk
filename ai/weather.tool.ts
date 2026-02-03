import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get weather for a location',
  inputSchema: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => {
    return {
      type: 'weather',
      location,
      weather: 'Sunny',
      temperature: 32,
    };
  },
});
