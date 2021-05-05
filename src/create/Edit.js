import React, {Fragment} from "react";
import Invoice from "../helper/Invoice";

import InvoiceForm from "../helper/InvoiceForm";
import InvoicePDF from "../helper/InvoicePDF";
import {PDFViewer} from '@react-pdf/renderer';
import {PrinterIcon} from "@heroicons/react/solid";
import {Dialog, Transition} from "@headlessui/react";

class Edit extends React.Component {
    submitForm = null;

    constructor(props) {
        super(props);
        this.state = {
            openPrint: false,
            invoice: Invoice.fromFile(this.props.match.params.path)
        }
    }

    submitAction = (invoice: Invoice) => {
        return Invoice.saveToFile(invoice, this.props.match.params.path).then((filename) => {
            this.setState({invoice: invoice});
            this.props.match.params.path = filename;
        })
    }

    openPrint = () => {
        this.submitForm().then(() => {
            this.setState({openPrint: true});
        })
    }

    closePrint = () => {
        this.setState({openPrint: false});
    }

    bindSubmitForm = (submitForm) => {
        this.submitForm = submitForm;
    };

    render() {
        return (<div className="container mx-3 mx-auto">
            <div className="flex justify-between content-center mt-4">
                <div className="flex items-end space-x-2">
                    <h1 className="text-2xl font-thin mt-4">Bearbeite: </h1>
                    <code>{this.props.match.params.path}</code>
                </div>
                <button onClick={this.openPrint}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800">
                    <PrinterIcon className="h-8 w-8"/>
                </button>
            </div>


            <Transition show={this.state.openPrint} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    static
                    open={this.state.openPrint}
                    onClose={this.closePrint}
                >
                    <div className="min-h-screen p-10 px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Drucken Vorschau
                                </Dialog.Title>
                                <div className="mt-2 flex flex-col space-y-2">
                                    {this.state.openPrint &&
                                    <PDFViewer height={600}>
                                        <InvoicePDF invoice={this.state.invoice}/>
                                    </PDFViewer>
                                    }
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex disabled:bg-gray-200 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={this.closePrint}
                                    >Schliessen
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <InvoiceForm invoice={this.state.invoice} submitAction={this.submitAction} bindSubmitForm={this.bindSubmitForm}/>
        </div>)
    }
}

export default Edit;
