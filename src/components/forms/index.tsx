"use client";
import React from "react";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";

interface FormProviderProps {
  children: React.ReactNode;
  initialValues: FormikValues;
  submitHandlar: (values: FormikValues) => void;
  validationSchema?: Yup.Schema<FormikValues>;
}

const FormProvaider: React.FC<FormProviderProps> = ({
  children,
  initialValues,
  submitHandlar,
  validationSchema,
}) => {
  return (
    <Formik
      onSubmit={submitHandlar}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
};

export default FormProvaider;
