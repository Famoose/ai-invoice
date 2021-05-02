import React from "react";
import Invoice from "./Invoice";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: Invoice.fromFile(this.props.match.params.path)
        };
    }

    render() {
        return (<div>
            edit : {this.props.match.params.path}
            <div>
                {JSON.stringify(this.state.invoice)}
            </div>
            <button onClick={ () => console.log(window.electron.sendSync('getStoreValue', 'overview-folder'))}> set name</button>
        </div>);
    }
}

export default Edit;
