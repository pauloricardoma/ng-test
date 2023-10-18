import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IReactPortal {
  containerId: string;
  children: ReactNode;
}

export default function ReactPortal({
  containerId,
  children = 'portal-root',
}: IReactPortal) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}
