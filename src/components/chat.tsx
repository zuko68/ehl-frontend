import React, { useState } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import Icon from '@mui/icons-material/Send'; // Import Material-UI Icon for send button
import { GoogleGenerativeAI } from '@google/generative-ai'; // Ensure to install and import your AI library
import ReactMarkdown from 'react-markdown'; // Import the react-markdown library

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const GEMINI_API_KEY = 'AIzaSyAoLAVkU69JJIXtkhj_cFVlCzAt8wOVGJw'; // Use environment variable for API key
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prependMedicalContext = (message: string) => {
    return `User question: ${message} response as a bussiness advisor or Trade advisor formally.`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    try {
      const prompt = prependMedicalContext(inputValue);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const aiMessage: Message = { text: text, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);

      const errorMessage: Message = {
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <Box sx={{ border: '1px solid black', borderRadius: '5px', padding: 2, backgroundColor: 'transparent' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
        AI Trade Advisor
      </Typography>
      <List sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index} sx={{ justifyContent: msg.sender === 'ai' ? 'flex-start' : 'flex-end' }}>
            <ListItemText
              primary={
                msg.sender === 'ai' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown> // Render Markdown for AI messages
                ) : (
                  msg.text
                )
              }
              sx={{
                bgcolor: msg.sender === 'ai' ? '#f0f0f0' : '#B8A589',
                color: msg.sender === 'ai' ? 'black' : 'white',
                borderRadius: 1,
                padding: 1,
              }}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        variant="outlined"
        label="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, backgroundColor: '#B8A589', '&:hover': { backgroundColor: '#A68B74' } }}
        onClick={handleSendMessage}
        startIcon={<Icon />}
      >
        Send
      </Button>
    </Box>
  );
};

export default Chat;
