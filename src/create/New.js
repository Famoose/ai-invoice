import Invoice from "../helper/Invoice";
import React, {Fragment} from "react";
import SelectFolder from "../overview/SelectFolder";
import {withRouter} from "react-router-dom";
import {Dialog, Transition} from "@headlessui/react";


class New extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            folder: null,
            files: null,
            open: false,
            invoice: new Invoice(),
        };
    }

    componentDidMount() {
        window.electron.invoke('getStoreValue', 'overview-folder').then((folder) => {
            this.setState({folder: folder});
        });
        window.electron.on('onTemplates', (files) => {
            this.setState({files: files});
        });
        window.electron.send('getTemplates', this.props.folder);
    }

    componentWillUnmount() {
        window.electron.removeAllListeners('onFilesFromFolder');
    }

    closeModal = () => {
        this.setState({open:false});
    }

    openModal = (template) => {
        const invoice = Invoice.fromTemplateFile(template);
        this.setState({open: true, invoice: invoice});
    }

    handleNameChange = (event) => {
        const invoice = this.state.invoice;
        invoice.offer.title = event.target.value;
        this.setState({invoice: invoice});
    }

    handleOfferNumberChange = (event) => {
        const invoice = this.state.invoice;
        invoice.offer.offerNumber = event.target.value;
        this.setState({invoice: invoice});
    }

    newInvoice = () => {
        if(this.validCreation()){
            Invoice.saveToFile(this.state.invoice, null).then((fileName) => {
                this.props.history.push('/edit/' + fileName);
                this.closeModal()
            });
        }
    }

    validCreation = () => {
        return !!this.state.invoice.offer.title && !!this.state.invoice.offer.offerNumber;
    }

    render() {
        return (
            <div className="container mx-3 mx-auto">
                <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
                <div className="container mx-auto mt-3">
                    <div className="w-full flex justify-end">
                        <SelectFolder folder={this.state.folder}
                                      setFolder={(folder) => this.setState({folder: folder})}/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                    {!!this.state.files && this.state.files.map( (file) => {
                        const name = file.slice(0,-5);
                        return <div key={file} onClick={ () => this.openModal(file)}
                            className="text-gray-800 p-10 shadow-sm hover:shadow-lg rounded-md bg-gray-200 text-center text-2xl cursor-pointer font-semibold">{name}</div>
                    })}
                </div>


                <Transition show={this.state.open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        static
                        open={this.state.open}
                        onClose={this.closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
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
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Erstellen
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col space-y-2">
                                            <input placeholder="Template Name"
                                                   className=" px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                                   value={this.state.invoice.offer.title}
                                                   onChange={this.handleNameChange} type="text"/>

                                            <input placeholder="Belegnummer"
                                                   className=" px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                                   value={this.state.invoice.offer.offerNumber}
                                                   onChange={this.handleOfferNumberChange} type="text"/>
                                    </div>

                                    <div className="mt-4">
                                        <Transition show={this.validCreation()}
                                                    enter="transition-opacity duration-150"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="transition-opacity duration-150"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0">
                                            <button
                                                type="button"
                                                className="inline-flex disabled:bg-gray-200 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={this.newInvoice}
                                            >Erstellen
                                            </button>
                                        </Transition>

                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>

            </div>
        )
    }
}

export default withRouter(New);
