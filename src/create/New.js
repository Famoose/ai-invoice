import Invoice from "./Invoice";
import React from "react";
import {withRouter} from 'react-router-dom';
import SelectFolder from "../overview/SelectFolder";

class New extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            folder: null
        };
    }

    componentDidMount() {
        window.electron.invoke('getStoreValue', 'overview-folder').then((folder) => {
           this.setState({folder: folder});
        });
    }

    newInvoice() {
        const invoice = new Invoice();
        invoice.offer = {
            offerNumber: 123,
            title: 'Rechnung',
            description: 'Test'
        }
        Invoice.saveToFile(invoice).then( (fileName) => {
            this.props.history.push('/edit/' + fileName);
        });
    }

    render() {
        return (
            <div className="container mx-3 mx-auto">
                <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
                <div className="mx-3 mx-auto container flex w-full justify-between">
                    <button className="border-2 border-gray-800 px-3 py-2 rounded-md"
                            onClick={() => this.newInvoice()}>Neue Rechung
                    </button>
                    <SelectFolder folder={this.state.folder} setFolder={ (folder) => this.setState({folder: folder})}/>
                </div>
                list template here to click on
            </div>
        )
    }
}

export default withRouter(New);
