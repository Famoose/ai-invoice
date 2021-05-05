import React from "react";
import Invoice from "../helper/Invoice";
import {withRouter} from "react-router-dom";

import InvoiceForm from "../helper/InvoiceForm";
import {TrashIcon} from "@heroicons/react/outline";

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
        return Invoice.saveTemplateFile(invoice, this.path, this.state.name);
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    deleteTemplate = () => {
        window.electron.invoke('deleteTemplate', this.path).then(() => {
            this.props.history.push('/template');
        })
    }

    render() {
        return (<div className="container mx-3 mx-auto">
            <div className="flex items-end space-x-2">
                <h1 className="text-2xl font-thin mt-4">Bearbeite: </h1>
                <code>{this.path}</code>
            </div>
            <div className="flex justify-between items-center">
                <input placeholder="Template Name"
                       className="my-2 px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                       value={this.state.name}
                       onChange={this.handleNameChange} type="text"/>
                <button onClick={this.deleteTemplate}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800">
                    <TrashIcon className="h-8 w-8"/>
                </button>
            </div>
            <InvoiceForm invoice={this.invoice} submitAction={this.submitAction}/>
        </div>)
    }
}

export default withRouter(EditTemplate);
