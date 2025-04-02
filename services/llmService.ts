import { HfInference } from '@huggingface/inference';

// Check if API key is available
if (!process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY) {
  console.error('Hugging Face API key is not set. Please add EXPO_PUBLIC_HUGGINGFACE_API_KEY to your .env file');
}

// Initialize the Hugging Face client
const hf = new HfInference(process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY);

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const generateResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    if (!process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY) {
      throw new Error('Hugging Face API key is not configured');
    }

    // Format the conversation history
    const conversation = messages
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Generate response using the model
    const response = await hf.textGeneration({
      model: 'facebook/opt-350m',
      inputs: `${conversation}\nAssistant:`,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2,
      },
    });

    return response.generated_text.trim();
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Handle different types of errors
    if (error.message?.includes('Invalid credentials')) {
      return 'Error: Please check your Hugging Face API key configuration.';
    }
    if (error.message?.includes('sufficient permissions')) {
      return 'Error: Your API token needs Inference API permissions. Please create a new token with Inference API access.';
    }
    if (error.message?.includes('rate limit')) {
      return 'Error: Rate limit exceeded. Please try again later.';
    }
    
    return 'I apologize, but I encountered an error. Please try again.';
  }
}; 