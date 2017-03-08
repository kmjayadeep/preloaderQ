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
