import { ErrorMessage, Field, useField } from 'formik'

type FormInputProps = {
  label: string
  name: string
  horizontal?: boolean
}

const FormInput = ({
  label,
  name,
  ...props
}: FormInputProps & React.HTMLProps<HTMLSpanElement>) => {
  const [field] = useField({ name })
  return (
    <div className="contact__form--fieldContainer">
      <label htmlFor={name}>{label}</label>
      <Field
        {...field}
        {...props}
        id={name}
        name={name}
        className="contact__form--field"
      />
      <div className="contact__form--errorContainer">
        <ErrorMessage
          name={name}
          component="p"
          className="contact__form--error"
        />
      </div>
    </div>
  )
}

export default FormInput
