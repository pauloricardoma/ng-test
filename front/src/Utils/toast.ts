import { IType } from '../Components/Toast/ToastMessage';
import EventManager from '../Lib/EventManager';

export const toastEventManager = new EventManager();

export interface IToast {
  type: IType;
  text: string;
  duration?: number;
}

export default function toast({ type, text, duration }: IToast) {
  toastEventManager.emit('addtoast', { type, text, duration });
}
