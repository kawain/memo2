import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'

function Article ({ BASEURL }) {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  const fetchAll = useCallback(() => {
    axios
      .get(`${BASEURL}index.php?id=${params.id}`)
      .then(res => {
        setPosts(res.data)
        setContent(res.data.content) // 初期コンテンツを設定
        setLoading(true)
      })
      .catch(error => {
        console.log(error)
      })
  }, [BASEURL, params.id])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleInput = e => {
    setContent(e.target.innerText)
  }

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

          <pre
            className='code'
            contentEditable='true'
            suppressContentEditableWarning={true}
            onInput={handleInput}
          >
            <code>{content}</code>
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
