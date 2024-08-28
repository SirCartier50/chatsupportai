'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react"
import {Box, Button, Stack, TextField} from '@mui/material'
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth, firestore} from "@/firebase";

export default function Home() {
  const router = useRouter();
  const { uid } = router.query || {}; // Retrieve the user ID from query parameters
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([{
      role: 'assistant',
      content: 'Hi! I'm the Headstarter Support Agent, how can I assist you today?'
    }])

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages])
  
  

  

  //Helpers
  const handleSignout = async ()=>{
    try{
        await signOut(auth);
    }catch{
        console.log("hi")
    }
  };
  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)
    setMessage('');
    setMessages((prevMessages) => [
        ...prevMessages,
        {
            role: "user",
            content: message,
        },
        {
            role: "assistant",
            content: '', // Adding an empty assistant message
        },
    ]);

    try {
        console.log("Sending request");

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ role: 'user', content: message }]),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let result = '';

        const processText = async ({ done, value }) => {
            if (done) {
                // Once done, update the last message
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].content = result;
                    return updatedMessages;
                });
                return;
            }

            const text = decoder.decode(value, { stream: true });
            result += text;

            // Update the content of the last message with new data
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].content += text;
                return updatedMessages;
            });

            // Continue processing the next chunk
            return reader.read().then(processText);
        };

        // Start processing the response
        await reader.read().then(processText);

    } catch (error) {
        console.error("Error fetching message:", error);
      }
    setIsLoading(false)
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }
  return(
    
    <Box 
      width ="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button variant="contained" onClick={handleSignout}>Sign Out</Button>
      <Stack
        direction="column"
        width="600px"
        height="710px"
        border="10px solid black"
        p={2}
        spacing={3}
        borderRadius = {12}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {
            messages.map((message, index)=>(
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end' //This is to decide which side of the screen the message
                }
              >
                <Box
                bgcolor = {
                  message.role === 'assistant' ? 'primary.main' : 'secondary.main' //this is deciding color box of text for ai or person
                }
                color="white" //Text color
                borderRadius = {16} //make bubble text
                p={3}
                >{message.content}</Box>
              </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <TextField
            label = "message"
            fullWidth
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >{isLoading ? 'Sending...' : 'Send'}</Button>
        </Stack>
      </Stack>
    </Box>
  )

}
