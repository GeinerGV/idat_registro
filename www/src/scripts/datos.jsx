class Datos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {rows: []}
	}

	componentDidMount() {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({ rows: data});
			}
		}
		xmlhttp.open("GET", "/datos?data=get&json=true", true);
		xmlhttp.send();
	}

	render () {
		const rows = this.state.rows.map((row, id) => <Row key={"row"+id} cols={row} />);
		return (
			<table class="table table-hover">
				<thead>
					<tr>
						<th>FECHA - HORA</th>
						<th>DNI</th>
						<th>NOMBRE Y APELLIDO</th>
						<th>TELEFONO</th>
						<th>DISTRITO</th>
						<th>ATENDIDO POR</th>
						<th>USUARIO</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

function Row(props) {
	const columns = props.cols.map((col, id) => <td key={"col"+id}>{col}</td>);
	return (
		<tr>
			{columns}
		</tr>
	);
}

ReactDOM.render(<Datos />, document.querySelector("#datos-cnt"));