export default {
    name:'router-view',
    data(){
        return {
            routerView:false
        }
    },
    // data是router-view自己的'状态'
    functional:true, //函数组件，不用 new创造组件实例，没有 this，没有生命周期
    render(h,{parent,data}){
        // NOTE parent 当前router-view组件的父组件 ，data是这组件的一些标识
        // this.$route 有 matched 属性 这个属性有几个就依次将它赋到对应的router-view上面
        let depth = 0
        let route = parent.$route; //当前活跃的路由
        // console.log(route) //"/about/b"
        data.routerView = true //标识路由属性 给'router-view'组件加routerView：true ，以便
        // 让它的子组件router-view进行判断 depth++ 
        
        // NOTE router-view组件的父组件可能是普通的Vue组件也可能是另外一个router-view
        // NOTE 只有父组件拥有 routerView:true 说明是router-view这个类型的父组件，需要 depth += 1
        while(parent){
            // console.log(depth)
            // 如果有2层 router-view 这个if循环会执行1次
            // 如果有3层 router-view 这个if循环会执行2次
            /**
             * <router-view routerView=true>
             *       ...
             *      <router-view routerView=true>
             *          ...
             *          <router-view routerView=true>
             *          </router-view>
             *          ...
             *      </router-view>
             *      ...
             * </router-view>
             * 这个就是三层嵌套
             */
            //TAG 1、当前router-view处于最里面那一层的时候，就会一直向上层查找带有routerView=true的标签
            //TAG 2、也就是 router-view组件，找到一个就会把 depth 加 1，从而能够确定自己所处的层次，普通
            //TAG 3、的组件没有 routerView 这个属性 父组件的虚拟节点：parent?.$vnode
            if(parent?.$vnode?.data?.routerView){
                depth += 1
            }
            parent = parent.$parent
        }
        // depth为 当前router-view组件 最终的层次
        let record =  route.matched[depth]
        // 第一次 vue-component-3-App
        // 第二次 vue-component-4-my-about上面有data，data上面有routerView   vue-component-3-App
        if(!record){
            return h()//创建一个空元素
        }
        return h(record.component,data)
    }
}