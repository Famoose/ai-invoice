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
        </div>);
    }
}

export default Edit;
