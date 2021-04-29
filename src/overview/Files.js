

function Files() {
    const files = [{
        name: "test.txt"
    }, {
        name: "test.txt"
    }, {
        name: "test.txt"
    }]
    window.electron.getFilesFromFolder('C:\\Users\\lukas');
    return (
        <FileList files={files}/>
    );
}

export default Files;

function FileList(props) {
    const files = props.files;
    const listItems = files.map((file) =>
        <li key={file.name.toString()} className="bg-green-900 px-3 py-2 rounded-md shadow-sm hover:bg-green-800 hover:shadow-lg hover:py-3">
            {file.name}
        </li>
    );
    return (
        <ul className="space-y-2">{listItems}</ul>
    );
}