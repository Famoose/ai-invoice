import React from "react";
import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import {Font} from '@react-pdf/renderer'
import moment from "moment";
import {getTotal, getTotalWithDiscount, getTotalWithDiscountAndCredit} from "./InvoiceForm";

import robotoRegular from "@fontsource/roboto/files/roboto-all-500-normal.woff";
import robotoBold from "@fontsource/roboto/files/roboto-all-900-normal.woff";
import robotoMedium from "@fontsource/roboto/files/roboto-all-700-normal.woff";
import robotoLight from "@fontsource/roboto/files/roboto-all-300-normal.woff";
import robotoThin from "@fontsource/roboto/files/roboto-all-100-normal.woff";

import robotoSlabRegular from "@fontsource/roboto-slab/files/roboto-slab-all-500-normal.woff";
import robotoSlabBold from "@fontsource/roboto-slab/files/roboto-slab-all-900-normal.woff";
import robotoSlabMedium from "@fontsource/roboto-slab/files/roboto-slab-all-700-normal.woff";
import robotoSlabLight from "@fontsource/roboto-slab/files/roboto-slab-all-300-normal.woff";
import robotoSlabThin from "@fontsource/roboto-slab/files/roboto-slab-all-100-normal.woff";

Font.register({
    family: 'Roboto', fonts: [
        {src: robotoRegular},
        {src: robotoBold, fontWeight: 'bold'},
        {src: robotoMedium, fontWeight: 'medium'},
        {src: robotoThin, fontWeight: 'thin'},
        {src: robotoLight, fontWeight: 'light'},
    ]
});

Font.register({
    family: 'RobotoSlab', fonts: [
        {src: robotoSlabRegular},
        {src: robotoSlabBold, fontWeight: 'bold'},
        {src: robotoSlabMedium, fontWeight: 'medium'},
        {src: robotoSlabThin, fontWeight: 'thin'},
        {src: robotoSlabLight, fontWeight: 'light'},
    ]
});

const styles = StyleSheet.create({

    header: {
        fontFamily: 'RobotoSlab',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10,
        maxHeight: 60
    },

    logo: {
        height: 60
    },

    headerMwst: {
        marginBottom: 4
    },

    page: {
        fontWeight: 'light',
        fontFamily: 'Roboto',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: 'black'
    },

    footer: {
        margin: 20,
    },

    content: {
        flexGrow: 1
    },

    address: {
        marginTop: 80,
        marginBottom: 80,
        marginRight: 150,
        marginLeft: 'auto',
        fontSize: 11,
    },

    pageNumber: {
        fontSize: 10,
        textAlign: 'center',
        color: 'grey',
    },

    offer: {
        marginLeft: 40,
        marginRight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
    },

    offerTitle: {
        fontSize: 15,
        maxWidth: '70%',
    },

    offerDescription: {
        fontSize: 10,
        fontWeight: 'thin'
    },

    offerComment: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        fontSize: 10,
        fontWeight: 'thin'
    },

    orderPositions: {
        marginLeft: 40,
        marginRight: 40,
        fontSize: 10,
        fontWeight: 'thin'
    },

    opHeader: {
        border: '1 dashed grey',
        borderLeft: '0',
        borderRight: '0',
        padding: 5,
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },

    discount: {
        border: '1 dashed grey',
        borderLeft: '0',
        borderRight: '0',
        padding: 5,
        marginTop: 3,
        alignItems: 'center',
        flexDirection: 'row',
    },

    opC1: {
        margin: 2,
        flex: 3,
    },

    opC2: {
        margin: 2,
        flex: 1
    },

    opC3: {
        margin: 2,
        flex: 1
    },

    opC4: {
        margin: 2,
        flex: 1,
        textAlign: 'right',
    },


    opContent: {
        padding: 5,
    },

    opLine: {
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    creditTitle: {
        fontSize: 10,
        fontWeight: 'thin'
    },

    totalLine: {
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'baseline',
        fontSize: 10,
    },

    totalWithDiscountLine: {
        marginTop: 3,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'baseline',
        fontSize: 10,
    },

    totalWithDiscountAndCreditLine: {
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'baseline',
        fontSize: 10,
        borderBottom: 2
    },

    orderComment: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        fontSize: 10,
    },

    orderCommentElement: {
        marginTop: 10,
        marginBottom: 10,
    }
});

