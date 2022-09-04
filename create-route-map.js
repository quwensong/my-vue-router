function addRouteRecord(route,pathList,pathMap,parentRecord) {
    // NOTE: pathList -> ['/','/about','/about/a','/about/b'] 把所有路由组成一个数组
    // NOTE: pathMap -> { /:{path:...,component:...},/about: {},/about/a: {},/about/b: {}} 地址对应组件的关系
    const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path
    let record = { //根据当前路由产生记录 path / component
        path:path,
        component:route.component,
        parent:parentRecord //保存一下父路径
    }
    if(!pathMap[path]){
        pathMap[path] = record
        pathList.push(path)
    }
    if(route.children){
        route.children.forEach(child => {
            addRouteRecord(child,pathList,pathMap,record)
        })
    } 
}

export function createRouteMap(routes,oldPathList,oldPathMap ){
    let pathList = oldPathList || []
    let pathMap = oldPathMap || {}
    routes.forEach((route)=>{
        addRouteRecord(route,pathList,pathMap)
    })

    return {
        pathList,
        pathMap 
    }
}


export default createRouteMap