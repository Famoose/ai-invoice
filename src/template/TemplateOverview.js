import React from "react";
import {FileList} from "../overview/Files";
import Invoice from "../helper/Invoice";
import {withRouter} from "react-router-dom";

class TemplateOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: null,
            newName: ''
        }
    }

    componentDidMount() {
        window.electron.on('onTemplates', (files) => {
            this.setState({files: files});
        });
        window.electron.send('getTemplates', this.props.folder);
    }

    componentWillUnmount() {
        window.electron.removeAllListeners('onTemplates');
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value});
    }

    createTemplate = () => {
        if (!!this.state.newName && this.state.newName !== '') {
            Invoice.createTemplateFile(new Invoice(), this.state.newName).then(name => {
                this.props.history.push('/template/edit/' + name);
            });
        }
    }

    handleOnClick = (file) => {
        this.props.history.push('/template/edit/' + file);
    }

    render() {
        return (<div className="container mx-3 mx-auto space-y-3">
            <h1 className="text-2xl font-thin mt-4">Vorlagen</h1>
            <div className="form-group">
                <input placeholder="Template Name"
                       className=" px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                       value={this.state.newName}
                       onChange={this.handleNameChange} type="text"/>
                <button className="px-3 py-2 rounded-md border-2 border-gray-800 hover:border-blue-500"
                        onClick={this.createTemplate}>Erstellen
                </button>
            </div>

            {!!this.state.files && <FileList files={this.state.files} handleOnClick={this.handleOnClick}/>}
        </div>)
    }
}

export default withRouter(TemplateOverview);
