"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import "./globals.css";
import Navbar from '@/components/navbar';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { StrictMode } from 'react';
import { CssBaseline } from '@mui/material';




const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "iransansR, Arial, sans-serif", 
    },
    
});



export default function RootLayout({ children }) {
 
  return (
    
    <html lang="fa" dir='rtl'>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <body className=" bg-gray-100">
              <StrictMode>
              <Provider store={store}>
              <Navbar />
              {children}
              </Provider>
              </StrictMode>
            </body>
        </ThemeProvider>
      
    </html>
  );
}
