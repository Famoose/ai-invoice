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
        <div>
            <SelectFolder folder={folder} setFolder={setFolder}/>
            <button className="border-2 border-gray-800 px-3 py-2 rounded-md" onClick={newInvoice}>Neue Rechung
            </button>
        </div>
    )
}
export default New;
