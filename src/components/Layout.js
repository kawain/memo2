import { Outlet } from 'react-router-dom'

function Layout ({ year }) {
  return (
    <>
      <div className='container'>
        <h1>メモメモ</h1>

        <Outlet />

        <div className='footer'>
          <small>© {year} メモメモ</small>
        </div>
      </div>
    </>
  )
}

export default Layout
