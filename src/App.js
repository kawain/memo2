import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lists from './components/Lists'
import Article from './components/Article'
import Edit from './components/Edit'
import Layout from './components/Layout'

const BASEURL = process.env.REACT_APP_BASEURL

const now = new Date()
// 皇紀
const year = now.getFullYear() + 660

function App () {
  // 画面更新用
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout year={year} />}>
          <Route
            index
            element={
              <Lists
                BASEURL={BASEURL}
                count={count}
                setCount={setCount}
                year={year}
              />
            }
          />
          <Route path='post/:id' element={<Article BASEURL={BASEURL} />} />
          <Route path='edit/:id' element={<Edit BASEURL={BASEURL} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
