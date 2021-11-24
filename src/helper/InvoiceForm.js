import {ErrorMessage, Field, FieldArray, Form, Formik, useField} from "formik";
import {PlusCircleIcon} from "@heroicons/react/solid";
import {ChevronUpIcon, XCircleIcon} from "@heroicons/react/outline";
import ImageSelecter, {ImageDisplayer} from "./ImageSelecter";
import {Disclosure} from "@headlessui/react";


function InvoiceForm(props) {
    return (
        <Formik
            initialValues={props.invoice}
            onSubmit={(values, {setSubmitting}) => {
                return props.submitAction(values).then(() => {
                    setSubmitting(false);
                });
            }}>
            {({values, isSubmitting, setFieldValue, submitForm}) => {
                if(props.bindSubmitForm){
                    props.bindSubmitForm(submitForm);
                }
                return (
                    <Form className="space-y-4 mb-8">
                        <button
                            className="fixed py-3 z-30 px-2 bottom-6 right-6 bg-blue-500 active:bg-blue-700 text-white rounded-md shadow-md"
                            type="submit" disabled={isSubmitting}>
                            Speichern
                        </button>

                        <h2>Kopfzeile</h2>
                        <Disclosure>
                            {({open}) => (
                                <>
                                    <Disclosure.Button
                                        className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>Bearbeiten</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? "transform rotate-180" : ""
                                            } w-5 h-5 text-purple-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2">
                                        <div className="form-cluster">
                                            <div className="form-group">
                                                <label>Logo</label>
                                                <ImageSelecter setFile={(f) => setFieldValue('header.logo', f)}/>
                                                {values.header.logo && <ImageDisplayer data={values.header.logo}/>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="header.mwst">MWST Nr.</label>
                                                <Field type="text" name="header.mwst" placeholder="MWST Nr."/>
                                                <ErrorMessage name="header.mwst"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="header.contact">Kontakt</label>
                                                <TextArea className="h-24" name="header.contact"
                                                          placeholder="Kontakt"/>
                                                <ErrorMessage name="header.contact"/>
                                            </div>
                                        </div>

                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>

                        <h2>Rechungsadresse</h2>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="form-cluster">
                                <div className="form-group">
                                    <label htmlFor="address.intro">Anrede</label>
                                    <Field type="text" name="address.intro" placeholder="Anrede"/>
                                    <ErrorMessage name="address.intro"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address.name1">Name</label>
                                    <Field type="text" name="address.name1" placeholder="Name"/>
                                    <ErrorMessage name="address.name1"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address.address1">Adresse 1</label>
                                    <Field type="text" name="address.address1" placeholder="Adresse"/>
                                    <ErrorMessage name="address.address1"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address.plz">PLZ</label>
                                    <Field type="text" name="address.plz" placeholder="PLZ"/>
                                    <ErrorMessage name="address.plz"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address.place">Ort</label>
                                    <Field type="text" name="address.place" placeholder="Ort"/>
                                    <ErrorMessage name="address.place"/>
                                </div>
                            </div>
                            <div className="form-cluster">
                                <div className="form-group">
                                    <label htmlFor="offer.phone">Telefon</label>
                                    <Field type="text" name="offer.phone" placeholder="Telefon"/>
                                    <ErrorMessage name="offer.phone"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="offer.comments">Bemerkung</label>
                                    <TextArea className="h-48" name="offer.comments"
                                              placeholder="Bemerkung"/>
                                    <ErrorMessage name="offer.comments"/>
                                </div>
                            </div>
                        </div>
                        <h2>Auftragsdaten</h2>
                        <div className="form-cluster">
                            <div className="form-group">
                                <label htmlFor="offer.title">Titel</label>
                                <Field type="text" name="offer.title" placeholder="Titel"/>
                                <ErrorMessage name="offer.title"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.offerNumber">Belegnummer</label>
                                <Field type="text" name="offer.offerNumber" placeholder="Belegnummer"/>
                                <ErrorMessage name="offer.offerNumber"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.description">Beschreibung</label>
                                <Field type="text" name="offer.description" placeholder="Beschreibung"/>
                                <ErrorMessage name="offer.description"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.orderDate">Bestelldatum</label>
                                <Field type="date" name="offer.orderDate" placeholder="Bestelldatum"/>
                                <ErrorMessage name="offer.orderDate"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.invoicingDate">Rechnungsdatum</label>
                                <Field type="date" name="offer.invoicingDate" placeholder="Rechnungsdatum"/>
                                <ErrorMessage name="offer.invoicingDate"/>
                            </div>
                        </div>

                        <h2>Bestellinhalt</h2>
                        <FieldArray
                            name="orderPositions"
                            render={arrayHelpers => (
                                <div className="flex flex-col space-y-3">
                                    <div className="divide-y-2 space-y-3">
                                        <div className="grid grid-cols-12 gap-3">
                                            <label className="col-span-7">Bezeichnung</label>
                                            <label>Menge</label>
                                            <label className="col-span-2">Preis</label>
                                            <label>Total</label>
                                            <label></label>
                                            <OrderPositionFields orderPositions={values.orderPositions}
                                                                arrayHelpers={arrayHelpers}/>
                                        </div>
                                        <div className="flex justify-between">
                                            <h3><b>Total der Positionen</b></h3>
                                            <h3><b>{getTotal(values)} CHF</b></h3>
                                        </div>
                                    </div>

                                    <button
                                        className="w-12 mx-auto transition duration-500 ease-in-out transform hover:scale-125 hover:text-blue-600"
                                        onClick={() => arrayHelpers.push({})}
                                    >
                                        <PlusCircleIcon className="h-8 w-8 mx-auto"/>
                                    </button>
                                </div>
                            )}
                        />
                        <h2>Rabatt und Zuschläge</h2>
                        <div className="form-cluster">
                            <div className="form-group justify-between">
                                <label htmlFor="discount">Rabatt</label>
                                <div className="flex flex-row col-span-2">
                                    <Field className="border-r-0 rounded-r-none" type="text" name="discount"
                                           placeholder="Rabatt"/>
                                    <span
                                        className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">%</span>
                                    <ErrorMessage name="discount"/>
                                </div>
                            </div>
                        </div>

                        <FieldArray
                            name="credits"
                            render={arrayHelpers => (
                                <div className="flex flex-col space-y-3">
                                    <div className="divide-y-2 space-y-3">
                                        <div className="grid grid-cols-12 gap-3">
                                            <label className="col-span-6">Zuschläge/Gutschriften</label>
                                            <label className="col-span-2">Prozent</label>
                                            <label className="col-span-2">Menge</label>
                                            <label></label>
                                            <CreditFields values={values}
                                                         arrayHelpers={arrayHelpers}/>
                                        </div>
                                        <div className="flex justify-between">
                                            <h3><b>Total</b></h3>
                                            <h3><b>{getTotalWithDiscountAndCredit(values)} CHF</b></h3>
                                        </div>
                                    </div>

                                    <button
                                        className="w-12 mx-auto transition duration-500 ease-in-out transform hover:scale-125 hover:text-blue-600"
                                        onClick={() => arrayHelpers.push({})}
                                    >
                                        <PlusCircleIcon className="h-8 w-8 mx-auto"/>
                                    </button>
                                </div>
                            )}
                        />
                        <div className="form-cluster">
                            <div className="form-group">
                                <label htmlFor="comment">Bemerkungen</label>
                                <TextArea name="comment" placeholder="Bemerkungen"/>
                                <ErrorMessage name="comment"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="condition">Konditionen</label>
                                <Field type="text" name="condition" placeholder="Konditionen"/>
                                <ErrorMessage name="condition"/>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default InvoiceForm;

const TextArea = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field] = useField(props);
    return (
        <textarea {...field} {...props} />
    );
};

function OrderPositionFields(props) {
    props.orderPositions.forEach(op => {
        if ((!!op.amount || op.amount === 0) && (!!op.price || op.price === 0)) {
            op.total = op.amount * op.price
        }
    })
    props.orderPositions.total = props.orderPositions.amount * props.orderPositions.price
    return props.orderPositions.map((orderPosition, index) => (
        <OrderPositionField key={index} index={index} arrayHelpers={props.arrayHelpers}/>
    ));
}

function OrderPositionField(props) {
    return (<>
        <Field className="col-span-7" type="text" name={`orderPositions.${props.index}.description`}
               placeholder="Bezeichnung"/>
        <ErrorMessage name={`orderPositions.${props.index}.description`}/>

        <Field type="number" name={`orderPositions.${props.index}.amount`}
               placeholder="Menge"/>
        <ErrorMessage name={`orderPositions.${props.index}.amount`}/>

        <div className="flex flex-row col-span-2">
            <Field className="w-full border-r-0 rounded-r-none" type="number" name={`orderPositions.${props.index}.price`}
                   placeholder="Preis"/>
            <span
                className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">CHF</span>
            <ErrorMessage name={`orderPositions.${props.index}.price`}/>
        </div>

        <Field type="text" name={`orderPositions.${props.index}.total`}
               placeholder="Total" disabled/>
        <ErrorMessage name={`orderPositions.${props.index}.total`}/>

        <button className="transition duration-500 ease-in-out transform hover:scale-125 hover:text-red-600 "
                onClick={() => props.arrayHelpers.remove(props.index)}>
            <XCircleIcon className="h-6 w-6 mx-auto"/>
        </button>
    </>)
}

function CreditFields(props) {
    const total = getTotalWithDiscount(props.values);
    props.values.credits.forEach(c => {
        if ((!!c.percentage || c.percentage === 0)) {
            c.amount = (total * (c.percentage/100)).toFixed(2);
        }
    })
    return props.values.credits.map((credit, index) => (
        <CreditField key={index} index={index} arrayHelpers={props.arrayHelpers}/>
    ));
}

function CreditField(props){
    return (<>
        <Field className="col-span-7" type="text" name={`credits.${props.index}.description`}
               placeholder="Bezeichnung"/>
        <ErrorMessage name={`credits.${props.index}.description`}/>
        <div className="flex flex-row col-span-2">
            <Field className="w-full border-r-0 rounded-r-none" type="number" name={`credits.${props.index}.percentage`}
                   placeholder="Prozent"/>
            <span
                className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">%</span>
            <ErrorMessage name={`credits.${props.index}.percentage`}/>
        </div>
        <div className="flex flex-row col-span-2">
            <Field className="w-full border-r-0 rounded-r-none" type="number" name={`credits.${props.index}.amount`}
                   placeholder="Menge"/>
            <span
                className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">CHF</span>
            <ErrorMessage name={`credits.${props.index}.amount`}/>
        </div>
        <button className="block transition duration-500 ease-in-out transform hover:scale-125 hover:text-red-600 "
                onClick={() => props.arrayHelpers.remove(props.index)}>
            <XCircleIcon className="h-6 w-6 mx-auto"/>
        </button>
    </>);
}

export function swissFormat(amount) {
    const factor = 0.05;
    amount = parseFloat(amount);
    return (Math.round(amount / factor) * factor).toFixed(2);
}

export function calcTotal(values) {
    return values.orderPositions.reduce((p, c) => {
        return !!c.total || c.total === 0 ? parseFloat(c.total) + p : p;
    }, 0);
}

export function getTotal(values) {
    return swissFormat(calcTotal(values));
}

export function calcTotalWithDiscount(values) {
    let total = calcTotal(values);
    if (!!values.discount) {
        total = total * (1 - (values.discount / 100));
    }
    return total;
}

export function getTotalWithDiscount(values) {
    return swissFormat(calcTotalWithDiscount(values));
}

export function getTotalWithDiscountAndCredit(values) {
    const total = calcTotalWithDiscount(values);

    const credit = values.credits.reduce((p, c) => {
        const amount = parseFloat(c.amount);
        return !!amount || amount === 0 ? amount + p : p;
    }, 0)
    const totalWithCredit = total + credit;
    return swissFormat(totalWithCredit);
}