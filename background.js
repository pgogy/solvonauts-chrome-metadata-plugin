
	chrome.browserAction.onClicked.addListener(function(tab_something) {
		
		chrome.tabs.getSelected(null, function(tab) {
						
			chrome.tabs.sendMessage(tab.id, {command: "parse"}, function(response) {
			
			});
			
		});
								
	});
	
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	
		if(request.command=="ajax"){
		
			var xmlHttpRequest = new XMLHttpRequest();
			
			url = request.link;
																
			xmlHttpRequest.open("GET","http://solvonauts.org/?action=api_url_exists&url=" + url, true);
			
			xmlHttpRequest.onreadystatechange=function(){  
			  
			if (xmlHttpRequest.readyState==4){
			
				data = JSON.parse(xmlHttpRequest.responseText);
				
				if(data[0]=="true"){
				
					chrome.tabs.sendMessage(sender.tab.id, {command:"show",url:data[2],id:data[1]}, function(response) {
			
					});
				
				}
	
			}
				
		};				
		
		xmlHttpRequest.send();			
		
		}
		
	
	});
         