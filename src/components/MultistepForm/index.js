import { useForm } from "react-hook-form";
import { useState } from "react";

import "./MultistepForm.css";

const MultistepForm = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const lastFormStep = () => {
    setFormStep(formStep - 1);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const renderButton = () => {
    if (formStep === 0) {
      return (
        <button type="button" onClick={nextFormStep}>
          Next
        </button>
      );
    } else if (formStep === 1) {
      return (
        <div>
          <button type="button" onClick={lastFormStep}>
            Previous
          </button>
          <button type="button" onClick={nextFormStep}>
            Next
          </button>
        </div>
      );
    } else if (formStep === 2) {
      return (
        <div>
          <button type="button" onClick={lastFormStep}>
            Previous
          </button>
          <button type="submit">Submit</button>
        </div>
      );
    }
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 0 && (
          <div className="form-element">
            <input
              className="form-input"
              placeholder="Company Name"
              type="text"
              {...register("companyName", { required: true })}
            ></input>
            {renderButton()}
          </div>
        )}

        {formStep === 1 && (
          <div className="form-element">
            <input
              className="form-input"
              placeholder="Company Number"
              type="text"
              {...register("companyNumber", { required: true })}
            ></input>
            {renderButton()}
          </div>
        )}

        {formStep === 2 && (
          <div className="form-element">
            <input
              className="form-input"
              placeholder="Company Email"
              type="email"
              {...register("companyEmail", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            ></input>
            {renderButton()}
          </div>
        )}
      </form>
    </div>
  );
};

export default MultistepForm;
