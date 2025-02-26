  // create groups
//  var numberOfGroups = 1; 
//  var groups = new vis.DataSet()
//  for (var i = 0; i < numberOfGroups; i++) {
//    groups.add({
//      id: i,
//      content: 'Event&nbsp;' + i
//    })
//  }
  
  // create items
  var numberOfItems = 1;
  var items = new vis.DataSet();
 
//  var itemsPerGroup = Math.round(numberOfItems/numberOfGroups);
 
//  for (var truck = 0; truck < numberOfGroups; truck++) {
    var date = new Date();
    for (var order = 0; order < numberOfItems; order++) {
      date.setHours(date.getHours() +  4 * (Math.random() < 0.2));
      var start = new Date(date);
 
      date.setHours(date.getHours() + 2 + Math.floor(Math.random()*4));
      var end = new Date(date);
 
      items.add({
        id: order,
//        group: truck,
        start: start,
        end: end,
        content: 'Bar ' + order
      });
    }
//  }
  
  // specify options
  var options = {
    stack: true,
    start: new Date(),
    end: new Date(1000*60*60*24 + (new Date()).valueOf()),
    editable: true,
    orientation: 'top'
  };
 
  // create a Timeline
  var container = document.getElementById('mytimeline');
  timeline1 = new vis.Timeline(container, items, options);
 
//  function handleDragStart(event) {
//    dragSrcEl = event.target;
// 
//    event.dataTransfer.effectAllowed = 'move';
//    var itemType = event.target.innerHTML.split('-')[1].trim();
//    var item = {
//      id: new Date(),
//      type: itemType,
//      content: event.target.innerHTML.split('-')[0].trim()
//    };
//    
//    var isFixedTimes = (event.target.innerHTML.split('-')[2] && event.target.innerHTML.split('-')[2].trim() == 'fixed times')
//    if (isFixedTimes) {
//      item.start = new Date();
//      item.end = new Date(1000*60*10 + (new Date()).valueOf());
//    }
// 
//    event.dataTransfer.setData("text", JSON.stringify(item));
//  }

  
  
  
//  function handleDragEnd(event) {
//		dragSrcEl = event.target;
//		console.log("event.target",event.target)
//		event.dataTransfer.effectAllowed = 'move';
//
//	}
  
//  var items = document.querySelectorAll('.items .item');
// 
//  for (var i = items.length - 1; i >= 0; i--) {
//    var item = items[i];
//    item.addEventListener('dragstart', handleDragStart.bind(this), false);
//    item.addEventListener('dragend', handleDragEnd.bind(this), false);
//  }