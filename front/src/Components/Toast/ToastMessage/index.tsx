import React from 'react';

import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../Assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../Assets/images/icons/check-circle.svg';

export interface IToastMessage {
  message: IMessage
  onRemoveMessage: (id: number) => void;
}

export interface IMessage {
  id: number;
  text: string;
  type: IType;
  duration?: number;
}

export type IType = 'default' | 'success' | 'danger';

export default function ToastMessage({
  message,
  onRemoveMessage,
}: IToastMessage) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}
