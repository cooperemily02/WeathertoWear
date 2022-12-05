import React from "react";
import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import postData from "../utils";

const schema = {
  "required": ["name", "item-templates"],
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "item-templates": {
      "type":"array",
      "items": { "$ref": "#/$defs/item-template" }
    }
  },
  "$defs": {
    "item-template": {
      "type": "object",
      "properties": {
        "name": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}}
      },
      "required": ["name", "tags"]
    }
  }
}


export default function OutfitTemplateForm() {

  const onSubmit = async (e) => {
    console.log(e.formData);
  };

  return (
    <Form
      schema={schema}
      validator={validator}
      onSubmit={onSubmit}
    />
  );
}
