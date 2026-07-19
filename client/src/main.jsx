/**
 * CARD Technocrats & Engineers LLP - Frontend Entrypoint
 * 
 * Google 15+ Years Senior Developer Architecture Notes:
 * 1. StrictMode is enabled to capture lifecycle bugs and side-effects during development.
 * 2. HelmetProvider wraps the tree so that children pages can asynchronously inject SEO meta tags 
 *    (titles, descriptions) to ensure the company page ranks highly on search engines.
 * 3. QueryClientProvider wraps all child contexts, acting as a global server state manager 
 *    (using React Query) with caching and automated refetching.
 * 4. BrowserRouter supplies routing context to route routers and links.
 * 5. ThemeProvider and AuthProvider manage custom context states (global dark-mode state and 
 *    JWT admin login session states respectively).
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

// Initialize React Query Client
// Configuration reasons:
// - staleTime: set to 5 minutes so that static services and pricing lists do not trigger 
//   repeated API hits on page transitions, optimizing database network bandwidth.
// - refetchOnWindowFocus: set to false to prevent page-refresh jumps while administrators 
//   are copying/pasting credentials or document tables.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <App />
              {/* Premium dark-mode notifications configuration */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'rgba(17, 24, 39, 0.95)',
                    color: '#f9fafb',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '12px',
                    fontSize: '14px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#f9fafb',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#f9fafb',
                    },
                  },
                }}
              />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
