
if (window.innerWidth > 800 && window.innerHeight > 600) {
	//init controller
	var paraController = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "onEnter", duration: "200%" } });

	new ScrollMagic.Scene({ triggerElement: "#parallax1" })
		.setTween("#paralaxBg101", { y: "70%", ease: Linear.easeNone })
		.addTo(paraController);

	new ScrollMagic.Scene({ triggerElement: "#parallax2" })
		.setTween("#paralaxBg2", { y: "50%", ease: Linear.easeNone })
		.addTo(paraController);
	new ScrollMagic.Scene({ triggerElement: "#parallax2" })
		.setTween("#paralaxBg201", { y: "70%", ease: Linear.easeNone })
		.addTo(paraController);
}

var controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: ".35" } });
new ScrollMagic.Scene({
	triggerElement: "#trigger1"
})
	.setTween("#floater1", .8, {
		width: "270px"
		, top: "65%"
	})
	.setClassToggle("#floater1", "celView")
	//	.addIndicators({name: "2"}) // add indicators (requires plugin)
	.addTo(controller);


$.ajax({	//	Initial
	'url': 'logo',
	'success': function (response) {

		$("#logo").html(response);

		$("#replayDiv").click(function () {
			replay();
		});
	}
});



var logoScene = new ScrollMagic.Scene({
	triggerElement: "#parallax2",
	duration: 400
})
	.setPin("#logo")
	//.addIndicators({name: "logo"})
	.addTo(controller)
	.on("progress", setAzimuth)
	;

// Makes the logo shine every 3 seconds
var elevationValues = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125,
	130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 0, 5, 10, 15, 20, 25, 30, 35];
var obj = { curVal: 0 };
var shineTween = TweenMax.to(obj, .17,
	{
		curVal: elevationValues.length - 1,
		roundProps: "curVal",			// only integers so it can be used as an array index
		repeat: -1,
		repeatDelay: 3,
		ease: Linear.easeInOut,
		onUpdate: function () {
			$('#feDistantLight4720').attr('elevation', elevationValues[obj.curVal]);
		}
	}
);

function setAzimuth(event) {
	$('#feDistantLight4720').attr('azimuth', (logoScene.progress() * 100) + 130);
};


var tryAnimateLogo = function () {
	setTimeout(function () {
		if (typeof (animateLogo) == 'function') {
			animateLogo();
		} else {
			tryAnimateLogo();
		}
	}, 500);
};
setTimeout(function () {
	logoScene.on('enter', function () {
		if (typeof (animateLogo) == 'function')
			animateLogo();
		else
			tryAnimateLogo();
	});
	if (logoScene.state() == 'DURING') {
		tryAnimateLogo();
	}
}, 1000)


/*
 * 
 *  ADMIN TOOLS
 * 
 */

function myConfirm(yesCallback) {

	var prompt = $('#ruSure');
	prompt.show();

	$('#sureYes').click(function () {
		prompt.hide();
		yesCallback();
		$('#ruSure button').off();
	});
	$('#sureNo').click(function () {
		prompt.hide();
		$('#ruSure button').off();
	});
	$('#sureBackground').click(function () {
		prompt.hide();
		$('#ruSure button').off();
	});
};

var setProgress = function (progressBar, val) {
	progressBar.attr('aria-valuenow', val);
	progressBar.attr('style', 'width:' + val + '%;');
	progressBar.html('Enviando Datos... ' + val + '%');
};


function resetSortable() {
	$('#sortPanel #sortable').html('');
	$('#entriesList .panel').each(function () {
		var title = $(this).find('.panel-title').html();
		var thisId = this.id;
		$('#sortPanel #sortable').append(
			'<li name="' + thisId + '" >' + title + '</li>');
	});
	setSortable('#sortPanel #sortable');
};

function setSortable(elId) {
	setTimeout(function () {
		if (typeof ($().sortable) == "function") {
			$(elId).sortable();
			$(elId).disableSelection();

		} else {
			setSortable();
		}

	}, 1000);
};

$('#btnSortSave').click(function () {

	myConfirm(function () {

		$("#entriesList .ckeditor").each(function () {
			CKEDITOR.instances[this.id].destroy();
		});

		var oldEntries = $('#entriesParent').find('#entriesList');
		var entriesParent = $('#entriesParent').prepend('<div id="entriesList"></div>');
		var newEntries = $('#entriesParent').find('#entriesList');

		var sortedLi = $('#sortPanel #sortable li');

		for (i = 0; i < sortedLi.length; i++) {
			newEntries.append(oldEntries.find('#' + $(sortedLi[i]).attr('name')));
		}

		oldEntries.remove();

		$("#entriesList .ckeditor").each(function () {

			CKEDITOR.replace(this.id,
				{
					filebrowserBrowseUrl: 'admin/imageManager',
					height: "100px"
				});

		});

	});

});
$('#btnSortCancel').click(function () {
	$('.btnSort').click();
	resetSortable();
});

