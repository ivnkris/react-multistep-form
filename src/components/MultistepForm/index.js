import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";

import ImageUpload from "../ImageUpload";

import "./MultistepForm.css";
import "react-quill/dist/quill.snow.css";

const MultistepForm = () => {
  const STEP_COMPANY_DETAILS = 0;
  const STEP_COMPANY_INFO = 1;
  const STEP_COMPANY_ADDRESS = 2;
  const STEP_CONTACT_DETAILS = 3;
  const STEP_ID_VERIFICATION = 4;
  const STEP_LIABILITY_VERIFICATION = 5;
  const STEP_QUALIFICATIONS_VERIFICATION = 6;
  const STEP_ADDRESS_VERIFICATION = 7;

  const [formStep, setFormStep] = useState(0);
  const [isContactAddress, setIsContactAddress] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [isVat, setIsVat] = useState(false);
  const [companyInfo, setCompanyInfo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [idUrl, setIdUrl] = useState("");
  const [liabilityUrl, setLiabilityUrl] = useState("");
  const [qualificationUrl, setQualificationUrl] = useState("");
  const [addressUrl, setAddressUrl] = useState("");

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };

  const handleContactAddressChange = () => {
    setIsContactAddress(!isContactAddress);
  };

  const handleLimitedChange = () => {
    setIsLimited(!isLimited);
  };

  const handleVatChange = () => {
    setIsVat(!isVat);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const watchCompanyDetails = watch([
    "companyName",
    "ownerName",
    "companyNumber",
  ]);

  const watchCompanyAddress = watch([
    "address1",
    "postcode",
    "contactAddress1",
    "contactPostcode",
  ]);
  const watchContactDetails = watch([
    "companyEmail",
    "companyEmail2",
    "phone",
    "phone2",
  ]);

  const renderButton = (checkErrors) => {
    return (
      <div>
        {formStep > STEP_COMPANY_DETAILS && (
          <button
            className="btn btn-primary mt-1 mb-1 me-1"
            type="button"
            onClick={previousFormStep}
          >
            Previous
          </button>
        )}
        {formStep < STEP_ADDRESS_VERIFICATION && (
          <button
            className="btn btn-success mt-1 mb-1"
            type="button"
            disabled={checkErrors}
            onClick={nextFormStep}
          >
            Next
          </button>
        )}
        {formStep === STEP_ADDRESS_VERIFICATION && (
          <button
            className="btn btn-success mt-1 mb-1 me-1"
            type="submit"
            disabled={checkErrors}
          >
            Submit
          </button>
        )}
      </div>
    );
  };

  const onSubmit = (data) => {
    data.companyInfo = companyInfo;
    data.logo = logoUrl;
    data.idPhoto = idUrl;
    data.publicLiability = liabilityUrl;
    data.qualifications = qualificationUrl;
    data.proofOfAddress = addressUrl;
    console.log(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === STEP_COMPANY_DETAILS && (
          <div className="form-element">
            <label className="required mt-1">Company Name</label>
            <input
              className="form-input form-control"
              placeholder="e.g. xyz Ltd"
              type="text"
              {...register("companyName", { required: true })}
            ></input>

            <label className="required">Owner's Name</label>
            <input
              className="form-input form-control"
              placeholder="e.g. John Doe"
              type="text"
              {...register("ownerName", { required: true })}
            ></input>

            <label>Upload Company Logo</label>
            <ImageUpload setImageUrl={setLogoUrl} imageUrl={logoUrl} />

            <div className="form-check"></div>
            <input
              className="me-1 form-check-input"
              type="checkbox"
              id="isLimited"
              name="isLimited"
              {...register("limited")}
              checked={isLimited}
              onChange={handleLimitedChange}
            ></input>
            <label className="mb-1 form-check-label" htmlFor="isLimited">
              Registered Limited Company?
            </label>

            {isLimited && (
              <div className="form-element">
                <label>Company Number</label>
                <input
                  className={`form-input form-control ${
                    errors.companyNumber && watchCompanyDetails[2].length > 7
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="e.g. 12345678"
                  error={errors.companyNumber}
                  type="text"
                  {...register("companyNumber", {
                    pattern: /^(SC|NI|\d{2})\d{6}$/,
                  })}
                ></input>
                {errors.companyNumber && watchCompanyDetails[2].length > 7 && (
                  <div className="error-handling-container">
                    Make sure company number is valid
                  </div>
                )}

                <div className="form-check">
                  <input
                    className="me-1 form-check-input"
                    type="checkbox"
                    id="vat"
                    name="vat"
                    {...register("vat")}
                    checked={isVat}
                    onChange={handleVatChange}
                  ></input>
                  <label className="mb-1 form-check-label" htmlFor="vat">
                    VAT Registered?
                  </label>
                </div>
              </div>
            )}

            {renderButton(!watchCompanyDetails[0] || !watchCompanyDetails[1])}
          </div>
        )}

        {formStep === STEP_COMPANY_INFO && (
          <>
            <div className="form-element">
              <div className="company-info-container">
                <label>Company Info</label>
                <ReactQuill
                  className="mb-1 company-info-field"
                  theme="snow"
                  control={control}
                  value={companyInfo}
                  onChange={setCompanyInfo}
                />
              </div>
            </div>
            <div className="company-info-top-margin">{renderButton()}</div>
          </>
        )}

        {formStep === STEP_COMPANY_ADDRESS && (
          <div className="form-element">
            <label className="required mt-1">
              First Line of Registered Address
            </label>
            <input
              className="form-input form-control"
              placeholder="e.g. 221B Baker Street"
              type="text"
              {...register("address1", { required: true })}
            ></input>

            <label>Second Line of Registered Address</label>
            <input
              className="form-input form-control"
              placeholder="e.g. London"
              type="text"
              {...register("address2")}
            ></input>

            <label>Third Line of Registered Address</label>
            <input
              className="form-input form-control"
              placeholder=""
              type="text"
              {...register("address3")}
            ></input>

            <label className="required">Postcode</label>
            <input
              className={`form-input form-control ${
                errors.postcode && watchCompanyAddress[1].length > 4
                  ? "border-danger"
                  : ""
              }`}
              placeholder="e.g. NW1 6XE"
              error={errors.postcode}
              type="text"
              {...register("postcode", {
                required: true,
                pattern: /^[a-zA-Z]{1,2}\d[a-zA-Z\d]? ?\d[a-zA-Z]{2}$/,
              })}
            ></input>
            {errors.postcode && watchCompanyAddress[1].length > 4 && (
              <div className="error-handling-container">
                Make sure postcode is a valid UK postcode
              </div>
            )}

            <div className="form-check">
              <input
                className="me-1 form-check-input"
                type="checkbox"
                id="isContactAddress"
                name="isContactAddress"
                checked={isContactAddress}
                onChange={handleContactAddressChange}
              ></input>
              <label
                className="mb-1 form-check-label"
                htmlFor="isContactAddress"
              >
                Different Contact Address?
              </label>
            </div>

            {isContactAddress && (
              <div className="form-element">
                <label className="required">
                  First Line of Contact Address
                </label>
                <input
                  className="form-input form-control"
                  placeholder="e.g. 3 Abbey Road"
                  type="text"
                  {...register("contactAddress1")}
                ></input>

                <label>Second Line of Contact Address</label>
                <input
                  className="form-input form-control"
                  placeholder="e.g. London"
                  type="text"
                  {...register("contactAddress2")}
                ></input>

                <label>Third Line of Contact Address</label>
                <input
                  className="form-input form-control"
                  placeholder=""
                  type="text"
                  {...register("contactAddress3")}
                ></input>

                <label className="required">Postcode</label>
                <input
                  className={`form-input form-control ${
                    errors.contactPostcode && watchCompanyAddress[3].length > 4
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="e.g. NW8 9AY"
                  error={errors.contactPostcode}
                  type="text"
                  {...register("contactPostcode", {
                    pattern: /^[a-zA-Z]{1,2}\d[a-zA-Z\d]? ?\d[a-zA-Z]{2}$/,
                  })}
                ></input>
                {errors.contactPostcode &&
                  watchCompanyAddress[3].length > 4 && (
                    <div className="error-handling-container">
                      Make sure postcode is a valid UK postcode
                    </div>
                  )}
              </div>
            )}

            {renderButton(
              !watchCompanyAddress[0] ||
                !watchCompanyAddress[1] ||
                errors.postcode ||
                (isContactAddress &&
                  (!watchCompanyAddress[2] ||
                    !watchCompanyAddress[3] ||
                    errors.contactPostcode))
            )}
          </div>
        )}

        {formStep === STEP_CONTACT_DETAILS && (
          <div className="form-element">
            <label className="required mt-1">E-mail Address</label>
            <input
              className={`form-input form-control ${
                errors.companyEmail && watchContactDetails[0].length > 10
                  ? "border-danger"
                  : ""
              }`}
              placeholder="e.g. info@company.co.uk"
              error={errors.companyEmail}
              type="email"
              {...register("companyEmail", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            ></input>
            {errors.companyEmail && watchContactDetails[0].length > 10 && (
              <div className="error-handling-container">
                Make sure email address is valid
              </div>
            )}

            <label>Alternative E-mail Address</label>
            <input
              className={`form-input form-control ${
                errors.companyEmail2 && watchContactDetails[1].length > 10
                  ? "border-danger"
                  : ""
              }`}
              placeholder="e.g. personal@email.co.uk"
              error={errors.companyEmail2}
              type="email"
              {...register("companyEmail2", {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            ></input>
            {errors.companyEmail2 && watchContactDetails[1].length > 10 && (
              <div className="error-handling-container">
                Make sure email address is valid
              </div>
            )}

            <label className="required">Phone Number</label>
            <input
              className={`form-input form-control ${
                errors.phone && watchContactDetails[2].length > 9
                  ? "border-danger"
                  : ""
              }`}
              placeholder="e.g. 07123 456789"
              error={errors.phone}
              type="text"
              {...register("phone", {
                required: true,
                pattern: /^(\d|\+{1})\d|\s+$/,
                minLength: 10,
              })}
            ></input>
            {errors.phone && watchContactDetails[2].length > 9 && (
              <div className="error-handling-container">
                Make sure phone number is valid
              </div>
            )}

            <label>Alternative Phone Number</label>
            <input
              className={`form-input form-control ${
                errors.phone2 && watchContactDetails[3].length > 9
                  ? "border-danger"
                  : ""
              }`}
              placeholder="e.g. 07123 456789"
              error={errors.phone2}
              type="text"
              {...register("phone2", {
                pattern: /^(\d|\+{1})\d|\s+$/,
              })}
            ></input>
            {errors.phone2 && watchContactDetails[3].length > 9 && (
              <div className="error-handling-container">
                Make sure phone number is valid
              </div>
            )}

            <label>Website URL</label>
            <input
              className="form-input form-control"
              placeholder="e.g. www.company.co.uk"
              type="text"
              {...register("websiteUrl")}
            ></input>

            {renderButton(
              errors.companyEmail ||
                errors.phone ||
                !watchContactDetails[0] ||
                !watchContactDetails[2]
            )}
          </div>
        )}

        {formStep === STEP_ID_VERIFICATION && (
          <div className="form-element">
            <label className="required">Upload ID Picture</label>
            <ImageUpload setImageUrl={setIdUrl} imageUrl={idUrl} />

            <div className="mt-2">{renderButton(!idUrl)}</div>
          </div>
        )}

        {formStep === STEP_LIABILITY_VERIFICATION && (
          <div className="form-element">
            <label className="required">Upload Proof of Public Liability</label>
            <ImageUpload
              setImageUrl={setLiabilityUrl}
              imageUrl={liabilityUrl}
            />

            <div className="mt-2">{renderButton(!liabilityUrl)}</div>
          </div>
        )}

        {formStep === STEP_QUALIFICATIONS_VERIFICATION && (
          <div className="form-element">
            <label>Upload Proof of Relevant Qualifications</label>
            <ImageUpload
              setImageUrl={setQualificationUrl}
              imageUrl={qualificationUrl}
            />

            <div className="mt-2">{renderButton()}</div>
          </div>
        )}

        {formStep === STEP_ADDRESS_VERIFICATION && (
          <div className="form-element">
            <label className="required">Upload Proof of Address</label>
            <ImageUpload setImageUrl={setAddressUrl} imageUrl={addressUrl} />

            <div className="mt-2">{renderButton(!addressUrl)}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultistepForm;
