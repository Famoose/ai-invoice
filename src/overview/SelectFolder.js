import React from "react";

function SelectFolder(props) {

    function selectFolder() {
        const selectedFolder = window.electron.sendSync('select-dirs', null)
        window.electron.invoke('setStoreValue', {key: 'overview-folder', value: selectedFolder}).then( () => {
          if(props.setFolder){
              props.setFolder(selectedFolder);
          }
        });
    }

    return (
        <div>
            <button className="border-2 border-gray-800 px-3 py-2 rounded-md hover:shadow-md hover:bg-gray-200" onClick={selectFolder}>Verzeichnis
                wählen
            </button>
            <code className="item-end pl-2">{props.folder}</code>
        </div>);
}

export default SelectFolder;
