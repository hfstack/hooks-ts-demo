# fetchData hooks api  
---
使用示例
```
const { loading, page, pageSize, data, error, pageChange} = useFetchData({
    fetch: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              list: [{
                name: '黄龙1',
                id: 'id1',
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
```

- loading: 当前loading状态
- data: 列表数据
- error: 获取数据异常
- pageChage: 修改页数
- page: 当前页数
- pageSize: 当前每页数
- fetch: 获取数据的ajax请求，支持page及pagesize 传参


### 新得

使用自定义hooks可以更容易的将通用逻辑统一封装。提高了代码的复用性及可维护性。我们可以将一些业务中经常用到的逻辑抽离成一些自定义hooks进行统一维护。这样可以一方面可以减少代码量，另一方面提高开发效率。




