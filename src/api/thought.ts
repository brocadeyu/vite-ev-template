import http from '@/utils/http'
export const getThoughtList = () =>
  new Promise((resolve, reject) => {
    http({
      url: '/assumption/list',
      method: 'post',
      data: {
        pageInfo: {
          pageNum: 1,
          pageSize: 100
        }
      }
    })
      .then((res) => {
        if (res.code === 200) {
          resolve(res.result)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
export const updateThought = () =>
  new Promise((resolve, reject) => {
    http({
      url: '/assumption/update',
      method: 'post',
      data: {
        pageInfo: {
          pageNum: 1,
          pageSize: 100
        }
      }
    })
      .then((res) => {
        if (res.code === 200) {
          resolve(res.result)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

export const saveCreateThought = (data) =>
  new Promise((resolve, reject) => {
    const { jsonData, name } = data
    http({
      url: '/assumption/insert',
      method: 'post',
      data: {
        belong: '',
        filepath: '',
        id: 0,
        jsonData: jsonData,
        location: '',
        name: name,
        pageInfo: {
          pageNum: 0,
          pageSize: 0,
          totalCount: 0,
          totalPage: 0
        },
        time: ''
      }
    })
      .then((res) => {
        if (res.code === 200) {
          resolve(res.result)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

// export const getThoughtList = () =>
//   new Promise((resolve, reject) => {
//     http({
//       url: '/test',
//       method: 'get'
//     })
//       .then((res) => {
//         if (res.code === 200) {
//           resolve(res.result)
//         }
//       })
//       .catch((e) => {
//         reject(e)
//       })
//   })
