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
    <Form.Field  error={touched && (error !== undefined)} >
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

  let txt_pHolder = (custom.placeholder) ? custom.placeholder:label;
  let txt_error  = (typeof error === 'string') ? error:"";

  //console.log('input ',input)

  return (
    <Form.Field  error={touched && (error !== undefined)} >
      <label>{custom.toplabel}</label>
      <Dropdown
        selection
        selectOnBlur={false}
        value={input.value}
        onChange={(event,obj) => {
          // console.log('event',event.target)
          //console.log('internal obj',obj)
          input.onChange(obj.value)
        }}
        {...custom}
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