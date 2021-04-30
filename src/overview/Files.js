

function Files(props) {
    const files = window.electron.sendSync('getFilesFromFolder', props.folder);
    return (
        <FileList files={files}/>
    );
}

export default Files;

function FileList(props) {
    const files = props.files;
    const listItems = files.map((file) =>
        <li key={file.toString()} className="px-3 py-2 rounded-md shadow-sm hover:shadow-lg hover:bg-gray-200">
            {file}
        </li>
    );
    return (
        <ul className="space-y-2">{listItems}</ul>
    );
}