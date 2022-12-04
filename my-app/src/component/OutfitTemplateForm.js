import React from "react";
import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import postData from "../utils"

const schema = {
  "type": "object",
  "properties": {
    "outfit_name": {"type": "string"},
    "items": {
      "type":"array",
      "items": { "$ref": "#/$defs/item" }
    }
  },
  "$defs": {
    "item": {
      "type": "object",
      "properties": {
        "item_name": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}}
      }
    }
  }
}


export default function OutfitTemplateForm() {
  const [formData, setFormData] = useState(null);

  const onSubmit = (e) => {
    console.log(e.formData)
    // postData("outfit-template", e.formData)
  }

  return (<Form
    schema={schema}
    formData={formData}
    onChange={e => setFormData(e.formData)}
    validator={validator}
    onSubmit={onSubmit}
  />);
}
