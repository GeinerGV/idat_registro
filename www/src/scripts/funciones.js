var setValidatorEle = function(e, newTipo) {
	const tipos = ['success', "warning", "error"];
	tipos.forEach((tipo) => {
		if (tipo != newTipo) {
			e.classList.remove("has-"+tipo);
		} else {
			e.classList.add("has-"+newTipo);
		}
	});
}

function setValidator(e, newTipo) {
	let grupo = e.target.closest(".form-group");
	setValidatorEle(grupo, newTipo);
}

function setWarning(e) {
	setValidator(e, "warning");
}

function setError(e) {
	setValidator(e, "error");
}

function setSuccess(e) {
	setValidator(e, "success");
}

function Alerta(props) {
	let id = "Alert_T"+(new Date().getTime());
	setTimeout(() => {
		$("#"+id).alert('close');
	}, 4000);
	return (
		`<div class="${'alert alert-'+props.tipo+' alert-dismissible'}" id="${id}" role="alert">`+
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			`<strong>${props.msg}</strong>`+
		'</div>'
	);
}