const Address = (props) => (<>
        <Text>{props.address.intro} {props.address.name1}</Text>
        <Text>{props.address.address1}</Text>
        <Text>{props.address.plz} {props.address.place}</Text>
    </>
)

const Header = (props) => (<>
        {props.header.logo && <Image style={styles.logo} src={props.header.logo}/>}
        <View>
            <Text style={styles.headerMwst}>{props.header.mwst}</Text>
            <Text>{props.header.contact}</Text>
        </View>
    </>
)

const showDate = (date) => {
    return date && date.length !== 0;
}

const Date = (props) => (
    <View>
        <Text>{showDate(props.date) &&
        props.title + ': ' + moment(props.date).format('DD.MM.YYYY')}</Text>
    </View>
)

const isDefined = (prop) => {
    return !(prop === null || prop === undefined || prop === '')
}

const Offer = (props) => (<>
        <View style={styles.offer}>
            <View>
                <Text style={styles.offerTitle}>{props.offer.title} {props.offer.offerNumber}</Text>
                <Text style={styles.offerDescription}>{props.offer.description}</Text>
            </View>
            <View style={styles.offerDescription}>
                <Date title="Bestelldatum" date={props.offer.orderDate}/>
                <Date title="Rechnungsdatum" date={props.offer.invoicingDate}/>
                {isDefined(props.offer.phone) && <Text>Telefon: {props.offer.phone}</Text>}
            </View>
        </View>
        <View style={styles.offerComment}>
            <Text>
                {props.offer.comments}
            </Text>
        </View>
    </>
)

const OrderPositionsTable = (props) => (<>
        <View style={styles.orderPositions}>
            <View style={styles.opHeader} fixed>
                <View style={styles.opC1}>
                    <Text>Bezeichnung</Text>
                </View>
                <View style={styles.opC2}>
                    <Text>Menge</Text>
                </View>
                <View style={styles.opC3}>
                    <Text>Preis</Text>
                </View>
                <View style={styles.opC4}>
                    <Text>Total</Text>
                </View>
            </View>
            <View style={styles.opContent}>
                {props.ops.map((op, index) => <OrderPosition key={index} op={op}/>)}
            </View>
            <View style={styles.opFooter}>
                {/*/maybe uebertrag/*/}
            </View>
        </View>
    </>
)

function numberWithCommas(x) {
    if (x) {
        x = parseFloat(x).toFixed(2)
        return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\'')
    }
    return '';
}

const OrderPosition = (props) => (<View style={styles.opLine}>
        <View style={styles.opC1}>
            <Text>{props.op.description}</Text>
        </View>
        <View style={styles.opC2}>
            <Text>{props.op.amount}</Text>
        </View>
        <View style={styles.opC3}>
            <Text>{numberWithCommas(props.op.price)}</Text>
        </View>
        <View style={styles.opC4}>
            <Text>{numberWithCommas(props.op.total)}</Text>
        </View>
    </View>
)

const OrderComment = (props) => (<>
        <View style={styles.orderComment}>
            {isDefined(props.invoice.condition) && <Text style={styles.orderCommentElement}>
                Konditionen: {props.invoice.condition}
            </Text>}
            {isDefined(props.invoice.comment) && (<>
                <Text style={styles.creditTitle}>Bemerkung</Text>
                <Text style={styles.orderCommentElement}>
                    {props.invoice.comment}
                </Text></>)}
        </View>
    </>
)

const Discount = (props) => (<>
    <View style={styles.orderPositions}>
        <View style={styles.discount}>
            <View style={styles.opC1}>
                <Text>Rabatt</Text>
            </View>
            <View style={styles.opC2}>
            </View>
            <View style={styles.opC3}>
            </View>
            <View style={styles.opC4}>
                <Text>{props.discount}%</Text>
            </View>
        </View>
    </View>
</>)

