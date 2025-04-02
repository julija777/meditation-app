import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import Header from '@/components/Header/Header';
import { router } from 'expo-router';
import { generateResponse, ChatMessage } from '@/services/llmService';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userName = 'Julia';

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! I\'m your meditation assistant. How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Meditation Assistant',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the LLM service
      const chatHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.user._id === 1 ? 'user' : 'assistant',
        content: msg.text,
      }));

      // Add the new message
      chatHistory.push({
        role: 'user',
        content: newMessages[0].text,
      });

      // Generate response
      const response = await generateResponse(chatHistory);

      // Add the bot's response
      const botMessage: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Meditation Assistant',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: 'I apologize, but I encountered an error. Please try again.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Meditation Assistant',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [errorMessage]));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <View style={{ flex: 1 }}>
      <Header 
        name={userName} 
        showBackButton={true} 
        onBackPress={() => router.back()} 
        variant="dark" 
      />
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        renderLoading={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        isLoadingEarlier={isLoading}
      />
      <Button
        title="Clear Chat"
        onPress={() => setMessages([])}
      />
    </View>
  );
};

export default Chat;
