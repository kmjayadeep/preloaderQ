# PreloaderQ

PreloaderQ is a javascript plugin that be used to track the flow of asynchronous/ synchronous tasks, mainly designed to show/hide loading gif on websites running multiple ajax requests

[![NPM](https://nodei.co/npm/preloaderq.png)](https://npmjs.org/package/preloaderq)

[![npm](https://img.shields.io/npm/dm/preloaderq.svg)](https://www.npmjs.com/package/preloaderq)


### Installation

from npm

```javascript
npm install preloaderq --save
const PreloaderQ = require('preloaderq')
const preloader = new PreloaderQ(initialQueue)
```

in browser

```javascript
var preloader = new PreloaderQ(initialQueue)
```


### Usage

initialize

```javascript
var preloader = new PreloaderQ()

```

with initial array of tasks

```javascript
var preloader = new PreloaderQ(['load page'])
```

setup callbacks

```javascript
preloader.setEmptyCallback(function(id){
	console.log('queue is empty; removed ',id)
})

preloader.setFirstTaskCallback(function(id){
	console.log('started first task',id)
})

preloader.setEnqueueCallback(function(id){
	console.log('enqueued',id)
})

preloader.setDequeueCallback(function(id){
	console.log('dequeued',id)
})

```

enqueue and dequeue tasks

```javascript
var preloader = new PreloaderQ(['load page'])
//setup callbacks
...
preloader.enqueueTask('load student details')
loadStudentDetailsAsync(function(data){
	preloader.dequeueTask('load student details')
	//do stuff
})
```


### Use case 1:

A website needs to show a loading gif image whenever something is executing in background (ajax request maybe). If there are multiple ajax requests running in parallel, we need to track the starting of first ajax call and ending of all calls in order to show and hide the loading bar

```javascript
var preloader = new PreloaderQ()
preloader.setEmptyCallback(function(){
	//no active tasks
	$('#loader').hide()
})
preloader.enqueueTask('load page')

preloader.setFirstTaskCallback(function(){
	//started first task
   	$('#loader').show()
})

$(document).ready(function() {
	preloader.dequeueTask('load page')
})

preloader.enqueueTask('load student details')
loadStudentDetailsAsync(function(data){
	preloader.dequeueTask('load student details')
	//do stuff
})
```
