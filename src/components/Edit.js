import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'

function Edit ({ BASEURL }) {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const fetchAll = useCallback(() => {
    axios
      .get(`${BASEURL}index.php?id=${params.id}`)
      .then(res => {
        setLoading(true)
        setTitle(res.data.title)
        setContent(res.data.content)
      })
      .catch(error => {
        console.log(error)
      })
  }, [BASEURL, params.id])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  function handleEdit (e) {
    e.preventDefault()
    const obj = {
      id: params.id,
      title: title,
      content: content
    }

    axios
      .put(`${BASEURL}`, obj)
      .then(response => {
        if (response.data.ok === 'updated') {
          navigate('/')
        }
      })
      .catch(error => {
        console.log('ERROR!! occurred in Backend.', error)
      })
  }

  return (
    <>
      {loading ? (
        <>
          <div className='back'>
            <Link to={`/`}>
              <AiFillHome />
            </Link>
          </div>

          <form onSubmit={handleEdit} className='create_form'>
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              wrap='off'
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button>編集</button>
          </form>
        </>
      ) : (
        <p>読み込み中…</p>
      )}
    </>
  )
}

export default Edit
