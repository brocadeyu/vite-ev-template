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
