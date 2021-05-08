import React, {useState} from "react";
import {SearchIcon} from "@heroicons/react/outline";
import {withRouter} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {Transition} from "@headlessui/react";
import {RefreshIcon} from "@heroicons/react/solid";
import SelectFolder from "./SelectFolder";

class Files extends React.Component {
    files;

    constructor(props) {
        super(props);
        this.state = {
            search: null,
            filesFilter: null
        };
        console.log("constructor");
    }

    componentDidMount() {
        window.electron.invoke('getStoreValue', 'overview-folder').then((folder) => {
            this.setState({folder: folder});
            if (folder) {
                window.electron.send('getFilesFromFolder', this.state.folder);
            }
        });

        window.electron.on('onFilesFromFolder', (files) => {
            console.log(files);
            this.files = files.filter(file => file.includes('.json'))
            this.setState({filesFilter: this.filterFiles(this.state.search, this.files)});
        });
    }

    handleSearchChange = (event) => {
        if (event.target.value) {
            this.setState({
                search: event.target.value,
                filesFilter: this.filterFiles(event.target.value, this.files)
            });
        }
    }

    filterFiles = (search, files): String[] => {
        if (search && files) {
            return files.filter(file => file.toLowerCase().includes(search.toLowerCase()));
        }
        return files;
    }

    componentWillUnmount() {
        window.electron.removeAllListeners('onFilesFromFolder');
    }

    handleOnClick = (file) => {
        this.props.history.push('/edit/' + file);
    }

    setFolder = (folder) => {
        window.electron.send('getFilesFromFolder', folder);
        this.setState({folder: folder});
    }

    render() {
        return (
            <>
                <div className="w-full flex justify-end">
                    <SelectFolder folder={this.state.folder} setFolder={this.setFolder}/>
                </div>
                {this.state.folder &&
                <div>
                    <SearchIcon className="inline-block h-6 mr-2"/>
                    <input placeholder="Suchen"
                           className="mb-2 px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                           onChange={this.handleSearchChange} type="text"/>
                    {!this.state.filesFilter && <RefreshIcon className="animate-spin h-6 m-auto"/>}
                    {!!this.state.filesFilter &&
                    <FileList files={this.state.filesFilter} handleOnClick={this.handleOnClick}/>}
                </div>
                }
            </>

        )
    };
}

export default withRouter(Files);

export function FileList(props) {
    let perPage = 10;
    const [offset, setOffset] = useState(0);
    const files = props.files;
    const pageCount = files.length / perPage;

    const listItems = getSliceFiles().map((file) =>
        <li key={file.toString()} onClick={() => props.handleOnClick(file)}
            className="px-3 py-2 rounded-md shadow-sm hover:shadow-lg hover:bg-gray-200 cursor-pointer">
            {file.slice(0, -5)}
        </li>
    );

    function handlePageClick(page) {
        setOffset(page.selected);
    }

    function getSliceFiles() {
        const start = perPage * offset;
        const end = start + perPage <= files.length ? start + perPage : files.length
        return files.slice(start, end);
    }

    return (
        <div className="">
            <Transition
                appear={true}
                show={true}
                enter="transition-opacity duration-5000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <ul className="space-y-2 pt-2">{listItems}</ul>
            </Transition>
            <div className="container mx-auto absolute inset-x-0 bottom-0">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName="flex md:mx-40 xl:mx-80 px-2 py-2 bg-gray-500 justify-around rounded-t-lg text-white"
                    activeClassName="text-gray-900"
                /></div>
        </div>

    );
}