//PRELOAD SCRIPT

console.log = function(o){
	var JSText = document.getElementById("JS CLI").children[0].value
	JSText += JSON.stringify(o) + "\n"
	document.getElementById("JS CLI").children[0].value = JSText
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
	
	//Focus element with getFocusClass attribute
	if (tabName == "Ruby CLI") window.ICMToolbar.rbEditor.focus()
}

function RubyCLIKeyHandler() {
	var key = window.event.keyCode;
	//if ^{Enter} pressed then run ruby script
	if (event.key=="Enter" && event.ctrlKey) {
		//Step1: Write ruby file with contents of control
		//Step2: SendMessage to ICM application
		injectRuby(document.getElementById("Ruby CLI").children[0].value,true)
		document.getElementById("Ruby CLI").children[0].value = ""
		return false
	} else {
		return true
	}
}

function injectRuby(s,response){
	
}

var BODY_HEIGHT, BODY_WIDTH;
function bodyListener(callback){
    setInterval(function(){
        if(BODY_HEIGHT!=document.body.clientHeight || BODY_WIDTH!=document.body.clientWidth){
            BODY_HEIGHT = document.body.clientHeight;
            BODY_WIDTH = document.body.clientWidth;
            callback(BODY_HEIGHT,BODY_WIDTH)
        }
    },1000)
}

//Resize gui based on body size
//bodyListener(gui_resize)

function handle(s){
	var Msgbox = getMethod("Msgbox")
	switch (s) {
		case "?":
			Msgbox("Dummy function");
			break;
		case "USTrace":
			Msgbox("USTrace");
			break;
		case "DSTrace":
			Msgbox("DSTrace");
			break;
		default:
			Msgbox("Unknown function: \"" + s + "\"");
		
	}
}

getMethod = function(sMethod){
	return window[Object.keys(window).filter(
		function(s){
			return s.toLowerCase() == sMethod.toLowerCase()
		}
	)]
}


window.onload = function(){
	//Default tab:
	document.getElementById("defaultOpen").click();
	
	window.ICMToolbar = {}
	
	//Setup ace editor
    ICMToolbar.rbEditor = ace.edit("rubyEditor");
    ICMToolbar.rbEditor.setTheme("ace/theme/monokai");
    ICMToolbar.rbEditor.getSession().setMode("ace/mode/ruby");
	ICMToolbar.rbEditor.setFontSize(26)
	
	
	ICMToolbar.jsEditor = ace.edit("jsEditor");
	ICMToolbar.jsEditor.setTheme("ace/theme/monokai");
	ICMToolbar.jsEditor.getSession().setMode("ace/mode/javascript");
	ICMToolbar.jsEditor.setFontSize(26)
	
	
}



//ExitApp();