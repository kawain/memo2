import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'

function Article ({ BASEURL }) {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const fetchAll = useCallback(() => {
    axios
      .get(`${BASEURL}index.php?id=${params.id}`)
      .then(res => {
        setPosts(res.data)
        setLoading(true)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [BASEURL, params.id])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return (
    <>
      {loading ? (
        <>
          <h2>
            {posts.id}: {posts.title}
          </h2>

          <div className='back'>
            <Link to={`/`}>
              <AiFillHome />
            </Link>
          </div>

          <pre className='code' contentEditable='true'>
            <code>{posts.content}</code>
          </pre>

          <div className='back'>
            <Link to={`/`}>
              <AiFillHome />
            </Link>
          </div>
        </>
      ) : (
        <p>読み込み中…</p>
      )}
    </>
  )
}

export default Article
