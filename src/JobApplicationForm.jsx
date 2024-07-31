import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Lista de cargos disponíveis para seleção no formulário
const jobPositions = [
  "Desenvolvedor Frontend",
  "Desenvolvedor Backend",
  "Desenvolvedor Full Stack",
  "Desenvolvedor Mobile",
  "Desenvolvedor de Software",
  "Engenheiro de Software",
  "Arquiteto de Software",
  "UI/UX Designer",
  "Analista de Sistemas",
  "Analista Programador",
  "DevOps Engineer",
  "Engenheiro de Dados",
  "QA Engineer",
  "Scrum Master",
  "Product Owner"
];

// Esquema de validação usando Yup para definir as regras de validação dos campos do formulário
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome completo é obrigatório"), // Campo obrigatório para o nome completo
  email: Yup.string().email("Formato de e-mail inválido").required("E-mail é obrigatório"), // Campo de e-mail obrigatório e deve ter formato válido
  phone: Yup.string().required("Telefone é obrigatório"), // Campo obrigatório para o telefone
  jobPosition: Yup.string().required("Cargo pretendido é obrigatório"), // Campo obrigatório para o cargo pretendido
  linkedIn: Yup.string().url("URL inválida"), // Campo opcional para LinkedIn, deve ter formato de URL válido se preenchido
  github: Yup.string().url("URL inválida") // Campo opcional para GitHub, deve ter formato de URL válido se preenchido
});

const JobApplicationForm = () => {
  // Estado para armazenar a mensagem de status após a submissão do formulário
  const [statusMessage, setStatusMessage] = useState("");
  // Estado para armazenar as candidaturas já enviadas, usado para verificar duplicações
  const [submittedApplications, setSubmittedApplications] = useState([]);

  return (
    <div className=" bg-white p-6 rounded-lg shadow-lg ">
      <h1 className="text-4xl font-semibold mb-5 text-center text-gray-800 border-b ">
        Formulário de Cadastro
      </h1>
      {statusMessage && (
        <div className="text-center mb-6">
          {/* Mensagem de status exibida após a tentativa de submissão do formulário */}
          <div
            className={`px-4 py-3 rounded relative mb-4 ${
              statusMessage.toLowerCase().includes("sucesso") 
                ? "bg-green-100 border border-green-400 text-green-700" 
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
            role="alert"
          >
            <strong className="font-bold">
              {statusMessage.toLowerCase().includes("sucesso") ? "Sucesso!" : "Erro!"}
            </strong>
            <span className="block sm:inline"> {statusMessage}</span>
          </div>
        </div>
      )}
      <Formik
        initialValues={{
          fullName: "", // Valor inicial para o campo "Nome completo"
          email: "", // Valor inicial para o campo "E-mail"
          phone: "", // Valor inicial para o campo "Telefone"
          jobPosition: "", // Valor inicial para o campo "Cargo pretendido"
          linkedIn: "", // Valor inicial para o campo "LinkedIn"
          github: "" // Valor inicial para o campo "GitHub"
        }}
        validationSchema={validationSchema} // Esquema de validação definido anteriormente
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true); // Define o estado de submissão para true

          // Verifica se já existe uma candidatura com os mesmos dados
          const isExistingApplication = submittedApplications.some(application => 
            application.email === values.email && 
            application.phone === values.phone && 
            application.jobPosition === values.jobPosition
          );

          if (isExistingApplication) {
            setStatusMessage("Sua candidatura já foi enviada anteriormente."); // Mensagem de erro para candidatura duplicada
          } else {
            // Adiciona nova candidatura à lista de candidaturas enviadas
            setSubmittedApplications([...submittedApplications, values]);
            setStatusMessage("Sua candidatura foi enviada com sucesso."); // Mensagem de sucesso
          }

          setSubmitting(false); // Define o estado de submissão para false
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              {/* Campo de entrada para o nome completo */}
              <Field
                type="text"
                name="fullName"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {/* Exibição de mensagem de erro para o campo "Nome completo" */}
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              {/* Campo de entrada para o e-mail */}
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {/* Exibição de mensagem de erro para o campo "E-mail" */}
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              {/* Campo de entrada para o telefone */}
              <Field
                type="text"
                name="phone"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {/* Exibição de mensagem de erro para o campo "Telefone" */}
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
                Cargo pretendido
              </label>
              {/* Campo de seleção para o cargo pretendido */}
              <Field
                as="select"
                name="jobPosition"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Selecione um cargo</option>
                {jobPositions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </Field>
              {/* Exibição de mensagem de erro para o campo "Cargo pretendido" */}
              <ErrorMessage
                name="jobPosition"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
                LinkedIn (opcional)
              </label>
              {/* Campo de entrada para o LinkedIn (opcional) */}
              <Field
                type="url"
                name="linkedIn"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {/* Exibição de mensagem de erro para o campo "LinkedIn" */}
              <ErrorMessage
                name="linkedIn"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub (opcional)
              </label>
              {/* Campo de entrada para o GitHub (opcional) */}
              <Field
                type="url"
                name="github"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {/* Exibição de mensagem de erro para o campo "GitHub" */}
              <ErrorMessage
                name="github"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Botão de submissão do formulário */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
              disabled={isSubmitting} // Desabilita o botão enquanto o formulário está sendo submetido
            >
              {isSubmitting ? "Enviando..." : "Enviar"} {/* Texto do botão muda de acordo com o estado de submissão */}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobApplicationForm;
