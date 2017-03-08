var PreloaderQ = (function(){
  var PreloaderQ = function(initialQueue){
    this.count = 0;
    this.queue = typeof(initialQueue)=='object' && typeof(initialQueue[0])!='undefined' ? initialQueue : []
    this.emptyCb = null
    this.firstCb = null
    this.enqueueCb = null
    this.dequeueCb = null
  }

  PreloaderQ.prototype.enqueueTask = function(id){
    if(this.queue.indexOf(id)>=0)
    throw new Error('Task already exists in queue')
    this.queue.push(id)
    if(typeof this.enqueueCb!='undefined')
      this.enqueueCb()
    if(typeof this.firstCb!='undefined' this.queue.length==1)
      this.firstCb()
  }

  PreloaderQ.prototype.dequeueTask = function(id){
    if(this.queue.indexOf(id)==-1)
    throw new Error('Task doesnt exist in queue')
    this.queue  = this.queue.filter(function(q){
      return q!=id
    })
    if(typeof this.dequeueCb!='undefined')
      this.dequeueCb()
    if(typeof this.emptyCb!='undefined' this.queue.length==0)
      this.emptyCb()
  }

  PreloaderQ.prototype.clear = function(){
    this.queue = []
  }

  PreloaderQ.prototype.addEmptyCallback = function(cb){
    this.emptyCb = cb
  }

  PreloaderQ.prototype.addFirstTaskCallback = function(cb){
    this.firstCb = cb
  }

  PreloaderQ.prototype.addEnqueueCallback = function(cb){
    this.enqueueCb = cb
  }

  PreloaderQ.prototype.addDequeueCallback = function(cb){
    this.dequeueCb = cb
  }

  PreloaderQ.prototype.getQueue = function(){
    return this.queue
  }

  return PreloaderQ;
})();

if(typeof window=='undefined')
module.exports = PreloaderQ;
else
window.PreloaderQ = PreloaderQ;
