import React, {useState} from "react";
import {SearchIcon} from "@heroicons/react/outline";
import {Link} from "react-router-dom";


function Files(props) {
    const [search, setSearch] = useState();

    let files = window.electron.sendSync('getFilesFromFolder', props.folder);

    if(search){
        files = files.filter(file => file.includes(search));
    }

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
                <SearchIcon className="inline-block h-6 mr-2" />
            <input placeholder="Suchen" className="mb-2 px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                   onChange={handleSearchChange} type="text" />
            <FileList files={files}/>
        </div>
    );
}

export default Files;

function FileList(props) {
    const files = props.files;
    const listItems = files.map((file) =>
        <li key={file.toString()} className="px-3 py-2 rounded-md shadow-sm hover:shadow-lg hover:bg-gray-200">
            <Link to={'/edit/' + file} > {file}</Link>
        </li>
    );
    return (
        <ul className="space-y-2">{listItems}</ul>
    );
}