'use client'
import '@/styles/globals.css'
import {AuthContextProvider} from '@/context/AuthContext';
import {useState} from 'react';
import {SearchContext} from '@/context/SearchContext';
export default function Layout({ children }) {
  const [searchResults,setSearchResults] = useState([]);
  const [searchQuery,setSearchQuery] = useState('');
  return (
    <html lang="en">
      <head>
        <title>upLift</title>
      </head>
      <body className='h-screen bg-black'>
        <SearchContext.Provider value = {[searchResults, setSearchResults,searchQuery, setSearchQuery] }>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </SearchContext.Provider>
      </body>
    </html>)
}

