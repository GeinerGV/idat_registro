function SettNavs(props) {
    return (
        <GenNavs {...props.gen_props} asesor_ref={props.asesor_ref} />
    );
}

/* var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <SettNavs  {...r_ele.state.navbar_props} key={Object.keys(r_ele.state.navbar_props).join("")} />});
} */

var Navs = SettNavs;