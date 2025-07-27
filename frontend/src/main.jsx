import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@radui/ui/themes/default.css";
import Theme from "@radui/ui/Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from './pages/Chat.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: (
    // <AuthChecker>
      <Chat/>
    // </AuthChecker>
  )
}



]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Theme appearance="dark" accentColor="teal">
     <RouterProvider router={router} />
    </Theme>
    </StrictMode>

)
