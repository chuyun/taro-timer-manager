/*
 * Copyright (c) 2021. J <info_together@aliyun.com> All Rights Reserved.
 */
/* eslint-disable no-undef */
// @ts-nocheck
import TimerManager from './TimerManager';
/**
 * @description 小程序定时器管理器 TimerManager 的 Behavior 封装
 *
 * @example
 *
 * import Taro, { useEffect, useScope } from '@tarojs/taro';
 * import TimerManagerBehavior from '@/behaviors/timerManager/TimerManagerBehavior'
 *
 * // Taro 使用范例 (非Taro 环境建议使用 TimerManagerBehavior4Wechat.ts )
 *
 * // Taro Class 使用
 * class DemoCenter extends Taro.Component<any, any> {
 *   static behaviors = [
 *     TimerManagerBehavior
 *   ]
 *
 *   constructor() {
 *     super()
 *   }
 *
 *   timerManger
 *   timerId;
 *
 *   componentWillMount() {
 *     // 注意，由于 Behaviors 的生命周期及挂载时机，在此之前未挂载，请勿获取 TimeManager 实例
 *     this.timerManger = this.$scope.$timerManager;
 *   }
 *
 *   componentDidMount() {
 *     this.timerId = this.timerManger.$setTimeout(() => {
 *       console.warn('$setTimeout>>>>', new Date());
 *     }, 2000);
 *   }
 *
 *   componentWillUnmount() {
 *     this.clearTimer();
 *   }
 *
 *   clearTimer = () => {
 *     this.timerManger.$clearTimeout(this.timerId);
 *     this.timerId = null;
 *   }
 *
 *   render() {
 *     return (
 *       <View onClick={this.clearTimer}>
 *         小程序定时器管理器
 *       </View>
 *     )
 *   }
 * }
 *
 * export default DemoCenter;
 *
 *
 * // Taro Hooks 使用
 * const DemoCenter = () => {
 *   const scope = useScope();
 *   const timerManger = scope.$timerManager;
 *   let timerId;
 *   const clear = () => {
 *     timerId && timerManger.$clearInterval(timerId);
 *     timerId = null;
 *   }
 *   useEffect(()=>{
 *    timerId = timerManger.$setInterval(()=>{
 *       console.warn('$setInterval', new Date());
 *     }, 500);
 *    // 理论上不手动回收时 TimerManager 在页面卸载、组件卸载时会自动回收
 *    // 但是不推荐完全依赖自动回收，开发者要养成好习惯，主动清理计时器
 *    return () => {
 *      clear()
 *    }
 *   },[])
 *
 *   return (
 *     <View onClick={()=>{clear()}}>小程序定时器管理器</View>
 *   );
 * }
 * DemoCenter.behaviors = [
 *   TimerManagerBehavior
 * ]
 *
 * export default DemoCenter;
 *
 *
 */
const TimerManagerBehavior = Behavior({
  created () {
    this.$timerManager = new TimerManager();
  },
  detached () {
    this.$timerManager.timerStore.hide();
  },
  pageLifetimes: {
    show () {
      this.$timerManager.timerStore.show()
    },
    hide () {
      this.$timerManager.timerStore.hide()
    }
  },
  methods: {
    // Taro 对实现 Behavior 存在缺陷，导致 methods 无法挂载
    // 已改为由 TimerManager 统一封装
    // 方法统一挂载在 this.$scope.$timerManage 空间下
  }
})

export default TimerManagerBehavior;
