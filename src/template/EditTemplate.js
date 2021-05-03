import React from "react";
import Invoice from "../helper/Invoice";

import InvoiceForm from "../helper/InvoiceForm";

class EditTemplate extends React.Component {
    invoice

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.path.slice(0, -5)
        }
        this.invoice = Invoice.fromTemplateFile(this.props.match.params.path)
        this.path = this.props.match.params.path;
    }

    submitAction = (invoice: Invoice) => {
        Invoice.saveTemplateFile(invoice, this.path, this.state.name).then();
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    render() {
        return (<div className="container mx-3 mx-auto">
            <div className="flex items-end space-x-2">
                <h1 className="text-2xl font-thin mt-4">Bearbeite: </h1>
                <code>{this.path}</code>
            </div>
            <input placeholder="Template Name"
                   className="my-2 px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                   value={this.state.name}
                   onChange={this.handleNameChange} type="text"/>
            <InvoiceForm invoice={this.invoice} submitAction={this.submitAction}/>
        </div>)
    }
}

export default EditTemplate;
