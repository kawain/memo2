import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { FiExternalLink, FiEdit, FiDelete } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Create from './Create';

function Lists({ BASEURL, count, setCount, year }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const search = useRef(null);

  // 全ての投稿を取得する関数
  const fetchAll = useCallback(() => {
    axios
      .get(`${BASEURL}index.php?mode=all`)
      .then(res => {
        setPosts(res.data);
        setCount(res.data.length);
        setLoading(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [BASEURL, setCount]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll, count]);

  // 検索を処理する関数
  function handleSearch(e) {
    e.preventDefault();
    axios
      .get(`${BASEURL}index.php?q=${search.current.value}`)
      .then(res => {
        setPosts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // 投稿を削除する関数
  function deleteOne(e, id) {
    e.preventDefault();
    let result = window.prompt('本当に削除していいですか？');
    if (result) {
      if (parseInt(result) !== year) {
        return;
      }
      axios
        .delete(`${BASEURL}index.php`, { data: { id: id } })
        .then(res => {
          if (res.data.ok === 'deleted') {
            setCount(pre => pre - 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // 投稿リストの行をレンダリングする関数
  function renderPostRow(post, index) {
    return (
      <tr key={index} className={index % 2 !== 0 ? 'tr_col' : ''}>
        <td className='td1'>{post.id}</td>
        <td>{post.title}</td>
        <td className='td3'>
          <Link to={`/post/${post.id}`}>
            <FiExternalLink />
          </Link>
        </td>
        <td className='td3'>
          <Link to={`/edit/${post.id}`}>
            <FiEdit />
          </Link>
        </td>
        <td className='td3'>
          <a
            href='https://example.com'
            onClick={e => {
              deleteOne(e, post.id);
            }}
          >
            <FiDelete />
          </a>
        </td>
      </tr>
    );
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
            {posts.map((post, index) => renderPostRow(post, index))}
          </tbody>
        </table>
      ) : (
        <p>読み込み中…</p>
      )}
    </>
  );
}

export default Lists;
