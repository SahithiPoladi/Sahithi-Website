import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Configure react-query to keep data cached for the session and avoid unnecessary refetches
// while the user navigates/scrolls. staleTime controls how long fetched data is considered fresh.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep data fresh for 30 minutes (milliseconds). Adjust as needed.
      staleTime: 1000 * 60 * 30,
      // Cache data for the session (can be longer than staleTime). e.g., 6 hours.
      cacheTime: 1000 * 60 * 60 * 6,
      // Don't refetch on window focus to avoid interrupting the user while scrolling.
      refetchOnWindowFocus: false,
      // Don't refetch on mount; data will be used from cache until staleTime expires.
      refetchOnMount: false,
      // Optional: avoid retries to surface errors quickly (adjust if desired).
      retry: 1,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
