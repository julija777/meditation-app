
## <a name="tech-stack">⚙️ Tech Stack</a>

-   React Native
-   Expo
-   NativeWind
-   JavaScript
-   TypeScript

## <a name="features">🔋 Features</a>

👉 **Onboarding Screen**: Welcome screen with a linear gradient to help users get started with the app.

👉 **Meditation List Screen with Flat List**: A flat list displays previews of various meditations with corresponding images.

👉 **Audio Playing Capability**: Control audio playback and manage a meditation countdown timer.

👉 **Tab Navigation**: Navigate between sections like the Meditation Screen and Affirmations screen with ease using tab navigation.

👉 **Responsiveness**: Smooth performance and adaptability across various devices and screen sizes for a consistent user experience.

and many more, including code architecture and reusability



**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npx expo start
```

**Expo Go**

Download the [Expo Go](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.

**iOS Simulator**

Navigate to the [Expo documentation](https://docs.expo.dev/workflow/ios-simulator/) to learn how to install and run your application on an iOS Simulator for local development.

**Android Emulator**

Navigate to the [Expo documentation](https://docs.expo.dev/workflow/android-studio-emulator/) to learn how to install and run your application on an Android Emulator for local development.


## Plan

Instead of the local data use and LLM api as such. 


import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export function ChatWithLLM() {
  const [messages, setMessages] = useState([]);

  const getLLMResponse = async (userMessage) => {
    // Implement your LLM API call here
    // Return the LLM's response
  };

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
    // Send the user's message to the LLM and get a response
    getLLMResponse(newMessages[0].text).then(llmResponse => {
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: llmResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Assistant',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
}

