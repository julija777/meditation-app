import React, { useState, useCallback, useEffect } from 'react';
import { View, Button } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import Header from '@/components/Header/Header';
import { router } from 'expo-router';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallary';


const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const userName = 'Julia';

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
      const randomCategory = AFFIRMATION_GALLERY[Math.floor(Math.random() * AFFIRMATION_GALLERY.length)];
      const randomAffirmation = randomCategory.data[Math.floor(Math.random() * randomCategory.data.length)];
      
      const botMessage: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: randomAffirmation.text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Affirmation Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
        image: randomAffirmation.image,
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

export default Chat;
