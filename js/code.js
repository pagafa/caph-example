var currentPage = 'main';
var dialogo = null;
var dialogoVisible = false;
var menuContexto = null;
var menuContextoVisible = false;

// Inicialización de la aplicación
$(document).ready(
		function() {
			// Controlador de las tarjetas de la pantalla principal
			$('.card').on('selected', function(event) {
				var target = $(event.currentTarget).attr('target');
				showPage(target);
			});

			// Manejador de la tecla de atrás
			$(document).on(
					'keydown',
					function(event) {
						if (event.keyCode == 10009) { // Back
							if (currentPage == 'main') {
								tizen.application.getCurrentApplication()
										.exit();
							} else if (menuContextoVisible) {
								menuContexto.caphContextMenu('close');
								menuContextoVisible = false;
								setTimeout(function() {
									$.caph.focus.controllerProvider
											.getInstance().setDepth(0,
													'contexto')
								}, 100);
							} else if (dialogoVisible) {
								dialogo.caphDialog('close');
								dialogoVisible = false;
							} else {
								showPage('main');
							}
						}
					});

			// Iniciamos todos los componentes
			initBotones();
			initCheckboxes();
			initDialogando();
			initContextando();
			initBotonesRadio();
			initEntrada();
			initDesplegable();
			initListado();

			// Mostramos la primera pantalla
			showPage('main');

		});

// Muestra una pantalla y fija el grupo de navegación, ambos tienen el mismo
// nombre
function showPage(pageName) {
	currentPage = pageName;
	$('.page').hide();
	$('#' + pageName).show();
	$.caph.focus.controllerProvider.getInstance().setGroup(pageName);
}

// Inicia los botones de la pantalla de botones
function initBotones() {
	$('#boton1').caphButton({
		focusOption : {
			group : "botones",
		},
		onSelected : function(event, originalEvent, selected) {
		}
	});
	$('#boton2').caphButton({
		focusOption : {
			group : "botones",
			disabled : true
		},
		onSelected : function(event, originalEvent, selected) {
		}
	});
	$('#boton3').caphButton({
		focusOption : {
			group : "botones"
		},
		toggle : true,
		onSelected : function(event, originalEvent, selected) {
		}
	});
}

// Inicia la ventana de diálogo
function initDialogo() {
	dialogo = $('#dialogo').caphDialog(
			{
				center : true,
				focusOption : {
					group : "dialogando",
					depth : 1,
				},
				onOpen : function() {
					setTimeout(function() {
						$.caph.focus.controllerProvider.getInstance().setDepth(
								1, 'dialogando')
					}, 100);
				},
				onSelectButton : function(buttonIndex, event) {
					dialogo.caphDialog('close');
					dialogoVisible = false;
				}
			});
}

// Inicia el botón que abre la ventana de dialogo
function initDialogando() {
	$('#botonD').caphButton({
		focusOption : {
			group : "dialogando",
		},
		onSelected : function(event, originalEvent, selected) {
			if (dialogo == null) {
				initDialogo();
			}
			if (!dialogoVisible) {
				dialogo.caphDialog('open');
				dialogoVisible = true;
			}
		}
	});
}

// Inicia el menú contextual
function initContexto() {
	menuContexto = $('#menuContexto').caphContextMenu(
			{
				items : [ {
					id : 'c',
					content : 'Smart TV'
				}, {
					id : 'm',
					content : 'Móvil'
				}, {
					id : 's',
					content : 'Smart watch',
				}, {
					id : 'c1',
					content : 'Neo QLED',
					parent : 'c'
				}, {
					id : 'c2',
					content : 'QLED',
					parent : 'c'
				}, {
					id : 'c3',
					content : 'Th Frame',
					parent : 'c'
				}, {
					id : 'm1',
					content : 'Z Flip4 ',
					parent : 'm'
				}, {
					id : 'm2',
					content : 'Z Fold4',
					parent : 'm'
				}, {
					id : 's1',
					content : 'Galaxy Watch 5',
					parent : 's'
				}, {
					id : 's2',
					content : 'Galaxy Watch 5 Pro',
					parent : 's'
				} ],
				focusableDepth : 1,
				onSelectItem : function($itemId, $event) {
					console.log($itemId + ' seleccionado');
					menuContexto.caphContextMenu('close');
					menuContextoVisible = false;
					setTimeout(function() {
						$.caph.focus.controllerProvider.getInstance().setDepth(
								0, 'contexto')
					}, 100);
				}
			});
}

// Inicia el boton que abre el menú de contexto
function initContextando() {
	$('#botonC').caphButton({
		focusOption : {
			group : "contexto",
		},
		onSelected : function(event, originalEvent, selected) {
			if (menuContexto == null) {
				initContexto();
			}
			if (!menuContextoVisible) {
				menuContexto.caphContextMenu('open');
				menuContextoVisible = true;
			}
		}
	});
}

// Inicia los checkboxes
function initCheckboxes() {
	$('#checkbox1').caphCheckbox({
		focusOption : {
			group : "checkboxes",
		},
		onSelected : function(event, originalEvent, selected) {
		}
	});
	$('#checkbox2').caphCheckbox({
		focusOption : {
			group : "checkboxes",
			disabled : true
		},
		onSelected : function(event, originalEvent, selected) {
		}
	});
	$('#checkbox3').caphCheckbox({
		focusOption : {
			group : "checkboxes"
		},
		checked : true,
		onSelected : function(event, originalEvent, selected) {
		}
	});
}

// Inicia los botones de radio
function initBotonesRadio() {
	$('#radioboton1').caphRadiobutton({
		focusOption : {
			group : "botonRadio",
		},
		onSelected : function(event, originalEvent, selected) {
		}
	});
	$('#radioboton2').caphRadiobutton({
		focusOption : {
			group : "botonRadio",
		},
		onSelected : function(event, originalEvent, selected) {
		}
	});
	$('#radioboton3').caphRadiobutton({
		focusOption : {
			group : "botonRadio"
		},
		selected : true,
		onSelected : function(event, originalEvent, selected) {
		}
	});
}

// Inicia los campos de entrada
function initEntrada() {
	$('#entrada1').caphInput({
		onChanged : function(event, value) {
			console.log("value", value);
		},
		focusOption : {
			group : 'entrada'
		},
		maxLength : 40,
		value : 'valor por defecto'
	});

	$('#entrada2').caphInput({
		onChanged : function(event, value) {
			console.log("value", value);
		},
		focusOption : {
			group : 'entrada'
		},
		maxLength : 10,
		value : '3'
	});
}

// Inicia la lista desplegable
function initDesplegable() {
	desplegable = $('#listaDesplegable').caphDropdownList({
		items : [ {
			id : 's',
			content : 'Smart TV'
		}, {
			id : 'm',
			content : 'Móvil'
		}, {
			id : 't',
			content : 'TV',
			disabled : true
		}, {
			id : 'w',
			content : 'Smart Watch'
		} ],
		focusOption : {
			group : 'desplegable',
		},
		onSelectItem : function($itemId, $event) {
			console.log($itemId + ' seleccionado');
		}
	});
}

// Inicia la lista
function initListado() {
	$('#listado').caphList({
		items : [ {
			id : 's',
			content : 'Smart TV',
			letter : 'S'
		}, {
			id : 'm',
			content : 'Móvil',
			letter : 'M'
		}, {
			id : 'w',
			content : 'Smart Watch',
			letter : 'W'
		} ],
		template : 'template1'
	});
}
