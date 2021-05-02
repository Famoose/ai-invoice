import React from "react";
import Invoice from "./Invoice";
import {Formik, Form, Field, ErrorMessage, useField, FieldArray} from 'formik';
import {XCircleIcon} from "@heroicons/react/outline";
import {PlusCircleIcon} from "@heroicons/react/solid";

class Edit extends React.Component {
    invoice

    constructor(props) {
        super(props);
        this.state = {}
        this.invoice = Invoice.fromFile(this.props.match.params.path)
    }

    render() {
        return (<div className="container mx-3 mx-auto">
            <div className="flex items-end space-x-2">
                <h1 className="text-2xl font-thin mt-4">Bearbeite: </h1>
                <code>{this.props.match.params.path}</code>
            </div>
            <div>
                {JSON.stringify(this.invoice)}
            </div>
            <Formik
                initialValues={this.invoice}
                onSubmit={(values, {setSubmitting}) => {
                    Invoice.saveToFile(values).then();
                    setSubmitting(false);
                }}
                render={({values, isSubmitting}) => (
                    <Form className="space-y-4">
                        <h2>Rechungsadresse</h2>
                        <div>

                        </div>
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
                                    <TextArea type="textarea" name="offer.comments" placeholder="Bemerkung"/>
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
                                <div className="flex flex-col space-y-3 justify-items-center">
                                    <div className="divide-y-2 space-y-3">
                                        <div className="grid grid-cols-12 gap-3">
                                            <label className="col-span-8">Bezeichnung</label>
                                            <label>Menge</label>
                                            <label>VP</label>
                                            <label>Total</label>
                                            <label></label>
                                            <OrderPositionField orderPositions={values.orderPositions}
                                                                arrayHelpers={arrayHelpers}/>
                                        </div>
                                        <div className="flex justify-between">
                                            <h3><b>Total der Positionen</b></h3>
                                            <h3><b>{values.orderPositions.reduce((p, c,) => {
                                                return !!c.total ? c.total + p : p;
                                            }, 0)} CHF</b></h3>
                                        </div>
                                    </div>

                                    <button
                                        className="transition duration-500 ease-in-out transform hover:scale-125 hover:text-blue-600"
                                        onClick={() => arrayHelpers.push({})}
                                    >
                                        <PlusCircleIcon className="h-8 w-8 mx-auto"/>
                                    </button>
                                </div>
                            )}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            />
        </div>);
    }
}

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
            <Field className="col-span-8" type="text" name={`orderPositions.${index}.description`}
                   placeholder="Bezeichnung"/>
            <ErrorMessage name={`orderPositions.${index}.description`}/>

            <Field type="text" name={`orderPositions.${index}.amount`}
                   placeholder="Menge"/>
            <ErrorMessage name={`orderPositions.${index}.amount`}/>

            <Field type="text" name={`orderPositions.${index}.price`}
                   placeholder="Preis"/>
            <ErrorMessage name={`orderPositions.${index}.price`}/>

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

export default Edit;
