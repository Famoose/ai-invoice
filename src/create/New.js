import SelectFolder from "../overview/SelectFolder";
import {useState} from "react";
import Invoice from "./Invoice";

function New() {
    const [folder, setFolder] = useState(window.electron.sendSync('getStoreValue', 'overview-folder'));

    function newInvoice(){
        const invoice = new Invoice();
        invoice.offer = {offerNumber: 123,
        title: 'Rechnung',
        description: 'Test'}
        Invoice.saveToFile(invoice);
    }

    return (
        <div className="container mx-3 mx-auto">
            <h1 className="text-2xl font-thin mt-4">Übersicht</h1>
            <div className="mx-3 mx-auto container flex w-full justify-between">
                <button className="border-2 border-gray-800 px-3 py-2 rounded-md" onClick={newInvoice}>Neue Rechung
                </button>
                <SelectFolder folder={folder} setFolder={setFolder}/>
            </div>
            list template here to click on
        </div>
    )
}
export default New;
