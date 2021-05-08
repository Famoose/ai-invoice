import Files from "./Files";
import React from "react";

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container mx-3 mx-auto">
                <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
                <div className="container mx-auto mt-3">
                    <Files/>
                </div>
            </div>)
    };
}

export default Overview;
