/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { WS_EVENT } from '@/common/enum'

type WebSocketEventMap = {
  [event: string]: (data: any) => void
}
class EventMap {
  map: WebSocketEventMap = {}
  on(event: string | number, listener: (data: any) => void) {
    this.map[event] = listener
  }
  off(event: string | number) {
    delete this.map[event]
  }
  get(event: string | number) {
    return this.map[event]
  }
}
export default class WebSocketService {
  private socket: WebSocket | null = null
  private url: string
  private eventMap: EventMap

  constructor(url: string) {
    this.url = url
    this.eventMap = new EventMap()
  }

  connect(): void {
    this.socket = new WebSocket(this.url)
    this.socket.onopen = this.onOpen.bind(this)
    this.socket.onclose = this.onClose.bind(this)
    this.socket.onerror = this.onError.bind(this)
    this.socket.onmessage = this.onMessage.bind(this)
  }
  on(event: string | number, listener: (data: any) => void) {
    this.eventMap.on(event, listener)
  }
  off(event: string | number) {
    this.eventMap.off(event)
  }

  private onOpen(event: Event): void {
    const callback = this.eventMap.get(WS_EVENT.onopen)
    callback && callback()
  }

  private onClose(event: CloseEvent): void {
    const callback = this.eventMap.get(WS_EVENT.onclose)
    callback && callback()
  }

  private onError(event: Event): void {
    console.error('WebSocket error:', event)
    const callback = this.eventMap.get(WS_EVENT.onerror)
    callback && callback()
  }

  private onMessage(event: MessageEvent): void {
    console.log('WebSocket message received:', event.data)
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
