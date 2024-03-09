import { EntityType } from '@/common/enum'
import WZImg from '@/assets/model/wzzsj.png'
import ZCImg from '@/assets/model/zczsj.png'
import SHIP052C from '@/assets/model/052c.png'
import SHIP052D from '@/assets/model/052d.png'
export const getEntityImgByType: (type: EntityType) => string = (type) => {
  switch (type) {
    case '武装直升机':
      return WZImg
      break
    case '侦察直升机':
      return ZCImg
      break
    case '中国052C型驱逐舰':
      return SHIP052C
      break
    case '中国052D型驱逐舰':
      return SHIP052D
      break
  }
}

// 判断两个数组是否相等的函数
export function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    console.log('数组长度不相同')
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false
    }
  }
  return true
}

export function getNowTimeStr() {
  let date = new Date()
  let sign2 = ':'
  let year = date.getFullYear() // 年
  let month = date.getMonth() + 1 // 月
  let day = date.getDate() // 日
  let hour = date.getHours() // 时
  let minutes = date.getMinutes() // 分
  let seconds = date.getSeconds() //秒
  let weekArr = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期天'
  ]
  let week = weekArr[date.getDay()]
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  return (
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    sign2 +
    minutes +
    sign2 +
    seconds
  )
}

export const AnimateLocation = {
  Horizon: {
    destination: {
      x: -2775228.521737669,
      y: 6118815.6230553435,
      z: 2526085.2443369217
    },
    orientation: {
      heading: 4.953770358299834,
      pitch: -0.44044659744233394,
      roll: 6.2808419049263895
    }
  },
  Center: {
    destination: {
      x: -10283936.168192875,
      y: 19678172.983217508,
      z: 15100326.347516868
    },
    orientation: {
      heading: 6.199818468187035,
      pitch: -1.5545666313622242,
      roll: 0
    }
  },
  Close: {
    destination: {
      x: -2922555.274720393,
      y: 9181825.794211542,
      z: 4033931.9343445865
    },
    orientation: {
      heading: 6.14736179653006,
      pitch: -1.2757343430195593,
      roll: 6.282080793165217
    }
  }
}
