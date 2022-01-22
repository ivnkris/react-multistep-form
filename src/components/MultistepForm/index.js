import { useForm } from "react-hook-form";
import { useState } from "react";

import "./MultistepForm.css";

const MultistepForm = () => {
  const STEP_COMPANY_DETAILS = 0;
  const STEP_COMPANY_ADDRESS = 1;
  const STEP_CONTACT_DETAILS = 2;

  const [formStep, setFormStep] = useState(0);
  const [isContactAddress, setIsContactAddress] = useState(false);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };

  const handleContactAddressChange = () => {
    setIsContactAddress(!isContactAddress);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const watchCompanyDetails = watch(["companyName", "companyNumber"]);
  const watchCompanyAddress = watch([
    "address1",
    "postcode",
    "contactPostcode",
  ]);
  const watchContactDetails = watch(["companyEmail"]);

  const renderButton = () => {
    return (
      <div>
        {formStep > STEP_COMPANY_DETAILS && (
          <button type="button" onClick={previousFormStep}>
            Previous
          </button>
        )}
        {formStep < STEP_CONTACT_DETAILS && (
          <button type="button" onClick={nextFormStep}>
            Next
          </button>
        )}
        {formStep === STEP_CONTACT_DETAILS && (
          <button type="submit">Submit</button>
        )}
      </div>
    );
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
            {errors.companyNumber && watchCompanyDetails[1].length > 7 && (
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
              placeholder="First Line of Company Registered Address"
              type="text"
              {...register("address1", { required: true })}
            ></input>

            <input
              className="form-input"
              placeholder="Second Line of Company Registered Address"
              type="text"
              {...register("address2")}
            ></input>

            <input
              className="form-input"
              placeholder="Third Line of Company Registered Address"
              type="text"
              {...register("address3")}
            ></input>

            <input
              className="form-input"
              placeholder="Postcode"
              error={errors.postcode}
              type="text"
              {...register("postcode", {
                required: true,
                pattern: /^[a-zA-Z]{1,2}\d[a-zA-Z\d]? ?\d[a-zA-Z]{2}$/,
              })}
            ></input>
            {errors.postcode && watchCompanyAddress[1].length > 4 && (
              <div>Make sure postcode is a valid UK postcode.</div>
            )}

            <input
              type="checkbox"
              id="isContactAddress"
              name="isContactAddress"
              checked={isContactAddress}
              onChange={handleContactAddressChange}
            ></input>
            <label htmlFor="isContactAddress">
              Is the company's contact address different from the registered
              address?
            </label>

            {isContactAddress && (
              <div className="form-element">
                <input
                  className="form-input"
                  placeholder="First Line of Company Contact Address"
                  type="text"
                  {...register("contactAddress1")}
                ></input>

                <input
                  className="form-input"
                  placeholder="Second Line of Company Contact Address"
                  type="text"
                  {...register("contactAddress2")}
                ></input>

                <input
                  className="form-input"
                  placeholder="Third Line of Company Contact Address"
                  type="text"
                  {...register("contactAddress3")}
                ></input>

                <input
                  className="form-input"
                  placeholder="Postcode"
                  error={errors.contactPostcode}
                  type="text"
                  {...register("contactPostcode", {
                    pattern: /^[a-zA-Z]{1,2}\d[a-zA-Z\d]? ?\d[a-zA-Z]{2}$/,
                  })}
                ></input>
                {errors.contactPostcode &&
                  watchCompanyAddress[2].length > 4 && (
                    <div>Make sure postcode is a valid UK postcode.</div>
                  )}
              </div>
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
              error={errors.companyEmail}
              type="email"
              {...register("companyEmail", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            ></input>
            {errors.companyEmail && watchContactDetails[0].length > 6 && (
              <div>Make sure email address is valid.</div>
            )}

            {!errors.companyEmail && watchContactDetails[0] && renderButton()}
          </div>
        )}
      </form>
    </div>
  );
};

export default MultistepForm;
