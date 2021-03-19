import React from 'react';
import {FormControlLabel, Radio, Checkbox, TextField} from "@material-ui/core";


function SurveyElementOtherOption({ type }) {
  if ((type !==1 && type !== 2)) {
    throw Error("Unknown type of otherOption");
  }
  return (
    <FormControlLabel
      disabled
      control={type === 1 ? <Radio /> : type === 2 ? <Checkbox /> : null}
      label={
        <div>
          <TextField value={""} placeholder="Другое" />
        </div>
      }
    />
  );
}

export default SurveyElementOtherOption;