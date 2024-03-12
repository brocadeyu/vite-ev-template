import http from '@/utils/http'
import moment from 'moment'
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
interface saveThoughtParam {
  jsonData: any
  name: string
  id: number
}
export const saveCreateThought = (param: saveThoughtParam) =>
  new Promise((resolve, reject) => {
    const { jsonData, name, id } = param
    http({
      url: '/assumption/insert',
      method: 'post',
      data: {
        belong: '',
        filepath: '',
        id: id,
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

export const saveUpdateThought = (param: saveThoughtParam) =>
  new Promise((resolve, reject) => {
    const { id, jsonData, name } = param
    http({
      url: '/assumption/update',
      method: 'post',
      data: {
        belong: '',
        filepath: '',
        id: id,
        jsonData: jsonData,
        location: '',
        name: name,
        pageInfo: {
          pageNum: 0,
          pageSize: 0,
          totalCount: 0,
          totalPage: 0
        },
        time: moment().format()
      }
    })
      .then((res) => {
        // console.log('res', res)
        if (res.code === 200) {
          resolve(res.result)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

export const deleteThoughtById = (id: number) =>
  new Promise((resolve, reject) => {
    http({
      url: '/assumption/delete',
      method: 'post',
      data: {
        belong: '',
        filepath: '',
        id: id,
        jsonData: '',
        location: '',
        name: '',
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
        // console.log('res', res)
        if (res.code === 200) {
          resolve(res.result)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
//获取模拟发送数据库字段
export const getSimulateSendDBText = () =>
  new Promise((resolve, reject) => {
    http({
      url: '/dataLinkMark/list',
      method: 'get'
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
