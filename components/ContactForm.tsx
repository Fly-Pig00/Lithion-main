import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import FormInput from './FormInput'
// import sanityApiClient from '@/pages/api/sanityClient';

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

const ContactForm = () => {
  // SEND CONTACTS TO SANITY DATABASE
  // const [submit, setSubmit] = useState(false);
  // const [contactValues, setContactValues] = useState({})

  // useEffect(() => {
  //   if(submit) {
  //     const sendToSanity = async (formValues : FormValues) => {
  //       const contactInfo = {
  //         _type: 'contacts',
  //         ...formValues
  //       }
  //       try {
  //         const response = await sanityApiClient.create(contactInfo)
  //         console.log("Response from sanity: ", response);
  //         if (response) {
  //           alert(JSON.stringify(response));
  //         }
  //       } catch (error) {
  //         alert("something went wrong while submitting, please try again.",);
  //         console.log(error)
  //       }
  //     }
  //     sendToSanity(contactValues);
  //   }
  // },[submit, contactValues])

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
          access_key: process.env.NEXT_PUBLIC_CONTACT_FORM,
          ...values,
        }),
      })
      const result = await response.json()
      if (result.success) {
        // console.log(result);
        alert("Thank you for reaching out, we'll contact you shortly!")
        resetForm()
      }
    } catch (error) {
      alert('something went wrong while submitting, please try again.')
      console.log(error)
    }
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().matches(new RegExp('^[0-9]*$'), 'Invalid phone number'),
    // inquirer: Yup.string().matches(/(homeowner|installer|distributor)/, {message: "please select an option"}),
    location: Yup.string().required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
  })

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        // inquirer: 'none',
        location: '',
        subject: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={sendToEmailService}
    >
      <Form>
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
        {/* <div className='contact__form--fieldGroup'>
          <FormInput
            label="Inquirer *"
            name="inquirer"
            as="select"
            type="text"
          >
            <option value="none"  hidden>Select an Option</option>
            <option value="homeowner">Homeowner</option>
            <option value="installer">Installer</option>
            <option value="distributor">Distributor</option>
          </FormInput>
          <FormInput
            label="Location *"
            name="location"
            as="input"
            type="text"
          />
        </div> */}
        <div>
          <FormInput label="Subject *" name="subject" as="input" type="text" />
          <FormInput
            label="Message *"
            name="message"
            as="textarea"
            type="text"
            rows={10}
          />
        </div>
        <button type="submit" className="contact__form--button">
          submit
        </button>
      </Form>
    </Formik>
  )
}

export default ContactForm
