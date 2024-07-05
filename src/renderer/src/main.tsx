import '@renderer/styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { MemoryRouter, Route, Routes } from 'react-router-dom'

import HomePage from '@renderer/pages/HomePage'
import CreateVaultPage from './pages/CreateVaultPage'
import AllItemsPage from '@renderer/pages/AllItemsPage'
import LinksPage from '@renderer/pages/LinksPage'
import NotesPage from '@renderer/pages/NotesPage'
import ImagesPage from '@renderer/pages/ImagesPage'

import Layout from '@renderer/components/layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-vault" element={<CreateVaultPage />} />
        <Route element={<Layout />}>
          <Route path="/all-items" element={<AllItemsPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/images" element={<ImagesPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
)
