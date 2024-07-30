import "./../App.css";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumber: string[];
  phNumbers: {
    number: string;
  }[];
  age: string;
  dob: Date;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Abinash",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumber: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
      age: "",
      dob: new Date(),
    },
    mode: "onBlur",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  console.log("isSubmittingLog", {
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  });

  console.log({ touchedFields, dirtyFields });

  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted.", data);
  };

  // const onError = (errors: FieldErrors<FormValues>) => {
  //   console.log("formsErrorsLog", errors);
  // };

  const handleGetValues = () => {
    console.log("Get Values", getValues(["username", "channel"]));
  };

  const handleSetValues = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log("UerEffectCalled", value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // const watchForm = watch();

  renderCount++;

  return (
    <div className="form-container">
      <h1>{renderCount}</h1>
      {/* <h2 style={{ color: "#000" }}>Watched Value: {watchUsername}</h2> */}
      {/* <h2 style={{ color: "#000" }}>
        Watched Value: {JSON.stringify(watchForm)}
      </h2> */}
      <form
        action="#"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="errorMessage">{errors.username?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required.!",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              // validate: (fieldValue) => {
              //   return (
              //     fieldValue !== "admin@examle.com" ||
              //     "Enter a different email address"
              //   );
              // },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.comm" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This Domain is not Supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="errorMessage">{errors.email?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="channel">Channel:</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is Required.!",
              },
            })}
          />
          <p className="errorMessage">{errors.channel?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter:</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              // disabled: true,
              disabled: watch("channel") === "",
              required: "Enter Twitter Profile",
            })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="facebook">Facebook:</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        <div className="form-group">
          <label htmlFor="facebook">Primary Phone Number:</label>
          <input type="text" id="facebook" {...register("phoneNumber.0")} />
        </div>
        <div className="form-group">
          <label htmlFor="facebook">Secondary Phone Number:</label>
          <input type="text" id="facebook" {...register("phoneNumber.1 ")} />
        </div>
        <div>
          {fields.map((fields: any, index: any) => {
            return (
              <div className="form-group" key={fields.id}>
                <input
                  type="text"
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              append({ number: "" });
            }}
          >
            Add New Phone Number
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is Required.!",
              },
            })}
          />
          <p className="errorMessage">{errors.age?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of Birth is Required.!",
              },
            })}
          />
          <p className="errorMessage">{errors.dob?.message}</p>
        </div>
        <div className="form-group">
          <button disabled={!isDirty} type="submit">
            Submit
          </button>
        </div>
        <div className="form-group">
          <button type="submit" onClick={() => reset()}>
            Reset
          </button>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleGetValues}>
            Get Values
          </button>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleSetValues}>
            Set Values
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
