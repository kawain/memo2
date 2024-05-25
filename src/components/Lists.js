import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react'
import { FiExternalLink, FiEdit, FiDelete } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Create from './Create'

function Lists ({ BASEURL, count, setCount, year }) {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const search = useRef(null)

  const fetchAll = useCallback(() => {
    axios
      .get(`${BASEURL}index.php?mode=all`)
      .then(res => {
        setPosts(res.data)
        setCount(res.data.length)
        setLoading(true)
      })
      .catch(error => {
        console.log(error)
      })
  }, [BASEURL, setCount])

  useEffect(() => {
    fetchAll()
  }, [fetchAll, count])

  function handleSearch (e) {
    e.preventDefault()
    axios
      .get(`${BASEURL}index.php?q=${search.current.value}`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function deleteOne (e, id) {
    e.preventDefault()
    let result = window.prompt('本当に削除していいですか？')
    if (result) {
      if (parseInt(result) !== year) {
        return
      }
      axios
        .delete(`${BASEURL}index.php`, { data: { id: id } })
        .then(res => {
          if (res.data.ok === 'deleted') {
            setCount(pre => pre - 1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <Create BASEURL={BASEURL} setCount={setCount} />

      <form className='search' onSubmit={handleSearch}>
        <input ref={search} type='text' placeholder='検索' />
      </form>
      {loading ? (
        <table className='list'>
          <thead>
            <tr>
              <th>ID</th>
              <th>メモのタイトル</th>
              <th>閲覧</th>
              <th>編集</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((v, i) => {
              return (
                <tr key={i} className={i % 2 !== 0 ? 'tr_col' : ''}>
                  <td className='td1'>{v.id}</td>
                  <td>{v.title}</td>
                  <td className='td3'>
                    <Link to={`/post/${v.id}`}>
                      <FiExternalLink />
                    </Link>
                  </td>
                  <td className='td3'>
                    <Link to={`/edit/${v.id}`}>
                      <FiEdit />
                    </Link>
                  </td>
                  <td className='td3'>
                    <a
                      href='https://example.com'
                      onClick={e => {
                        deleteOne(e, v.id)
                      }}
                    >
                      <FiDelete />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>読み込み中…</p>
      )}
    </>
  )
}

export default Lists
