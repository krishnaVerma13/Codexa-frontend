import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store/Store.ts'

const queryClint = new QueryClient();

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClint}>
      <BrowserRouter>
      <Provider store={store}>

        <App />
      </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
