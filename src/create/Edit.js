import React from "react";
import Invoice from "../helper/Invoice";

import InvoiceForm from "../helper/InvoiceForm";
import InvoicePDF from "../helper/InvoicePDF";
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';

class Edit extends React.Component {
    invoice

    constructor(props) {
        super(props);
        this.state = {
            rerender: true
        }
        this.invoice = Invoice.fromFile(this.props.match.params.path)
    }

    submitAction = (invoice: Invoice) => {
        Invoice.saveToFile(invoice, this.props.match.params.path).then()
    }

    renderPDF = () => {
        //window.electron.invoke('renderPDF').then();
    }

    rerender = () => {
        this.setState({rerender: false});
        setTimeout(() => {
            this.setState({rerender: true});
        }, 1000);

    }

    render() {
        return (<div className="container mx-3 mx-auto">
            <div className="flex items-end space-x-2">
                <h1 className="text-2xl font-thin mt-4">Bearbeite: </h1>
                <code>{this.props.match.params.path}</code>
            </div>
            <button
                onClick={this.renderPDF}
                className="fixed py-3 z-30 px-2 bottom-6 right-48 bg-blue-500  text-white rounded-md shadow-md">
                {/*<PDFDownloadLink document={<InvoicePDF/>} fileName="somename.pdf">*/}
                {/*    {({blob, url, loading, error}) =>*/}
                {/*        loading ? 'Loading document...' : 'Download now!'*/}
                {/*    }*/}
                {/*</PDFDownloadLink>*/}
            </button>
            <button onClick={this.rerender}>
                rerender
            </button>
            {this.state.rerender &&
                <PDFViewer className="w-full" height={800}>
                    <InvoicePDF invoice={this.invoice}/>
                </PDFViewer>
            }

            <InvoiceForm invoice={this.invoice} submitAction={this.submitAction}/>
        </div>)
    }
}

export default Edit;
