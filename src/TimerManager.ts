/*
 * Copyright (c) 2021. J <info_together@aliyun.com> All Rights Reserved.
 */

import TimerStore from './TimerStore';
import Timer from './Timer';

/**
 * TimerManager 封装
 * 旨在对外透出统一的定时器 API
 * 对小程序定时器自动化回收，防止定时器未回收导致内存泄漏，从而拖慢小程序
 */
class TimerManager {
  public timerStore: TimerStore;

  constructor() {
    this.timerStore = new TimerStore();
  }

  $setTimeout = (fn = () => {}, timeout = 0, ...arg: any[]) => {
    const timer = new Timer(false, fn, timeout, ...arg)
    return this.timerStore.addTimer(timer)
  }

  $setInterval = (fn = () => {}, timeout = 0, ...arg: any[]) => {
    const timer = new Timer(true, fn, timeout, ...arg)
    return this.timerStore.addTimer(timer)
  }

  $clearInterval = (id: number) => {
    this.timerStore.clear(id)
  }

  $clearTimeout = (id: number) => {
    this.timerStore.clear(id)
  }
}

export default TimerManager;
