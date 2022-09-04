import History from './base'

const ensureSlash = () => {
  if(window.location.hash){
    return;
  }
  window.location.hash = '/'
}

export default class HashHistory extends History {
  constructor(router){
    super(router)
    this.router = router;
    // TAG 如果使用hashHistory 没有hash 应该跳转到首页 #/  
    // NOTE http://192.168.31.93:8080 --> http://192.168.31.93:8080/#/
    ensureSlash()
  
  }
  getCurrentLocation(){
    // NOTE: window.location.hash -->  #/about slice(1)把 # 去掉，得到 /about
      return window.location.hash.slice(1);
  }
  setupListener(){
    window.addEventListener('hashchange',()=>{
      this.transitonTo(this.getCurrentLocation());
    })
  } 
}