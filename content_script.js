chrome.extension.onMessage.addListener(
	 
	function(request, sender, sendResponse) {	
	
		if(request.command=="parse"){
	
			parse_document();
			
		}
		
		if(request.command=="show"){
		
			console.log(request.url);
		
			$('a').each(function() {
				if(this.href==request.url){	

					var imgUrl = chrome.extension.getURL("button.png");
					$('<a target="_blank" href="http://solvonauts.org/?action=all_metadata&id=' + request.id + '"><img height=20 width=20 src="' + imgUrl + '" /></a>').insertAfter(this);			
				}
			});	
				
		}
		
	}     
		
);

var urls_found = new Array();

function check_url(url) {

	if(urls_found[url]==undefined){
		
		urls_found[url]=true;			
						
		chrome.extension.sendMessage({command:"ajax",link:url},function(){});
		
	}

}

function parse_document(){

	var n = document;			
	
	$('a').each(function() {
		check_url(this.href, this);
    });							
	
	urls_found = new Array();

}