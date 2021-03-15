import React from 'react';
import './App.css';
import { useFetchData } from './hooks/fetchData'
function App() {
  const { loading, data, error, pageChange} = useFetchData({
    fetch: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              list: [{
                name: '黄龙1',
                id: 'id1',
              },{
                name: '黄龙2',
                id: 'id2',
              }, {
                name: '黄龙3',
                id: 'id3',
              }],
              total: 23,
            },
            success: true,
            message: 'xxx',
          })
        }, 1000)
      })
    }
  })
  return (
    <div className={loading ? 'app-loading' : 'app'}>
      <div className="content">
        {!!error ? <div>{error}</div> : data.length > 0 && data.map((item) => {
          return <div key={item.id}>{item.name}</div>
        })}
      </div>
      {loading && <div className="loading">loading</div>}
      <div className="pagenation">
        <span className="page" onClick={() => pageChange(1)}>1</span>
        <span className="page" onClick={() => pageChange(2)}>2</span>
        <span className="page" onClick={() => pageChange(3)}>3</span>
      </div>
    </div>
  );
}

export default App;
