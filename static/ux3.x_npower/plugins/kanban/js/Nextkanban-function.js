/* NEXT UX2.0 | NEXTKANBAN-FUNCTION.JS
// Version    0.2 | Build 0.1
// Released on | 25 Oct 2017
// © 2017-2018 | www.nexttechnosolutions.com
// ===================================================================================================================*/
//DEFAULT COLUMN DISIPLAY FUNCTION******************************************************************
 var KanbanTest = new Nextkanban({
        element : '#myKanban',
        gutter  : '20px',
        widthBoard : '360px',
        click : function(el){
            console.log(el);
        },
        boards  :[
            {
                "id" : "_project",
                "title"  : '<h3 contentEditable="true">Projectsss</h3>',
                "class" : "primaryTasddddk",
                "item"  : [
                    {
                        "title"  : '<div class="row"><div class="col-sm-12 col-md-12 column-one"><h4 contentEditable="true">Task name</h4> <div class="taskLinks"><a href="#"><i class="fa fa-thumbs-up"></i></a> <a href="#"><i class="fa fa-trash"></i></a> <div class="dropdown pull-right"><a href="#" class="dropdown-toggle account" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li class="dropdown-submenu kanban-submenu"><a tabindex="-1" href="#">More options</a><ul class="dropdown-menu kanban-menu"><li class="kopie"><a href="#">Dropdown Link 5</a></li></ul></li></ul></div></a></div></div></div><div class="row"><div class="col-md-12 column-two"><div class="col-sm-6 col-xs-6 txt-center"><span>Start Date:</span><span>16-08-2016</span></div><div class="col-sm-6 col-xs-6 txt-center"><span>End Date:</span><span>02-02-2018</span></div></div></div><div class="row"><div class="col-md-4 col-sm-4 column-three txt-center"><p>Expected Completion %</p></div><div class="col-md-4 col-sm-4 column-three txt-center"><p>Current Completion %</p></div><div class="col-md-4 col-sm-4 column-three txt-center"><p>Spent Effort (Man Days)</p></div></div><div class="row"><div class="col-md-4 col-sm-4 column-four txt-center"><span class="m-c_label_green">100</span></div><div class="col-md-4 col-sm-4 column-four txt-center"><span class="m-c_label_red">96</span></div><div class="col-md-4 col-sm-4 column-four txt-center"><span class="m-c_label_blue">427</span></div></div><div class="row"><div class="col-md-12 col-sm-12 column-seven padding-0"><h2>Estimated Effort (Man Days)</h2></div></div><div class="row"><div class="col-md-12 column-five"><div class="col-md-4 col-sm-4 txt-center"><p>Must Have</p></div><div class="col-md-4 col-sm-4 txt-center"><p>Should Have</p></div><div class="col-md-4 col-sm-4 txt-center"><p>Total Effort</p></div></div></div><div class="row"><div class="col-md-12 column-six"><div class="col-md-4 col-sm-4 txt-center"><p>2477 (Hrs)</p></div><div class="col-md-4 col-sm-4 txt-center"><p>0 (Hrs)</p></div><div class="col-md-4 col-sm-4 txt-center"><p>2480 (Hrs)</p></div></div></div>',
                    }
                ]
            },
            {
                "id" : "_assigned",
                "title"  : '<h3 contentEditable="true">Assigned</h3>',
               "class" : "infoTask",
                "item"  : [
                    {
                        "title"  : '<h4 contentEditable="true">Task name</h4> <div class="taskLinks"><a href="#"><i class="fa fa-thumbs-up"></i></a> <a href="#"><i class="fa fa-trash"></i></a> <div class="dropdown pull-right"><a href="#" class="dropdown-toggle account" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i><ul class="dropdown-menu"><li> <a href="#"> <i class="fa fa-check-square"></i> <span>Select All</span> </a> </li><li> <a href="#"> <i class="fa fa-eye"></i> <span>Read</span> </a> </li><li> <a href="#"> <i class="fa fa-eye-slash"></i> <span>Unread</span> </a> </li><li> <a href="#"> <i class="fa fa-exclamation-triangle"></i> <span>Span</span> </a> </li></ul></div></a></div> <p contentEditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy </p>',
                    }
                ]
            },
            {
                "id" : "_inprogress",
                "title"  : '<h3 contentEditable="true">Inprogress</h3>',
               "class" : "warningTask",
                "item"  : [
                    {
                        "title"  : '<h4 contentEditable="true">Task name</h4> <div class="taskLinks"><a href="#"><i class="fa fa-thumbs-up"></i></a> <a href="#"><i class="fa fa-trash"></i></a> <div class="dropdown pull-right"><a href="#" class="dropdown-toggle account" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i><ul class="dropdown-menu"><li> <a href="#"> <i class="fa fa-check-square"></i> <span>Select All</span> </a> </li><li> <a href="#"> <i class="fa fa-eye"></i> <span>Read</span> </a> </li><li> <a href="#"> <i class="fa fa-eye-slash"></i> <span>Unread</span> </a> </li><li> <a href="#"> <i class="fa fa-exclamation-triangle"></i> <span>Span</span> </a> </li></ul></div></a></div> <p contentEditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy </p>',
                    }
                ]
            },
            {
                "id" : "_completed",
                "title"  : '<h3 contentEditable="true">Completed</h3>',
               "class" : "successTask",
                "item"  : [
                    {
                        "title"  : '<h4 contentEditable="true">Task name</h4> <div class="taskLinks"><a href="#"><i class="fa fa-thumbs-up"></i></a> <a href="#"><i class="fa fa-trash"></i></a> <div class="dropdown pull-right"><a href="#" class="dropdown-toggle account" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i><ul class="dropdown-menu"><li> <a href="#"> <i class="fa fa-check-square"></i> <span>Select All</span> </a> </li><li> <a href="#"> <i class="fa fa-eye"></i> <span>Read</span> </a> </li><li> <a href="#"> <i class="fa fa-eye-slash"></i> <span>Unread</span> </a> </li><li> <a href="#"> <i class="fa fa-exclamation-triangle"></i> <span>Span</span> </a> </li></ul></div></a></div> <p contentEditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy </p>',
                    }
                ]
            }
        ]
    });

	$(".kanban-container a.add-links").unbind('click').bind('click', function() {
		id = $(this).parent().attr("data-id")
		KanbanTest.addElement(
			""+id+"",
			{
				"title":'<h4 contentEditable="true">Task name</h4> 	<p contentEditable="true">Your Comment</p>',
			}
		);	
	});
	
	/*$( ".del-links" ).click(function() {
	  $(this).parent().remove();
	});*/
//***********************************************************************************************************************************		
    
//ADD COLUMN FUNCTION******************************************************************
    var addBoardDefault = document.getElementById('addDefault');
	var indexVal = 1;
    addBoardDefault.addEventListener('click', function () {
        KanbanTest.addBoards(
            [{
                "id" : "_default_"+indexVal,
				"class" : "setDefault",
                "title"  : '<h3 contentEditable="true">Board</h3> ',
                "item"  : [
                   /* {
                        "title":"Default Item",
                    },
                    {
                        "title":"Default Item 2",
                    },
                    {
                        "title":"Default Item 3",
                    }*/
                ],
            }]
        );
		indexVal++;
		$(".kanban-container a.add-links").unbind('click').bind('click', function() {
		id = $(this).parent().attr("data-id")
		KanbanTest.addElement(
			""+id+"",
			{
				"title"  : '<h4 contentEditable="true">Your Name</h4> 	<p contentEditable="true">Your Comment</p>',
			}
		);	
		
		/*$( ".del-links" ).click(function() {
		  $(this).parent().remove();
		});*/
		
	});
	
    });
//************************************************************************************************************************************	
		
	
