import React, {useState} from "react";
import {SearchIcon} from "@heroicons/react/outline";
import {withRouter} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {Transition} from "@headlessui/react";
import {RefreshIcon} from "@heroicons/react/solid";

class Files extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: null,
            files: null
        };
        // read and filter only project files (json)
        if (this.state.search) {
            this.files = this.files.filter(file => file.includes(this.search.search));
        }
    }

    componentDidMount() {
        window.electron.on('onFilesFromFolder', (files) => {
            console.log(files);
            this.setState({files: files.filter(file => file.includes('.json'))});
        });
        window.electron.send('getFilesFromFolder', this.props.folder);
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value});
    }

    componentWillUnmount() {
        window.electron.removeAllListeners('onFilesFromFolder');
    }

    handleOnClick = (file) => {
        this.props.history.push('/edit/' + file);
    }

    render() {
        return (
            <div>
                <SearchIcon className="inline-block h-6 mr-2"/>
                <input placeholder="Suchen"
                       className="mb-2 px-3 py-2 rounded-md shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                       onChange={this.handleSearchChange} type="text"/>
                {!this.state.files && <RefreshIcon className="animate-spin h-6 m-auto"/>}
                {!!this.state.files && <FileList files={this.state.files} handleOnClick={this.handleOnClick}/>}
            </div>
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
            {file.slice(0,-5)}
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