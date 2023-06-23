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

const AvedAppForm = ({ position }: { position: string }) => {
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
          access_key: process.env.NEXT_PUBLIC_AVED_CAREERS_FORM,
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
    referral: Yup.string().required('please choose an option'),
    agreement: Yup.boolean().required(
      'please check the agreement box in order to submit.'
    ),
  })

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position,
        date: '',
        resume: null,
        anyShift: false,
        overtimeAndWeekends: false,
        performEssentialFunctions: false,
        referral: '',
        pastEmployee: false,
        knowAnyoneHere: false,
        nameOfCurrentEmployeeYouKnow: '',
        agreement: false,
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
        <div className="contact__form--fieldGroup">
          <FormInput
            label="Position *"
            name="position"
            as="input"
            type="text"
            disabled
            value={position}
          />
          <FormInput
            label="Date Available*"
            name="dateAvailable"
            as="input"
            type="date"
          />
        </div>
        <FormInput label="Resume *" name="resume" as="input" type="file" />
        <h3 className="mb-5">Referral Source</h3>

        <div>
          <p>Can you work any shift?</p>
          <div className="contact__form--fieldGroup">
            <FormInput
              label="yes"
              name="anyShift"
              value="yes"
              as="input"
              type="radio"
              horizontal
            />
            <FormInput
              label="no"
              name="anyShift"
              value="no"
              as="input"
              type="radio"
              horizontal
            />
          </div>
        </div>
        <div>
          <p>Can you work overtime including weekends?</p>
          <div className="contact__form--fieldGroup">
            <FormInput
              label="yes"
              name="overtimeAndWeekends"
              value="yes"
              as="input"
              type="radio"
              horizontal
            />
            <FormInput
              label="no"
              name="overtimeAndWeekends"
              value="no"
              as="input"
              type="radio"
              horizontal
            />
          </div>
        </div>
        <div>
          <p>
            Are you able to perform the essential functions of the job for which
            you are applying for with or without reasonable accomodation?
          </p>
          <div className="contact__form--fieldGroup">
            <FormInput
              label="yes"
              name="performEssentialFunctions"
              value="yes"
              as="input"
              type="radio"
              horizontal
            />
            <FormInput
              label="no"
              name="performEssentialFunctions"
              value="no"
              as="input"
              type="radio"
              horizontal
            />
          </div>
        </div>
        <h3 className="mb-5">Referral Source</h3>
        <div className="contact__form--fieldGroup">
          <FormInput
            label="How did you hear about us? *"
            name="referral"
            as="select"
            type="text"
          >
            <option value="none" hidden>
              Select an Option
            </option>
            <option value="walk-in">walk-in</option>
            <option value="advertisment">advertisment</option>
            <option value="referral">referral</option>
            <option value="other">other</option>
          </FormInput>
        </div>
        <div>
          <p>Have you ever worked for our company before?</p>
          <div className="contact__form--fieldGroup">
            <FormInput
              label="yes"
              name="pastEmployee"
              value="yes"
              as="input"
              type="radio"
              horizontal
            />
            <FormInput
              label="no"
              name="pastEmployee"
              value="no"
              as="input"
              type="radio"
              horizontal
            />
          </div>
        </div>
        <div className="flex-1">
          <p>Do you know anyone who works for our company currently?</p>
          <div className="contact__form--fieldGroup">
            <FormInput
              label="yes"
              name="knowAnyoneHere"
              value="yes"
              as="input"
              type="radio"
              horizontal
            />
            <FormInput
              label="no"
              name="knowAnyoneHere"
              value="no"
              as="input"
              type="radio"
              horizontal
            />
          </div>
        </div>
        <div className="contact__form--fieldGroup">
          <FormInput
            label="If yes, please provide their name"
            name="nameOfCurrentEmployeeYouKnow"
            as="input"
            type="text"
          />
        </div>
        <div>
          <p className="font-bold">
            Please read carefully before signing. I understand that neither the
            completion of this application nor any other part of my
            consideration for employment establishes any obligation for Aved
            Electronics, LLC to hire me. If I am hired, I understand that either
            Aved Electronics, LLC or I can terminate my employment at any time
            and for any reason, with or without cause and without prior notice.
            I understand that no representative of Aved Electronics, LLC has the
            authority to make any assurance to the contrary. As a condition of
            employment, all Employment Offers are contingent upon successful
            completion of a background check conducted by a third-party provider
            for Aved Electronics, LLC. I attest with my signature below that I
            have given to Aved Electronics, LLC true and complete information on
            this application. No requested information has been concealed. I
            authorize Aved Electronics, LLC to contact references provided for
            employment reference checks. If any information I have provided is
            untrue, or if I have concealed material information, I understand
            that this will constitute cause for the denial of employment or
            immediate dismissal.
          </p>
          <FormInput
            label="By checking this box, you agree to the terms above *"
            name="agreement"
            as="input"
            type="checkbox"
            horizontal
          />
        </div>
        <button type="submit" className="contact__form--button">
          submit
        </button>
      </Form>
    </Formik>
  )
}

export default AvedAppForm
