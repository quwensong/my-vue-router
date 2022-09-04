
export const createRoute = (record,location) => {
  let matched = []
  if(record){
    while(record){
      matched.unshift(record)
      record = record.parent //通过当前记录找到所有的父亲
    }
  }

  return {
    ...location,
    matched
  }
  // {path: '/', matched:[]}
}
// 希望current变化了可以更新视图
export default class History {
    constructor(router){
      this.router = router;
      // 这个代表是 当前路径匹配出来的记录
      this.current = createRoute(null,   {
        path: '/'
      }) // this.currentRoute = {path: '/', matched:[]}
    
    }
    // 路径变化就会自动调用这个方法
    transitonTo(location,complete){
      // NOTE: 通过路径拿到对应的记录，有了记录以后就可以找到对应的匹配
      const current = this.router.match(location)
      // 当路径变化后 current属性会进行更新操作
      // 防止重复点击，不需要再次渲染
      // 匹配到的路径和matched个数都是相同的，就不需要再次跳转了
      // console.log(location,'----',current.path)
      // BUG: 这里好像还有点问题，看看以后能不能解决叭
      if(location !== current.path && this.current.matched.length === current.matched.length){
        return;
      }
      this.current = current;
      this.cb && this.cb(current)
      // NOTE: 获取当前路径匹配出对应的记录，当路径变化的时候获取对应的记录 --> 渲染页面
      complete && complete()

    }
    listen(cb){
      this.cb = cb
    }
}