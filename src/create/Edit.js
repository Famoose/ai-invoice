import React from "react";
import Invoice from "../helper/Invoice";

import InvoiceForm from "../helper/InvoiceForm";

class Edit extends React.Component {
    invoice

    constructor(props) {
        super(props);
        this.state = {}
        this.invoice = Invoice.fromFile(this.props.match.params.path)
    }

    submitAction = (invoice: Invoice) => {
        Invoice.saveToFile(invoice, this.props.match.params.path).then()
    }

    render() {
        return (<div className="container mx-3 mx-auto">
            <div className="flex items-end space-x-2">
                <h1 className="text-2xl font-thin mt-4">Bearbeite: </h1>
                <code>{this.props.match.params.path}</code>
            </div>
            <InvoiceForm invoice={this.invoice} submitAction={this.submitAction}/>
        </div>)
    }
}

export default Edit;
