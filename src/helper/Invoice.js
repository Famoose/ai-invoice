/* eslint-disable no-use-before-define */
import {DefaultFileExt} from "../constants";

class Invoice {
    header: Header;
    discount: number;
    address: Address;
    offer: Offer;
    orderPositions: OrderPosition[];
    credits: Credit[];
    comment: string;
    condition: string;

    constructor() {
        this.offer = {};
        this.orderPositions = [];
        this.credits = [];
        this.header = {};
        this.footer = {};
    }

    static fromFile(path): Invoice {
        if (path.includes(DefaultFileExt)) {
            const data = window.electron.sendSync('readFile', path);
            return JSON.parse(data);
        }
    }

    static fromTemplateFile(path): Invoice {
        if (path.includes(DefaultFileExt)) {
            const data = window.electron.sendSync('readTemplateFile', path);
            return JSON.parse(data);
        }
    }

    static saveToFile(invoice: Invoice, oldFilename: string): Promise<string> {
        return window.electron.invoke('saveFile', {invoice: invoice, oldFilename: oldFilename});
    }

    static saveTemplateFile(invoice: Invoice, oldFilename: string, fileName: string): Promise<string> {
        return window.electron.invoke('saveTemplateFile', {invoice: invoice, oldFilename: oldFilename, fileName: fileName});
    }

    static createTemplateFile(invoice: Invoice, fileName: string): Promise<string> {
        return window.electron.invoke('createTemplateFile', {invoice:invoice, fileName: fileName});
    }

    static createFile(invoice: Invoice): Promise<string> {
        return window.electron.invoke('createFile', invoice);
    }
}

class Address {
    intro: string;
    name1: string;
    address1: string;
    plz: string;
    place: string;
}

class Offer {
    description: string;
    title: string;
    offerNumber: string;
    orderDate: Date;
    invoicingDate: Date;
    comments: string;
    phone: string;
}

class OrderPosition {
    description: string;
    amount: number;
    price: number;
    total: number;
}

class Credit {
    description: string;
    amount: number;
    percentage: number;
}

class Header {
    logo: string;
    mwst: string;
    contact: string;
}

export default Invoice;