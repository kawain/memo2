import { Outlet } from 'react-router-dom'

function Layout ({ year }) {
  return (
    <>
      <div className='container'>
        <h1>メモ２</h1>

        <Outlet />

        <div className='footer'>
          <small>© {year} メモ２</small>
        </div>
      </div>
    </>
  )
}

export default Layout
