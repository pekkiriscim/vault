import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Root from '@renderer/pages'
import All from '@renderer/pages/all'
import Links from '@renderer/pages/links'
import Notes from '@renderer/pages/notes'
import Images from '@renderer/pages/images'
import Layout from '@renderer/components/layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route element={<Layout />}>
          <Route path="/all" element={<All />} />
          <Route path="/links" element={<Links />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/images" element={<Images />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
)
