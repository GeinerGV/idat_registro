function Alerta(props) {
	return (
		<div className={"alert alert-"+props.alert+" alert-dismissible"} role="alert">
			<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<strong>{props.msg}</strong>
		</div>
	);
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {email: '', pass: '', save: true, alert: null};

		this.handleInput = this.handleInput.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSave(e) {
		this.setState({save: e.target.checked});
	}

	handleInput(event) {
		let grupo = event.target.closest(".form-group");
		let len = event.target.value.length;
		if (len) {
			let id = event.target.id;
			grupo.classList.remove("has-success", "has-success", "has-error");
			if ((id=="email" && len>5) || (id="password" && len>7)) {
				// if (!grupo.classList.contains("has-success")) {
				// 	grupo.classList.remove("has-success", "has-error");
					grupo.classList.add("has-success");
					switch (id) {
						case "email":
							this.setState({email: event.target.value});
							break;
						case "password":
							this.setState({pass: event.target.value});
							break;
					}
				// }
			} else {
				// if (!grupo.classList.contains("has-error")) {
				// 	grupo.classList.remove("has-success", "has-warming");
					grupo.classList.add("has-error");
				// }
			}
		} else {
			grupo.classList.remove("has-success", "has-error");
			grupo.classList.add("has-warming");
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.email.length && this.state.pass.length) {
			let xmlhttp = new XMLHttpRequest();

			let params = `email=${this.state.email}&pass=${this.state.pass}&save=${this.state.save}`;
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// document.getElementById("txtHint").innerHTML = this.responseText;
					var data = xmlhttp.response;
					console.log(data);
				}
			};
			xmlhttp.open("POST", "/login/", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);
		}
	}
	
	render() {
		return (
			<div>
				{this.state.alert}
				<div class="panel panel-default">
					<div class="panel-body">
						<form className="form-horizontal" onSubmit={this.handleSubmit} action="/login">
							<div className="form-group">
								<label htmlFor="Email" className="col-sm-2 control-label">Email</label>
								<div className="col-sm-10">
									<input type="email" className="form-control" id="email" placeholder="Email" required={true} minLength={6} onChange={this.handleInput} />
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="password" className="col-sm-2 control-label">Contraseña</label>
								<div className="col-sm-10">
								<input type="password" className="form-control" id="password" placeholder="Contraseña" required={true} minLength={8} onChange={this.handleInput} />
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
								<div className="checkbox">
									<label>
										<input type="checkbox" checked={true} onChange={this.handleSave} /> Recordarme
									</label>
								</div>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
								<button type="submit" className="btn btn-default">Iniciar Sesión</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Login />, document.querySelector('#login-cnt'))