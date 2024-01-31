import http from '@/utils/http'
export const getThoughtList = () => {
  return http({
    url: '/test',
    method: 'get'
  })
}
