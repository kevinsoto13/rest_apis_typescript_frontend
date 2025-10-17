import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import {router} from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-600">Cargando...</div>}></Suspense>
    <RouterProvider router={router}/>
  </StrictMode>,
)
