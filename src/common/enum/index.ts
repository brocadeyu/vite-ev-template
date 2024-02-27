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
  createLink //创建数据链
}
export type WSEventType = keyof typeof WS_EVENT
