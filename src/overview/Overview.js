import Files from "./Files";
import React from "react";

function Overview(){
    return (
        <div className="container mx-3 mx-auto">
            <h1 className="text-xl font-thin">Übersicht</h1>
            <div className="container mx-auto mt-3">
                <Files/>
                <input type="file" id="file-input"/>
            </div>
        </div>);
}
export default Overview;
