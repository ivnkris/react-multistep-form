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
          </div>
        )}
      </form>
    </div>
  );
};

export default MultistepForm;
