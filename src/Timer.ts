/*
 * Copyright (c) 2021. J <info_together@aliyun.com> All Rights Reserved.
 */
/* eslint-disable no-restricted-globals */
import { TimerStoreS } from './TimerStore'

class Timer {
  static count = 0;

  id: number
  timerId: ReturnType<typeof setTimeout> | undefined

  private readonly fn: (args?: any) => void
  private readonly timeout: number
  private readonly isInterval: boolean
  private readonly args: any[]
  private startTime: number | undefined
  private restTime: number

  /**
   *
   * @param isInterval 是否是 setInterval
   * @param fn 回调函数
   * @param timeout 定时器执行时间间隔
   * @param args 定时器其他参数
   */
  constructor(isInterval = false, fn = () => {}, timeout = 0, ...args: any[]) {
    this.id = ++Timer.count;
    this.fn = fn;
    this.timeout = timeout;
    this.restTime = timeout;
    this.isInterval = isInterval;
    this.args = args;
  }

  /**
   * 启动或恢复定时器
   */
  start = (timerStore: TimerStoreS) => {
    this.startTime = +new Date();

    if (this.isInterval) {
      /* setInterval */
      const cb = (...args: any[]) => {
        this.fn(...args);
        /* timerId 为空表示被 clearInterval */
        if (this.timerId) {
          this.timerId = setTimeout(cb, this.timeout, ...this.args);
        }
      }
      this.timerId = setTimeout(cb, this.restTime, ...this.args);
      return;
    }

    /* setTimeout  */
    const cb = (...args: any[]) => {
      this.fn(...args);
      /* 运行结束，移除定时器，避免内存泄漏 */
      timerStore.delete(this.id)
    }

    this.timerId = setTimeout(cb, this.restTime, ...this.args);
  }

  /**
   * 暂停定时器
   */
  suspend = () => {
    if (this.timeout > 0) {
      const now = +new Date();
      const nextRestTime = this.restTime - (now - (this.startTime || 0));
      const intervalRestTime = nextRestTime >= 0 ? nextRestTime : this.timeout - (Math.abs(nextRestTime) % this.timeout);
      this.restTime = this.isInterval ? intervalRestTime : nextRestTime;
    }
    this.timerId && clearTimeout(this.timerId);
  }

}

export default Timer;

