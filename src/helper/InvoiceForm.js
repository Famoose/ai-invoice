import {ErrorMessage, Field, FieldArray, Form, Formik, useField} from "formik";
import Invoice from "./Invoice";
import {PlusCircleIcon} from "@heroicons/react/solid";
import {ChevronUpIcon, XCircleIcon} from "@heroicons/react/outline";
import ImageSelecter, {ImageDisplayer} from "./ImageSelecter";
import {Disclosure} from "@headlessui/react";


function InvoiceForm(props) {
    return (
        <Formik
            initialValues={props.invoice}
            onSubmit={(values, {setSubmitting}) => {
                Invoice.saveToFile(values, props.oldFileName).then();
                setSubmitting(false);
            }}>
            {({values, isSubmitting, setFieldValue}) => (
                <Form className="space-y-4 mb-8">
                    <button
                        className="fixed py-3 z-30 px-2 bottom-6 right-6 bg-blue-500  text-white rounded-md shadow-md"
                        type="submit" disabled={isSubmitting}>
                        Speichern
                    </button>

                    <h2>Kopfzeile</h2>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Bearbeiten</span>
                                    <ChevronUpIcon
                                        className={`${
                                            open ? "transform rotate-180" : ""
                                        } w-5 h-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2">
                                    <ImageSelecter setFile={(f) => setFieldValue('header.logo',f)}/>
                                    {values.header.logo && <ImageDisplayer className="h-16" data={values.header.logo}/>}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    <h2>Rechungsadresse</h2>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-cluster">
                            <div className="form-group">
                                <label htmlFor="offer.intro">Anrede</label>
                                <Field type="text" name="offer.intro" placeholder="Anrede"/>
                                <ErrorMessage name="offer.intro"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.name1">Name 1</label>
                                <Field type="text" name="offer.name1" placeholder="Name 1"/>
                                <ErrorMessage name="offer.name1"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.name2">Name 2</label>
                                <Field type="text" name="offer.name2" placeholder="Name 2"/>
                                <ErrorMessage name="offer.name2"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.address1">Adresse 1</label>
                                <Field type="text" name="offer.address1" placeholder="Adresse 1"/>
                                <ErrorMessage name="offer.address1"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.address2">Adresse 2</label>
                                <Field type="text" name="offer.address2" placeholder="Adresse 2"/>
                                <ErrorMessage name="offer.address2"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.plz">PLZ</label>
                                <Field type="text" name="offer.plz" placeholder="PLZ"/>
                                <ErrorMessage name="offer.plz"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.address2">Ort</label>
                                <Field type="text" name="offer.address2" placeholder="Ort"/>
                                <ErrorMessage name="offer.address2"/>
                            </div>
                        </div>
                        <div className="form-cluster">
                            <div className="form-group">
                                <label htmlFor="offer.phone">phone</label>
                                <Field type="text" name="offer.phone" placeholder="Titel"/>
                                <ErrorMessage name="offer.phone"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offer.comments">Bemerkung</label>
                                <TextArea className="h-72" name="offer.comments"
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
                            <label htmlFor="offer.description">Titel</label>
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
                                        <label className="col-span-2">VP</label>
                                        <label>Total</label>
                                        <label></label>
                                        <OrderPositionField orderPositions={values.orderPositions}
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
                                <Field className="border-r-0 rounded-r-none" type="text" name={`discount`}
                                       placeholder="Rabatt"/>
                                <span
                                    className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">%</span>
                                <ErrorMessage name={`discount`}/>
                            </div>
                            <ErrorMessage name="discount"/>
                        </div>
                    </div>

                    <FieldArray
                        name="credits"
                        render={arrayHelpers => (
                            <div className="flex flex-col space-y-3">
                                <div className="divide-y-2 space-y-3">
                                    <div className="grid grid-cols-12 gap-3">
                                        <label className="col-span-9">Zuschläge/Gutschriften</label>
                                        <label className="col-span-2">Menge</label>
                                        <label></label>
                                        <CreditField credits={values.credits}
                                                     arrayHelpers={arrayHelpers}/>
                                    </div>
                                    <div className="flex justify-between">
                                        <h3><b>Total</b></h3>
                                        <h3><b>{getTotalWithDiscount(values)} CHF</b></h3>
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

                        <div className="form-group">
                            <label htmlFor="attachment">Beilage</label>
                            <TextArea name="attachment" placeholder="Beilage"/>
                            <ErrorMessage name="attachment"/>
                        </div>
                    </div>
                </Form>
            )}
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

function OrderPositionField(props) {
    props.orderPositions.forEach(op => {
        if (!!op.amount && !!op.price) {
            op.total = op.amount * op.price
        }
    })
    props.orderPositions.total = props.orderPositions.amount * props.orderPositions.price
    return props.orderPositions.map((orderPosition, index) => (
        <>
            <Field className="col-span-7" type="text" name={`orderPositions.${index}.description`}
                   placeholder="Bezeichnung"/>
            <ErrorMessage name={`orderPositions.${index}.description`}/>

            <Field type="number" name={`orderPositions.${index}.amount`}
                   placeholder="Menge"/>
            <ErrorMessage name={`orderPositions.${index}.amount`}/>

            <div className="flex flex-row col-span-2">
                <Field className="w-full border-r-0 rounded-r-none" type="number" name={`orderPositions.${index}.price`}
                       placeholder="Preis"/>
                <span
                    className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">CHF</span>
                <ErrorMessage name={`orderPositions.${index}.price`}/>
            </div>

            <Field type="text" name={`orderPositions.${index}.total`}
                   placeholder="Total" disabled/>
            <ErrorMessage name={`orderPositions.${index}.total`}/>

            <button className="transition duration-500 ease-in-out transform hover:scale-125 hover:text-red-600 "
                    onClick={() => props.arrayHelpers.remove(index)}>
                <XCircleIcon className="h-6 w-6 mx-auto"/>
            </button>
        </>
    ));
}

function CreditField(props) {
    return props.credits.map((credit, index) => (
        <>
            <Field className="col-span-9" type="text" name={`credits.${index}.description`}
                   placeholder="Bezeichnung"/>
            <ErrorMessage name={`credits.${index}.description`}/>
            <div className="flex flex-row col-span-2">
                <Field className="w-full border-r-0 rounded-r-none" type="number" name={`credits.${index}.amount`}
                       placeholder="Menge"/>
                <span
                    className="flex items-center bg-white border border-gray-800 border-l-0 rounded-md rounded-l-none px-2">%</span>
                <ErrorMessage name={`credits.${index}.amount`}/>
            </div>
            <button className="block transition duration-500 ease-in-out transform hover:scale-125 hover:text-red-600 "
                    onClick={() => props.arrayHelpers.remove(index)}>
                <XCircleIcon className="h-6 w-6 mx-auto"/>
            </button>

        </>
    ));
}

export function getTotal(values) {
    return values.orderPositions.reduce((p, c) => {
        return !!c.total ? c.total + p : p;
    }, 0).toFixed(2);
}

export function getTotalWithDiscount(values) {
    let total = getTotal(values);
    if (values.discount) {
        total = total * (1 - (values.discount / 100));
    }

    const credit = values.credits.reduce((p, c) => {
        return !!c.amount ? c.amount + p : p;
    }, 0);

    total = total * (1 + (credit / 100));
    return total.toFixed(2);
}