function GenNavs(props) {
    const asesores = typeof props.asesores != 'undefined' ? props.asesores.map((val) => <AsesorOption val={val} key={val} />) : null;
    return (
        <React.Fragment>
            <p className="navbar-text">{props.correo}</p>
            <div className="navbar-form navbar-left" role="search">
                <div className="form-group">
                <select className="form-control">{asesores}</select>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </div>
			<button href="/logout" type="button" className="btn btn-default navbar-btn navbar-right">Cerrar sesión</button>
        </React.Fragment>
    );
}

function AsesorOption(props) {
    return <option id={props.asesor}>{props.asesor}</option>
}

var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <GenNavs {...r_ele.state.navbar_props} />});
}