class Invoice {
    header: Header;
    footer: Footer;
    discount: number;
    address: Address;
    offer: Offer;
    orderPositions: OrderPosition[];
    credits: Credit[];

    static fromFile(path): Invoice {
        if (path.includes('.json')) {
            const data = window.electron.sendSync('readFile', path);
            return JSON.parse(data);
        }
    }

    static saveToFile(invoice: Invoice) {
        window.electron.invoke('saveFile', invoice);
    }
}

class Address {
    intro: string;
    name1: string;
    name2: string;
    address1: string;
    address2: string;
    plz: string;
    place: string;
    phone: string;
    comments: string[];
}

class Offer {
    description: string;
    title: string;
    offerNumber: string;
    orderDate: Date;
    invoicingDate: Date;
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
}

class Header {
    logo: Blob;
    mwst: string;
    address: string[];
}

class Footer {
    line: string[];
}

export default Invoice;