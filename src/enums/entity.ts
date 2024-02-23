export enum EntityTypeEnum {
  武装直升机,
  侦察直升机,
  中国052C型驱逐舰,
  中国052D型驱逐舰
}

export type EntityType = keyof typeof EntityTypeEnum

// type a = keyof typeof EntityTypeEnum
