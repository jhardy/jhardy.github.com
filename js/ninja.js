
 $(window).load(function() {
	
	$("#intro").show();
	$("#me").show();
	


	if($("body").hasClass("intro")) {
		if($("html").hasClass("no-cssanimations")) {
				setTimeout(function() {
							
					$("#intro").fadeOut(500);
					$("#about").fadeIn(500);
					$("body").removeClass().addClass("about");
						
				}, 4000);
						
		} else {
				setTimeout(function(){	
			
					$("body").removeClass().addClass("about");
				
				}, 9750); 
		}
	}
	function checkClass(bodyClass) {

			if(bodyClass !== "skills") {

				$(".icons li").css({'top' : '-55px'});
			}


		if(bodyClass === "skills") {
			var $icon = $(".icons li");
			var i = 0; 

		  var pop = function popIcon() {	  
			 $($icon[i]).animate({'top' : '30px'}, 60).animate({'top' : '20px'}, 60, popIcon);
		   i++;
			};

			pop();  
		}



	}	 


		var $icons = $(".icons li"),
				$skills = $(".skill-descriptions li"),
				$marker = $(".skill-marker"),
				markerOffset = 225,
				iconClasses = ["punch", "kick", "closeline", "uppercut", "sweepkick", "crane", "flyingkick", "bearhug"],						
				current;

		$icons.click(function() {
				var index = $(this).index();
				if(current === index) {
					return;
				}

				if($(".skill-maker:hidden")) {
					$marker.fadeIn(400);
					$("#skills h3").hide();
				}
				current = $(this).index();

				var markerMoveTo = markerOffset + (($(this).outerWidth() + parseInt($(this).css('margin-right'), 10)) * current);

				$("#me").removeClass().addClass(iconClasses[current]);

				$skills.fadeOut(800);
				$($skills[current]).fadeIn(800);
				$marker.css({'left' : markerMoveTo });

		});

		$icons.hover(function() {
			$(this).css({'top' : '15px'});
		}, function() {
			$(this).css({'top' : '20px'});

		});


		var $ems = $("#about em"),
				dataClass = "";


			$ems.mouseover(function() {

				dataClass = "." + $(this).attr("data-class");
				$(dataClass).addClass("active-dot");

			}).mouseout(function() {			

				$(dataClass).removeClass("active-dot");

			});

		var $buttons = $("nav li"),
				navClass = ["about", "skills", "contact"];

		$buttons.click(function() {
			var currentClass = navClass[$(this).index()];
			$buttons.removeClass();

			$(this).addClass("current");
			$("body").removeClass().addClass(currentClass);
			checkClass(currentClass);


		});
	
});