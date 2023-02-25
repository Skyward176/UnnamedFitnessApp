import '@/styles/globals.css'
import {AuthContextProvider} from '@/context/AuthContext';
export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>upLift</title>
      </head>
      <body className='h-screen bg-black'>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>)
}

