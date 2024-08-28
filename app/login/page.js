'use client'
import {auth} from "@/firebase";
import { useRouter } from 'next/navigation';
import {Box, Button, TextField, Typography, Container, Modal, Stack} from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const handleLogin = async ()=>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            router.push(`/?uid=${user.uid}`);
        }catch{
            console.log("hi")
        }
    };
    const handleSignup = async ()=>{
      try{
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          router.push(`/?uid=${user.uid}`);
      }catch{
          console.log("hi")
      }
    };
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <Container
          maxWidth="sm"
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Support Ai
          </Typography>
          <Box
            component="form"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box
                position= "absolute"
                top="50%"
                left="50%"
                sx = {{transform:"translate(-50%,-50%)"}}
                width={400}
                bgcolor="white"
                border="2px solid #000"
                boxShadow={24}
                p={4}
                display="flex"
                flexDirection="column"
                gap ={3}
              >
                <Typography variant="h6">Create an account</Typography>
                <Stack width="100%" direction="row" spacing={2}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleSignup}>Create</Button>
                </Stack>

              </Box>
            </Modal>
            <Button  color="primary" onClick={handleOpen}>
              Need have an account? Sign Up!
            </Button>
          </Box>
        </Container>
    );
}
