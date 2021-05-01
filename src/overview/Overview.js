import Files from "./Files";
import React, {useState} from "react";
import SelectFolder from "./SelectFolder";

function Overview(){
    const [folder, setFolder] = useState(window.electron.sendSync('getStoreValue', 'overview-folder'));

    return (
        <div className="container mx-3 mx-auto">
            <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
            <div className="container mx-auto mt-3">
                <div className="w-full flex justify-end">
                    <SelectFolder folder={folder} setFolder={setFolder}/>
                </div>
                {!!folder && <Files folder={folder}/>}
            </div>
        </div>);
}
export default Overview;
