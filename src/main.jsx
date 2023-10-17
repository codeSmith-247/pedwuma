import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./assets/styles/index.css"

import { BrowserRouter } from "react-router-dom"

import {QueryClient, QueryClientProvider} from 'react-query'

import { Translate } from '/src/components';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <Translate />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
)
