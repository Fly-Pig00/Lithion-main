import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import FormInput from './FormInput'

type FormValues = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  inquirer?: string
  location?: string
  subject?: string
  message?: string
}

const ApplicationForm = ({ position }: { position: string }) => {
  const sendToEmailService = async (values: FormValues, { resetForm }: any) => {
    console.log(values)
    try {
      const response = await fetch('EMAIL-SERVICE-ENDPOINT-HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_APPLICATION_FORM,
          ...values,
        }),
      })
      const result = await response.json()
      if (result.success) {
        alert("Thank you for reaching out, we'll contact you shortly!")
        resetForm()
      }
    } catch (error) {
      alert('something went wrong while submitting, please try again.')
      console.log(error)
    }
  }
  const maxFileSize = 2 * 1048576
  const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.pdf']

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().matches(new RegExp('^[0-9]*$'), 'Invalid phone number'),
    location: Yup.string().required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
    resume: Yup.mixed().required('A file is required'),
    // .test(
    //   "fileSize",
    //   "File too large",
    //   value => value && value.size <= maxFileSize
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   value => value && SUPPORTED_FORMATS.includes(value.type)
    // )
  })

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position,
        file: null,
      }}
      validationSchema={validationSchema}
      onSubmit={sendToEmailService}
    >
      <Form className="applicationForm">
        <div className="contact__form--fieldGroup">
          <FormInput
            label="First Name *"
            name="firstName"
            as="input"
            type="text"
          />
          <FormInput
            label="Last Name *"
            name="lastName"
            as="input"
            type="text"
          />
        </div>
        <div className="contact__form--fieldGroup">
          <FormInput label="Email *" name="email" as="input" type="email" />
          <FormInput label="Phone" name="phone" as="input" type="tel" />
        </div>
        <div>
          <FormInput
            label="Position *"
            name="position"
            as="input"
            type="text"
            disabled
            value={position}
          />
          <FormInput label="Resume *" name="resume" as="input" type="file" />
        </div>
        <button type="submit" className="contact__form--button">
          submit
        </button>
      </Form>
    </Formik>
  )
}

export default ApplicationForm
