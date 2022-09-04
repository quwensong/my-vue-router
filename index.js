import { install } from './install'
import createMatcher from './create-matcher';
import HashHistory from './history/hashHistory';
import BrowserHistory from './history/browserHistory';


class VueRouter {
    constructor(options){
        // this --> 当前路由实例对象
        // NOTE1.创建匹配器 1.匹配功能 match 2.可以添加匹配动态路由添加 addRoutes权限
        this.matcher = createMatcher(options.routes || [])
        // NOTE2.创建历史管理 (hash模式,history模式(浏览器api))
        this.mode = options.mode || 'hash';
        switch(this.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowserHistory(this)
                break;
        }
    }
    // TODO: 这里的app表示最外层的new Vue({})实例
    init(app){ 
        //根据用户配置，配置出一个映射表
        // 需要根据当前路径实现页面跳转的逻辑
        const history = this.history;
        // 跳转路径 会进行匹配操作 根据路径获取对应的记录
        // NOTE 1、transitonTo父类实现 --> 跳转逻辑 hash,browser模式都有
        // NOTE 2、getCurrentLocation子类实现 hash才有 --> hash,browser实现不一样
        // NOTE 3、setupListener 每个都有， hash监听
        const setupHashListener = () => {
            history.setupListener()
        }
        // 1、跳转路径 2、进行监控
        history.transitonTo(history.getCurrentLocation(),setupHashListener);

        // 初始化的时候都需要调用更新_route的方法
        // 只要current变化都需要触发更新
        history.listen((route)=>{
            console.log('history.listen调用');
            app._route = route;
        })
    }
    // 通过路由地址 匹配出 组件
    match(location){
        console.log(this.matcher.match(location))
        return this.matcher.match(location)
    }
    push(location){
        window.location.hash = location
    }
}

VueRouter.install = install

export default VueRouter;