$('#showButtons').click(function () {
	var $this = $(this);
	if ($this.is(':checked')) {
		$("#adminTools button").show(200);

	} else {
		$(".btnAdd, .btnSort, .btnEdit, .btnDelete").hide(200);
	}
});


$('.btnAdd').off().click(function () {
	$("#adminTools #addPanel").toggle(200);
	$("#adminTools #sortPanel").hide(200);
});
$('.btnSort').off().click(function () {
	$("#adminTools #sortPanel").toggle(200);
	$("#adminTools #addPanel").hide(200);
});

var nextId = 0;
$('#btnAcceptAdd').off().click(function () {

	myConfirm(function () {

		var newTitle = $('#addPanel .inputTitle').val();
		theClone.find('.panel-title').html(newTitle);
		theClone.find('.inputTitle').val(newTitle);

		var newDesc = CKEDITOR.instances["addEditor"].getData();
		theClone.find('.theInfo').html(newDesc);
		theClone.find('.ckeditor').html(newDesc);

		theClone[0].id = "newEntry" + nextId;
		theClone.find('.ckeditor')[0].id = "newEntryEditor" + nextId;
		theClone.find('.ckeditor').attr('name', "newEntryEditor" + nextId);

		$('#addPanel .loadingBar').show(200);
		var progressBar = $('#addPanel').find('.progress-bar');
		var loadObj = { curVal: 0 };
		TweenMax.to(loadObj, 1,
			{
				curVal: 12,
				roundProps: "curVal",
				ease: Linear.easeOut,
				onUpdate: function () {
					setProgress(progressBar, loadObj.curVal * 8);
				},
				onComplete: function () {
					setProgress(progressBar, 100);
				}
			}
		);

		setTimeout(function () {

			$('#addPanel .loadingBar').hide(200);
			$('#addPanel .responseMsg').addClass('alert alert-success').html("Exito!").show(200);

			setTimeout(function () {

				$('#addPanel .responseMsg').hide();
				setProgress(progressBar, 0);

				$('#entriesList').prepend(theClone.clone());
				$('#entriesList .panel').show(200);

				CKEDITOR.replace("newEntryEditor" + nextId,
					{
						filebrowserBrowseUrl: 'admin/imageManager',
						height: "100px"
					});

				nextId++;
				boundButtons();

				CKEDITOR.instances["addEditor"].setData('');
				$('#addPanel .inputTitle').val('');
				$('.btnAdd').click();

				resetSortable();

			}, 500);
		}, 1500);
	});
});


function boundButtons() {

	$('.btnEdit').off().click(function () {
		$(this).parent().find('.theEditor').toggle(200);
		$(this).parent().find('.theInfo').toggle(200);
		$(this).parent().find('.panel-title').toggle(200);
		$(this).parent().find('.inputTitle').toggle(200);
	});

	$('.btnCancel').off().click(function () {
		$(this).parent().parent().find('.btnEdit').click();
	});

	$('.btnDelete').off().click(function () {
		var $this = this;
		myConfirm(function () {
			$($this).parent().hide(200);
			setTimeout(function () {
				$($this).parent().remove();
				resetSortable();
			}, 200);

		});
	});

	$('.acceptEdit').off().click(function () {
		var $this = this;

		myConfirm(function () {

			var parent = $($this.parentElement.parentElement);

			parent.find('.loadingBar').show(200);
			parent.find('.responseMsg').hide(200);

			var progressBar = parent.find('.progress-bar');
			var loadObj = { curVal: 0 };
			TweenMax.to(loadObj, 1,
				{
					curVal: 12,
					roundProps: "curVal",
					ease: Linear.easeOut,
					onUpdate: function () {
						setProgress(progressBar, loadObj.curVal * 8);
					},
					onComplete: function () {
						setProgress(progressBar, 100);
					}
				}
			);

			setTimeout(function () {
				parent.find('.loadingBar').hide(200);
				setProgress(progressBar, 0);

				parent.find('.responseMsg').addClass('alert alert-success').html("Exito!").show(200);

				var editorId = parent.find('.ckeditor')[0].id;
				parent.find('.theInfo').html(CKEDITOR.instances[editorId].getData());
				parent.find('.panel-title').html(parent.find('.inputTitle').val());

				resetSortable();

				setTimeout(function () {
					parent.find('.btnEdit').click();
					parent.find('.responseMsg').hide(200);
				}, 1000);
			}, 1500);

		});
	});
};
