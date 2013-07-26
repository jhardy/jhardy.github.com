$(function() {
	var $optionButtons = $(".options").find('button'),
			$deviceSelect = $(".device-select"),
			$deviceLinks = $deviceSelect.find('a');
			$deviceList = $(".device");
			$modal = $(".modal");
			$overlay = $(".overlay");
			$modalButtons = $(".instruction-select").find('button'),
			$modalPanes = $(".instructions"),
			$installButtons = $(".install").find('button'),
			$scaleButtons = $(".scale").find('button'),
			$scalePhone = $(".scale").find('.md-iphone-5');


	var closeModal = function() {
			$modal.removeClass("show");

			setTimeout(function() {
					$overlay.removeClass("fade-in");
			}, 600);

	}

	var showModal = function() {
			$overlay.addClass("fade-in");
			$modal.addClass("show");
	}

	var handleModalButtons = function(el) {
			el.addClass("active").siblings().removeClass('active');
	};

	var handleModalPanes = function(i) {

		pane = $($modalPanes[i]);
		pane.addClass('current').siblings().removeClass('current');

	};


	$optionButtons.click(function() {
		
		var el = $(this),
				belongsTo = el.parents('.options').attr('data-belongs-to'),
				device = el.parents("." + belongsTo).find(".md-" + belongsTo),

				classToAdd = el.attr('data-value'),
				classToRemove = el.siblings('button').first().attr('data-value'),

				markupOption = el.attr('data-option'),
				markupOptionEl = el.parents('.markup-block').find("." + markupOption);


		el.siblings().removeClass('active');
		el.addClass('active');

		markupOptionEl.text(" " + classToAdd);

		if(classToAdd === "") {
			markupOptionEl.hide();
		} else {
			markupOptionEl.show();
		}

		device.removeClass(classToRemove)
		device.addClass(classToAdd);

	});


	$deviceLinks.click(function(e) {
		e.preventDefault();
		var index = $(this).index();

		$('html, body').animate({
			scrollTop: $($deviceList[index]).offset().top
		});
	});

	$modalButtons.click(function() {

		var el = $(this);

		handleModalButtons(el);
		handleModalPanes(el.index());

	});

	$(".modal").find(".close").click(function() {
		closeModal();
	});


	$installButtons.click(function() {
	
		var	index = $(this).index() - 1;

		handleModalButtons($($modalButtons[index]));
		handleModalPanes(index);	
		showModal();

	});


	$(".download").click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $(".install").offset().top
		});

	});

	$scaleButtons.click(function() {
			var el = $(this),
					fontSize = el.data('size');
			$scaleButtons.removeClass('active');
			el.addClass('active');

			$scalePhone.css('font-size', fontSize + "em");

	})


	$(document).keyup(function(e) {
  	if (e.keyCode == 27) { closeModal(); }
	});
});