const Total = (props) => (<>
    <View style={styles.totalLine}>
        <View style={styles.opC1}>
            <Text>Zwischensumme</Text>
        </View>
        <View style={styles.opC2}>
        </View>
        <View style={styles.opC3}>
        </View>
        <View style={styles.opC4}>
            <Text>{numberWithCommas(getTotal(props.invoice))}</Text>
        </View>
    </View>
</>)

const TotalWithDiscount = (props) => (<>
    <View style={styles.totalWithDiscountLine}>
        <View style={styles.opC1}>
            <Text>Zwischensumme</Text>
        </View>
        <View style={styles.opC2}>
        </View>
        <View style={styles.opC3}>
        </View>
        <View style={styles.opC4}>
            <Text>{numberWithCommas(getTotalWithDiscount(props.invoice))}</Text>
        </View>
    </View>
</>)

const TotalWithDiscountAndCredit = (props) => (<>
    <View style={styles.totalWithDiscountAndCreditLine}>
        <View style={styles.opC1}>
            <Text>Total</Text>
        </View>
        <View style={styles.opC2}>
        </View>
        <View style={styles.opC3}>
        </View>
        <View style={styles.opC4}>
            <Text>{numberWithCommas(Math.round(getTotalWithDiscountAndCredit(props.invoice) * 2) / 2)}</Text>
        </View>
    </View>
</>)

const Credits = (props) => (<View style={styles.orderPositions}>
        <Text style={styles.creditTitle}>Zuschläge/Gutschriften</Text>
        <View style={styles.opContent}>
            {props.credits.map((c, index) => <Credit key={index} credit={c}/>)}
        </View>
    </View>
)

const Credit = (props) => (<View style={styles.opLine}>
        <View style={styles.opC1}>
            <Text>{props.credit.description}</Text>
        </View>
        <View style={styles.opC2}>
        </View>
        <View style={styles.opC3}>
        </View>
        <View style={styles.opC4}>
            <Text>{numberWithCommas(props.credit.amount)}</Text>
        </View>
    </View>
)

const isDefinedAndNotEmpty = (arg: string) => {
    return isDefined(arg) && arg.length > 0;
}

class InvoicePDF extends React.Component {

    render() {
        return (
            <Document title={this.props.invoice.offer.title + '-' + this.props.invoice.offer.offerNumber}>
                <Page size="A4" style={styles.page} wrap>
                    <View style={styles.header} fixed>
                        {isDefined(this.props.invoice.header) && <Header header={this.props.invoice.header}/>}
                    </View>

                    <View style={styles.content}>
                        <View style={styles.address}>
                            {isDefined(this.props.invoice.address) &&
                            <Address address={this.props.invoice.address}/>}
                        </View>

                        <View>
                            {isDefined(this.props.invoice.offer) &&
                            <Offer offer={this.props.invoice.offer}/>}
                        </View>

                        <View>
                            {isDefinedAndNotEmpty(this.props.invoice.orderPositions) &&
                            <OrderPositionsTable ops={this.props.invoice.orderPositions}/>}
                            <View wrap={false}>
                                <Total invoice={this.props.invoice}/>
                                {isDefinedAndNotEmpty(this.props.invoice.discount) &&
                                <Discount discount={this.props.invoice.discount}/>}
                                {isDefinedAndNotEmpty(this.props.invoice.discount) &&
                                <TotalWithDiscount invoice={this.props.invoice}/>
                                }
                                {isDefinedAndNotEmpty(this.props.invoice.credits) &&
                                <Credits credits={this.props.invoice.credits}/>}
                                <TotalWithDiscountAndCredit invoice={this.props.invoice}/>
                            </View>
                            <OrderComment invoice={this.props.invoice}/>
                        </View>
                    </View>

                    <View style={styles.footer} fixed>
                        <Text> </Text>
                        <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                            `${pageNumber} / ${totalPages}`
                        )}/>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default InvoicePDF;