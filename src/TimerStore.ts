/*
 * Copyright (c) 2021. J <info_together@aliyun.com> All Rights Reserved.
 */

import Timer from './Timer'

export type TimerStoreS = Map<number, Timer>;

class TimerStore {
  private readonly store: TimerStoreS
  private isActive: boolean

  constructor() {
    this.store = new Map();
    this.isActive = true;
  }

  addTimer = (timer: Timer) => {
    this.store.set(timer.id, timer);
    this.isActive && timer.start(this.store);

    return timer.id;
  }

  show = () => {
    /* 没有隐藏，不需要恢复定时器 */
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.store.forEach(timer => timer.start(this.store));
  }

  hide = () => {
    this.store.forEach(timer => timer.suspend());
    this.isActive = false;
  }

  clear = (id: number) => {
    const timer = this.store.get(id);
    if (!timer) {
      return;
    }

    clearTimeout(timer.timerId);
    timer.timerId = undefined;
    this.store.delete(id);
  }
}

export default TimerStore;

