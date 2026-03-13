import './App.css'
import AppRoutes from './routes/AppRoutes';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg shadow-xl",
        }}
      />
      <AppRoutes />
    </>
  )
}

export default App
