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
