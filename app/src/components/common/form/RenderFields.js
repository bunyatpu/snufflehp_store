import React from 'react'
import { Form,Input,TextArea,Dropdown,Label} from 'semantic-ui-react'

export const RenderTextField = ({
  input,
  label,
  meta: { touched, error,warning },
  ...custom
}) =>{
  

  let txt_pHolder = (custom.placeholder) ? custom.placeholder:label;
  let txt_label = (label) ? <label>{custom.toplabel}</label>:false;

  let txt_error  = (typeof error === 'string') ? error:"";
  //console.log('error',error)

  return (
    <Form.Field error={touched && (error !== undefined)} >
      {txt_label}
      <Input
        label={label}
        {...input} {...custom}
        placeholder={txt_pHolder}
       
      />
       {touched &&
        ((error &&  
          <Label basic color='red' pointing>
          {txt_error}
          </Label>) )}
     
    </Form.Field>
  )

}

export const RenderTextAreaField = ({
  input,
  label,
  placeholder,
  meta: { touched, error },
  ...custom
}) =>{

  //console.log('placeholder',placeholder)
  let txt_pHolder = (placeholder) ? placeholder:label;
  return  (
    <Form.Field  error={touched && error} >
      <label>{label}</label>
      <TextArea 
        {...input} {...custom}
        autoHeight 
        placeholder={txt_pHolder} />
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