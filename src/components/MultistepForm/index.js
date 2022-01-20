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
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const watchCompanyDetails = watch(["companyName", "companyNumber"]);
  const watchCompanyAddress = watch(["address1", "postcode"]);

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
            <input
              className="form-input"
              placeholder="Company Number"
              error={errors.companyNumber}
              type="text"
              {...register("companyNumber", {
                required: true,
                pattern: /^(SC|NI|\d{2})\d{6}$/,
              })}
            ></input>
            {errors.companyNumber && (
              <div>Make sure company number is valid.</div>
            )}
            {watchCompanyDetails[0] &&
              watchCompanyDetails[1] &&
              !errors.companyNumber &&
              renderButton()}
          </div>
        )}

        {formStep === 1 && (
          <div className="form-element">
            <input
              className="form-input"
              placeholder="First Line of Company Address"
              type="text"
              {...register("address1", { required: true })}
            ></input>
            <input
              className="form-input"
              placeholder="Second Line of Company Address"
              type="text"
              {...register("address2")}
            ></input>
            <input
              className="form-input"
              placeholder="Third Line of Company Address"
              type="text"
              {...register("address3", { required: true })}
            ></input>
            <input
              className="form-input"
              placeholder="Postcode"
              error={errors.postcode}
              type="text"
              {...register("postcode", {
                required: true,
                pattern: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,
              })}
            ></input>
            {errors.postcode && (
              <div>Make sure postcode is a valid UK postcode.</div>
            )}
            {watchCompanyAddress[0] &&
              watchCompanyAddress[1] &&
              !errors.postcode &&
              renderButton()}
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
