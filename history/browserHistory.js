import History from './base'

export default class BrowserHistory extends History {
  constructor(router){
    super(router)
    this.router = router;
    console.log('history')
  }
}