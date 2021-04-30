import Files from "./Files";
import React from "react";

function Overview(){
    function selectFolder() {
        console.log('onclick');
        window.electron.sendSync('select-dirs', null);
    }
    return (
        <div className="container mx-3 mx-auto">
            <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
            <div className="container mx-auto mt-3">
                <button className="" onClick={selectFolder}>Verzeichnis wählen</button>
                <Files folder="/"/>
            </div>
        </div>);
}
export default Overview;
