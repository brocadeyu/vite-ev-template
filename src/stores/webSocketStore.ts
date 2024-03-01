/* eslint-disable no-console */
import { defineStore } from 'pinia'
import WebSocketService from '@/utils/websocket'
import { EventHandler } from '@/utils/websocket'
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
  const addEventListener: (
    eventType: number,
    listener: EventHandler
  ) => void = (eventType, listener) => {
    webSocket.value.on(eventType, listener)
  }
  const removeEventListener: (eventType: number) => void = (eventType) => {
    webSocket.value.off(eventType)
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
    disconnect,
    sendMessage,
    addEventListener,
    removeEventListener
  }
})
