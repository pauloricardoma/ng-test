import React, { useCallback, useEffect, useState } from 'react';

import { Container } from './styles';

import ToastMessage, { IMessage } from '../ToastMessage';

import { IToast, toastEventManager } from '../../../Utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: IToast) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
