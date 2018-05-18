import React from 'react'
import { Form,Input,TextArea,Dropdown} from 'semantic-ui-react'

export const RenderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>{
  

  return (
    <Form.Field error={touched && error} >
      <label>{custom.toplabel}</label>
      <Input
        label={label}
        {...input} {...custom}
        placeholder={custom.toplabel}
       
      />
    </Form.Field>
  )

}

export const RenderTextAreaField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>{
  
  return  (
    <Form.Field  error={touched && error} >
      <label>{label}</label>
      <TextArea 
        {...input} {...custom}
        autoHeight 
        placeholder={label} />
    </Form.Field>
  )
}

export const renderDropdownField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {

  return (
    <Form.Field  error={touched && error} >
      <label>{custom.toplabel}</label>
      <Dropdown
        selection
        onChange={(event,{index,value}) => {
          input.onChange(value)
        }}
        {...custom}
        placeholder={custom.toplabel}
      />
    </Form.Field>
  )
}