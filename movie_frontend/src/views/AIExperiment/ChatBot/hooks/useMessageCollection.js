import { useState } from 'react'

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */
const useMessageCollection = () => {
  const initialMsg = {
    id: 1,
    createdAt: Date.now(),
    text: '**你好!** *我是经过prompt微调后的智能机器人movieGPT，在聊天框左侧可以设置使用chatGPT聊天或者dalle绘画，您有何吩咐?*',
    ai: true
  }
  const [messages, setMessages] = useState([initialMsg]);

  /**
  * A function for adding a new message to the collection.
  *
  * @param {Object} message - The message to add to the collection.
  */
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  }

  const clearMessages = () => setMessages([initialMsg])

  return [messages, addMessage, clearMessages];
}

export default useMessageCollection