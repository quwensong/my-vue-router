import { RouterLink, RouterView} from "./components";

export let Vue = null;
// 注册全局组件
const install = function(_Vue){

    Vue = _Vue;

    // NOTE：1.每个子组件都可以获取到router属性 --> Vue.mixin()
    Vue.mixin({
        beforeCreate() {
            // TAG: 如果有router,说明当前的this(实例)是根实例，也就是 new Vue({router})
            // console.log(this.$options.name)
            if(this.$options.router){
                // 根实例
                this._routerRoot = this 
                // this == Vue
                // Vue._routerRoot._router = router
                // main.js中用户new Vue的时候传入的 router
                this._router = this.$options.router
                // 当前用户的router属性
                this._router.init(this)
                // 给当前Vue实例上面添加一个响应式对象 _route
                // 如果用户更改了current 是没有效果的，需要把 _route 也进行更新
                Vue.util.defineReactive(this,'_route',this._router.history.current)

            }else{
                // 子实例
                // NOTE: 2.这里所有的子组件都拥有了 this._routerRoot 属性
                this._routerRoot = this.$parent?._routerRoot
            }
        },
    })
    Object.defineProperty(Vue.prototype,'$route',{
        get(){
            // 取当前活跃路由,current
            return this._routerRoot?._route
        }
    })
    Object.defineProperty(Vue.prototype,'$router',{
        get(){
            // 取当前路由实例对象 router
            return this._routerRoot?._router
        }
    })

    
    Vue.component('router-link',RouterLink)
    Vue.component('router-view',RouterView)
}

export {
    install
}