/*
 * Copyright (c) 2021. J <info_together@aliyun.com> All Rights Reserved.
 */
/* eslint-disable no-undef */
// @ts-nocheck
import Timer from './Timer'
import TimerStore from './TimerStore'
/**
 * @description 小程序定时器管理器 TimerManager 的 Behavior 封装
 *
 * @example
 *
 * import TimerManagerBehavior from '@/behaviors/timerManager/TimerManagerBehavior4Wechat'
 **
 * // 在页面中使用
 * Page({
 *   behaviors: [TimerBehavior],
 *   onReady() {
 *     this.$setTimeout(() => {
 *       console.log('setTimeout')
 *     })
 *     this.$setInterval(() => {
 *       console.log('setTimeout')
 *     })
 *   }
 * })
 *
 * // 在组件中使用
 * Components({
 *   behaviors: [TimerBehavior],
 *   ready() {
 *     this.$setTimeout(() => {
 *       console.log('setTimeout')
 *     })
 *     this.$setInterval(() => {
 *       console.log('setTimeout')
 *     })
 *   }
 * })
 *
 *
 */
const TimerManagerBehavior = Behavior({
  created () {
    this.$timerStore = new TimerStore();
  },
  detached () {
    this.$timerStore.hide();
  },
  pageLifetimes: {
    show () {
      this.$timerStore.show()
    },
    hide () {
      this.$timerStore.hide()
    }
  },
  methods: {
    $setTimeout (fn = () => {}, timeout = 0, ...arg: any[]) {
      const timer = new Timer(false, fn, timeout, ...arg)
      return this.$timerStore.addTimer(timer)
    },
    $setInterval (fn = () => {}, timeout = 0, ...arg: any[]) {
      const timer = new Timer(true, fn, timeout, ...arg)
      return this.$timerStore.addTimer(timer)
    },
    $clearInterval (id) { this.$timerStore.clear(id) },
    $clearTimeout (id) { this.$timerStore.clear(id) },
  }
})

export default TimerManagerBehavior;
