/* eslint-disable no-console */
// store/webSocketStore.ts

import { defineStore } from 'pinia'
import WebSocketService from '@/utils/websocket'

export const useWebSocketStore = defineStore('webSocket', () => {
  const webSocket = ref<WebSocketService | null>(null)
  const connect: (url: string) => void = (url) => {
    webSocket.value = new WebSocketService(url)
    webSocket.value.connect()
  }
  const sendMessage: (message: obj) => void = (message) => {
    if (webSocket.value) {
      webSocket.value.send(message)
    } else {
      console.error('WebSocket is not connected.')
    }
  }
  const on: (event: string | number, listener: (data: any) => void) => void = (
    event,
    listener
  ) => {
    webSocket.value.on(event, listener)
  }
  const off: (event: string | number) => void = (event) => {
    webSocket.value.off(event)
  }
  const disconnect: () => void = () => {
    if (webSocket.value) {
      webSocket.value.close()
      webSocket.value = null
    } else {
      console.error('WebSocket is not connected.')
    }
  }

  return {
    connect,
    sendMessage,
    disconnect,
    on,
    off
  }
})
