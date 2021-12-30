# Taro 小程序定时器管理器 TimerManager

Taro 定时器管理器，旨在合理地使用 setTimeout 和 setInterval，在页面或者组件卸载时自动卸载定时器，在页面显示时重启定时器，页面隐藏时暂停定时器，减少内存泄漏隐患。

## 使用

1、安装

`yarn add taro-timer-manager`

2、使用

```javascript
// 使用 Hook 组件时

import Taro, { useEffect, useScope } from '@tarojs/taro';
import { View } from '@tarojs/components';
import TimerManagerBehavior from 'taro-timer-manager'

const DemoCenter = () => {
    const scope = useScope();
    const timerManger = scope.$timerManager;
    let timerId;
    const clear = () => {
        timerId && timerManger.$clearInterval(timerId);
    }
    useEffect(()=>{
        timerId = timerManger.$setInterval(()=>{
            console.warn('$setInterval', new Date());
        }, 500);
        // 理论上不自动回收 TimerManager 在
        return () => {
            clear()
        }
    },[])

    return (
        <View onClick={()=>{clear()}}>小程序定时器管理器</View>
    );
}
DemoCenter.behaviors = [
    TimerManagerBehavior
]
export default DemoCenter;

```

```javascript
// 使用 Class 组件时

import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import TimerManagerBehavior from 'taro-timer-manager'

class DemoCenter extends Taro.Component<any, any> {
    static behaviors = [
        TimerManagerBehavior
    ]
    constructor() {
        super()
    }

    timerManger
    timerId;

    componentWillMount() {
        // 注意，由于 Behaviors 的生命周期及挂载时机，在此之前未挂载，请勿获取 TimeManager 实例
        this.timerManger = this.$scope.$timerManager;
    }

    componentDidMount() {
        this.timerId = this.timerManger.$setTimeout(() => {
            console.warn('$setTimeout>>>>', new Date());
        }, 2000);
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    clearTimer = () => {
        this.timerManger.$clearTimeout(this.timerId);
        this.timerId = null;
    }

    render() {
        return (
            <View onClick={this.clearTimer}>
                小程序定时器管理器
            </View>
        )
    }
}

export default DemoCenter;

```

## TODO
- [x] 支持微信小程序
- [ ] Taro3 适配
- [ ] 支付宝小程序适配

## eslint 配置
为了让团队更好地遵守定时器使⽤规范，可以配置 eslint 增加代码提示，配置如下：
```javascript
module.exports = {
    "rules": {
        "no-restricted-globals": [
            "error", {
                "name": "setTimeout",
                "message": "Please use TimerBehavior and this.$setTimeout instead. see the link: https://github.com/chuyun/taro-timer-manager"
            }, {
                "name": "setInterval",
                "message": "Please use TimerBehavior and this.$setInterval instead. see the link: https://github.com/chuyun/taro-timer-manager"
            }, {
                "name": "clearInterval",
                "message": "Please use TimerBehavior and this.$clearInterval instead. see the link: https://github.com/chuyun/taro-timer-manager"
            }, {
                "name": "clearTimout",
                "message": "Please use TimerBehavior and this.$clearTimout  instead. see the link: https://github.com/chuyun/taro-timer-manager"
            }]
    }
}

```

## 致谢
本管理器底层来源于 [timer-miniprogram](https://github.com/o2team/timer-miniprogram), 针对解决了 Taro2 上 Behavior 的 methods 无法挂载的问题，如果使用 微信原生语法，建议使用原作者提供的库 （P.s 也可使用对应封装的 TimerManagerBehavior4Wechat 版本）


## License
MIT License

Copyright (c) 2021 chuyun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.





