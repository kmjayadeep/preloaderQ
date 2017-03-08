const PreloaderQ = require('../lib/preloaderQ');
const expect = require('chai').expect;
var preLoader = new PreloaderQ()

describe('Enqueue',function(){
  describe('Add new task',function(){
    it('Adds new Tasks',function(){
      preLoader.enqueueTask(1)
      preLoader.enqueueTask(2)
      expect(preLoader.getQueue()).to.deep.equal([1,2])
    })
    it('Adding same task gives error',function(){
      expect(function(){
        preLoader.enqueueTask(1)
      }).to.throw(Error)
    })
    it('Calling clear() clears the queue',function(){
      preLoader.clear()
      expect(preLoader.getQueue()).to.be.deep.equal([])
    })
  })
})

describe('Dequeue',function(){
  describe('Dequeue a task',function(){
    it('removes Tasks',function(){
      preLoader.clear()
      preLoader.enqueueTask(1)
      preLoader.enqueueTask(2)
      preLoader.enqueueTask(3)
      preLoader.dequeueTask(3)
      expect(preLoader.getQueue()).to.deep.equal([1,2])
    })
    it('Dequeue non existant task gives error',function(){
      expect(function(){
        preLoader.dequeueTask(3)
      }).to.throw(Error)
    })
  })
})

describe('Callbacks',function(){
  describe('Enqueue Callback',function(){
    it('should call First Task callback initially',function(done){
      preLoader.setFirstTaskCallback(function(id){
        expect(id).to.be.equal(1)
        done()
      })
      preLoader.clear()
      preLoader.enqueueTask(1)
    })
    it('should call enqueue callback',function(done){
      preLoader.setEnqueueCallback(function(id){
        expect(id).to.be.equal(2)
        done()
      })
      preLoader.enqueueTask(2)
    })
    it('should call enqueue callback again',function(done){
      preLoader.setEnqueueCallback(function(id){
        expect(id).to.be.equal(3)
        done()
      })
      preLoader.enqueueTask(3)
    })
    it('should call fist task callback on adding new task after becoming empty',function(done){
      preLoader.setFirstTaskCallback(function(id){
        expect(id).to.be.equal(1)
        done()
      })
      preLoader.setEnqueueCallback(null)
      preLoader.dequeueTask(1)
      preLoader.dequeueTask(2)
      preLoader.dequeueTask(3)
      preLoader.enqueueTask(1)
    })
  })
  describe('Dequeue Callbacks',function(){
    it('should call dequeue callback',function(done){
      preLoader = new PreloaderQ()
      preLoader.setDequeueCallback(function(id){
        expect(id).to.be.equal(1)
        done()
      })
      preLoader.enqueueTask(1)
      preLoader.dequeueTask(1)
    })
    it('should call Empty callback',function(done){
      preLoader.setDequeueCallback(null)
      preLoader.setEmptyCallback(function(id){
        expect(id).to.be.equal(1)
        done()
      })
      preLoader.clear()
      preLoader.enqueueTask(1)
      preLoader.dequeueTask(1)
    })
  })
})
