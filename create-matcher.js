import createRouteMap from './create-route-map';
import {createRoute } from './history/base'

export default function createMatcher(routes){
    // NOTE: pathList -> ['/','/about','/about/a','/about/b'] 把所有路由组成一个数组
    // NOTE: pathMap -> { /:{},/about: {},/about/a: {},/about/b: {}} 地址对应组件的关系
    let { pathList,pathMap } = createRouteMap(routes)

    // console.log(pathList,pathMap)

    // NOTE： 根据用户输入的路径，获取对应的匹配记录
    function match(location){
        // console.log(location)
        let record = pathMap[location]
        return createRoute(record,{
            path:location
        })
    }

    function addRoutes(routes){// routes动态添加的路由
        createRouteMap(routes,pathList,pathMap)
    }

    return {
        match,
        addRoutes
    }
}