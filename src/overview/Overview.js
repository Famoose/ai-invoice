import Files from "./Files";
import React from "react";
import SelectFolder from "./SelectFolder";

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null
        }
    }

    componentDidMount() {
        window.electron.invoke('getStoreValue', 'overview-folder').then((folder) => {
            this.setState({folder: folder});
        });
    }

    render() {
        return (
            <div className="container mx-3 mx-auto">
                <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
                <div className="container mx-auto mt-3">
                    <div className="w-full flex justify-end">
                        <SelectFolder folder={this.state.folder} setFolder={ (folder) => this.setState({folder: folder})}/>
                    </div>
                    {!!this.state.folder && <Files folder={this.state.folder}/>}
                </div>
            </div>)
    };
}
export default Overview;
