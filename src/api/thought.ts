import http from '@/utils/http'
export const getThoughtList = () =>
  new Promise((resolve) => {
    http({
      url: '/assumption/list',
      method: 'post',
      data: {
        pageInfo: {
          pageNum: 1,
          pageSize: 100
        }
      }
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      if (res.code === 200) {
        resolve(res.result)
      }
    })
  })
