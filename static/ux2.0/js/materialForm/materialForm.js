/* NEXT UX2.0 | MATERIALFORM.JS
// Version    0.2 | Build 0.1
// Released on | 22 Sep 2017
// © 2017-2018 | www.nexttechnosolutions.com
// ===================================================================================================================*/
var label;
var target;
//var checkMark = "fa-check"; //set the font-awesome icon class
//var iconSize = 'fa-2x'; //set iconSize

function Form(){

}

Form.prototype.alterForm= function(){
    
    $('input, textarea').focus(function(e){
        form.setLabel(e.target);
        form.checkFocused();
    });
   /* $('input, textarea').focusout(function(e){
        form.setLabel(e.target);
        form.checkUnfocused(e.target);
    });*/
};

Form.prototype.setLabel = function(target){
    label= $('label[for='+target.id+']');
};

Form.prototype.getLabel = function(){
    return label;
};

Form.prototype.checkFocused= function(){
    form.getLabel().addClass('active','');
};

Form.prototype.checkUnfocused= function(target){
    if($(target).val().length == 0){

        form.getLabel().removeClass('active');

        if(form.addCheckMark(target)){

            form.getLabel().next().remove();
        }
    }else if(!$(form.getLabel()).next().is($(checkMark))){
        form.getLabel().after("<span class='fa "+iconSize+" "+checkMark+"'></span>")
    }
};

Form.prototype.addCheckMark = function(){
    if(form.getLabel().next().is($("."+ checkMark +""))){
        return true;
    }else{
        return false;
    }
};



form = new Form();

function initialize(){
    form.alterForm();
}
initialize();