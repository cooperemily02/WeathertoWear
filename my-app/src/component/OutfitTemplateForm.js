import React from "react";
import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import postData from "../utils";

const schema = {
  "title": "Create Outfit Templates",
  "description": "Use this form to create custom outfit templates based on different tags.",
  "required": ["name", "item-templates"],
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Template Name - ex \"Gym Outfit\" ",
    },
    "item-templates": {
      "type":"array",
      "description": "This is a template for a type of outfit. Add items that you'd like to include with this outfit.",
      "title": "Outfit Template",
      "items": { "$ref": "#/$defs/item-template" }
    }
  },
  "$defs": {
    "item-template": {
      "type": "object",
      "title": "Outfit Clothing Item",
      "description": "Require an item in the outfit to have these tags:",
      "properties": {
        "tags": {
          "title": "Clothing Item Tags",
          "type": "array", 
          "items": {
            "title": "Tag - ex \"hot\"",
            "type": "string",
            //TODO: make sure the case matches what we use elsewhere.
            "enum": ["hot", "cold", "umbrella", "Rainy", "Snowy", "average", "top", "bottom", "shoes", "Outerwear"]
          },
          "uniqueItems": true
        }
      },
      "required": ["tags"]
    }
  }
} 


export default function OutfitTemplateForm() {
  const onSubmit =  (e) => {
    console.log(e.formData);
    alert("Outfit template has been created. Please head back to the home page to continue.");
    postData('outfit-template', e.formData).then(data => console.log(data))
  };

  return (
    <div style = {{margin: "5%"}}>
      <Form
        schema={schema}
        validator={validator}
        onSubmit={onSubmit}
        formData={{'name': "", 'item-templates': [{'tags': []}, {'tags': []}]}}
        sx = {{padding: "5%", margin: "5%"}}
      />
    </div>
  );
}
