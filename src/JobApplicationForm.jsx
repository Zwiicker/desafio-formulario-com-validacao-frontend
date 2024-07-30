import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const jobPositions = [
  // Lista de cargos
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome completo é obrigatório"),
  email: Yup.string().email("Formato de e-mail inválido").required("E-mail é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  jobPosition: Yup.string().required("Cargo pretendido é obrigatório"),
  linkedIn: Yup.string().url("URL inválida"),
  github: Yup.string().url("URL inválida")
});

const JobApplicationForm = () => (
  <Formik
    initialValues={{
      fullName: "",
      email: "",
      phone: "",
      jobPosition: "",
      linkedIn: "",
      github: ""
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <div>
          <label htmlFor="fullName">Nome completo</label>
          <Field type="text" name="fullName" />
          <ErrorMessage name="fullName" component="div" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="phone">Telefone</label>
          <Field type="text" name="phone" />
          <ErrorMessage name="phone" component="div" />
        </div>
        <div>
          <label htmlFor="jobPosition">Cargo pretendido</label>
          <Field as="select" name="jobPosition">
            <option value="">Selecione um cargo</option>
            {jobPositions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </Field>
          <ErrorMessage name="jobPosition" component="div" />
        </div>
        <div>
          <label htmlFor="linkedIn">LinkedIn (opcional)</label>
          <Field type="url" name="linkedIn" />
          <ErrorMessage name="linkedIn" component="div" />
        </div>
        <div>
          <label htmlFor="github">GitHub (opcional)</label>
          <Field type="url" name="github" />
          <ErrorMessage name="github" component="div" />
        </div>
        <button type="submit">Enviar</button>  
      </Form>
    )}
  </Formik>
);

export default JobApplicationForm;