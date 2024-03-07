export enum EntityTypeEnum {
  武装直升机,
  侦察直升机,
  中国052C型驱逐舰,
  中国052D型驱逐舰
}

export type EntityType = keyof typeof EntityTypeEnum

export enum WS_EVENT {
  onopen, //连接
  onclose, //关闭
  onerror, //错误
  createLink, //创建数据链
  validateLinkRes, //校验数据链
  initialSuccess //初始化加载想定成功
}
export type WSEventType = keyof typeof WS_EVENT

export enum Link_Type {
  '综合链',
  '90X链',
  'JIDS链',
  'KU卫通'
}

export type LinkType = keyof typeof Link_Type
