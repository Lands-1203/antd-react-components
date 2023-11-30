import EventEmitter from 'eventemitter3';
export default function getNewEmitter3<T extends Record<string, any> = any>() {
  return new EventEmitter<T>();
}
