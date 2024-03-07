/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { WS_EVENT } from '@/common/enum'
export type EventHandler = (args: any) => void
class EventRegistry {
  private events: Record<number, EventHandler> = {}
  //注册事件
  on(eventTypeEnum: number, handler: EventHandler) {
    this.events[eventTypeEnum] = handler
  }
  //注销事件
  off(eventTypeEnum: number) {
    delete this.events[eventTypeEnum]
  }
  //触发事件
  emit(eventTypeEnum: number, args?: any) {
    const handler = this.events[eventTypeEnum]
    handler && handler(args)
  }
}
export default class WebSocketService {
  private socket: WebSocket | null = null
  private url: string
  private eventRegistry: EventRegistry = new EventRegistry()

  constructor(url: string) {
    this.url = url
  }

  connect(): void {
    this.socket = new WebSocket(this.url)
    this.socket.onopen = this.onOpen.bind(this)
    this.socket.onclose = this.onClose.bind(this)
    this.socket.onerror = this.onError.bind(this)
    this.socket.onmessage = this.onMessage.bind(this)
  }

  on(eventTypeEnum: number, listener: EventHandler) {
    this.eventRegistry.on(eventTypeEnum, listener)
  }

  off(eventTypeEnum: number) {
    this.eventRegistry.off(eventTypeEnum)
  }

  private onOpen(event: Event): void {
    this.eventRegistry.emit(WS_EVENT.onopen)
  }

  private onClose(event: CloseEvent): void {
    this.eventRegistry.emit(WS_EVENT.onclose)
  }

  private onError(event: Event): void {
    console.error('WebSocket error:', event)
    this.eventRegistry.emit(WS_EVENT.onerror)
  }

  private onMessage(event: MessageEvent): void {
    try {
      const parseData = JSON.parse(event.data)
      if (
        Object.prototype.toString.call(parseData) === '[object Array]' &&
        'link' in parseData[0]
      ) {
        return this.eventRegistry.emit(WS_EVENT.createLink, parseData[0])
      }
      if (
        parseData.InteractType === 'SimStateChange' &&
        parseData.SimEnigenState === '3'
      ) {
        return this.eventRegistry.emit(WS_EVENT.initialSuccess)
      }
      if (parseData.InteractType.includes('DataLinkCheckRes')) {
        return this.eventRegistry.emit(
          WS_EVENT.validateLinkRes,
          parseData.Param
        )
      }
    } catch (error) {
      console.error('解析WS消息出错:', error)
    }
  }

  send(data: object): void {
    if (this.socket) {
      this.socket.send(JSON.stringify(data))
    } else {
      console.error('WebSocket is not connected.')
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    } else {
      console.error('WebSocket is not connected.')
    }
  }
}
