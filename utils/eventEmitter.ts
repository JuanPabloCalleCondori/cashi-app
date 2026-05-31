// Sistema simple de notificación de eventos
type Listener = () => void
type EventType = "categories-changed" | "transactions-changed"

const listeners: Record<EventType, Listener[]> = {
  "categories-changed": [],
  "transactions-changed": [],
}

export const eventEmitter = {
  on: (event: EventType, listener: Listener) => {
    listeners[event].push(listener)
    // Retornar una función para desuscribirse
    return () => {
      listeners[event] = listeners[event].filter(
        (l) => l !== listener
      )
    }
  },

  emit: (event: EventType) => {
    listeners[event].forEach((listener) => {
      listener()
    })
  },

  clear: (event: EventType) => {
    listeners[event] = []
  },
}
