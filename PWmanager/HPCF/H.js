(function($){
	var methods = {
		"init":function(option){
			return $(this).each(function () {
				var defaults = {
					"height":"auto"
				}
				var settings = $.extend({},defaults,option);
				var $this = $(this);
				$this.append("<div class='Htab-drap' style='display:none'>"+
								"<div class='Htab-drap-btncontent'>"+
									"<button class='Hbtn Hbtn-default Htab-drap-button' data-status='hide'><i class='fa fa-reorder'></i></button>"+
								"</div>"+
								"<ul class='Htab-drap-nav' style='display:none'>"+
								"</ul>"+
							"</div>");
				var liArr = $($this.find("ul.Htab-nav")[0]).children("li"),liLen = liArr.length,len = 0;
				for(var i=0;i<liLen;i++){
					$(liArr[i]).clone(true).appendTo($($this.find(".Htab-drap-nav")[0]));
				}
				$this.find("button.Htab-drap-button").on("click",function(){
					if($(this).attr("data-status") == "hide"){
						$(this).parent("div.Htab-drap-btncontent").next("ul.Htab-drap-nav").show();
						$(this).attr("data-status","show");
					}else{
						$(this).parent("div.Htab-drap-btncontent").next("ul.Htab-drap-nav").hide();
						$(this).attr("data-status","hide");
					}
				})
				methods.resize($this,settings);
                $(window).bind('resize.Htab', function(e){
                	methods.resize($this,settings);
                });
            });
		},
		
		"resize":function(htab,settings){
			return $(htab).each(function(){
				var $this = $(this),liArr = $($this.find("ul.Htab-nav")[0]).children("li"),liLen = liArr.length,len = 0;
				$this.find("div.Htab-page").each(function(){
					$(this).css("height",settings.height);
				})
				var drapArr = $($this.find("ul.Htab-drap-nav")[0]).children("li")
				for(var i=0;i<liLen;i++){
					len += ($(liArr[i]).width()+22); 
				}
				len = len - 2*(liLen-1);
				var parentLen = $($this.find("ul.Htab-nav")[0]).width()-50;
				if(len > parentLen){
					var contentLen = parseInt(parentLen/100);
					for(var itop=0;itop<liLen;itop++){
						if(itop>=contentLen && itop!=0){
							$(liArr[itop]).hide();
							
						}else{
							$(liArr[itop]).show();
						}
					}
					for(var iright=0;iright<liLen;iright++){
						if(iright>=contentLen && iright!=0){
							$(drapArr[iright]).show();	
						}else{
							$(drapArr[iright]).hide();	
						}
					}
					var moveLen = liLen - contentLen;
					$this.find("div.Htab-drap").show();
				}else{
					$this.find("div.Htab-drap").hide();
					liArr.each(function(){
						$(this).show();
					})
					$this.find("div.Htab-drap-btncontent").next(".Htab-drap-nav").hide();
					$this.find("button.Htab-drap-button").attr("data-status","hide");
				}
			})
		},
		
		"add":function(option){
			return $(this).each(function(){
				
			});
			
		}
	}
	
	$.fn.Htab = function(){
		var method = arguments[0];
	    if(methods[method]){
	    	method = methods[method];
	    	arguments = Array.prototype.slice.call(arguments, 1);
	    }else if(typeof method === "object" || !method){
	    	method = methods["init"];
	    }else{
	    	$.error("Method"+option+"does not exist on JQuery.Htab");
	    	return this;
	    }
	    return method.apply(this,arguments);
	}
})(jQuery)
