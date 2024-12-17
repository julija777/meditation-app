import React, { useState, useCallback, useEffect } from 'react';
import { View, Button } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import Header from '@/components/Header/Header';
import { router } from 'expo-router';
import { affirmations } from '@/localData/affirmations.json';

const Components = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const userName = 'I am the Header';

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome to the Affirmations Chat! How can I inspire you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Affirmation Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
  
    setTimeout(() => {
      const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: randomAffirmation,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Affirmation Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }, 1000);
  }, []);

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
      />
      <Button
        title="Clear Chat"
        onPress={() => setMessages([])}
      />
    </View>
  );
};

export default Components;
