import "./../App.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted.", data);
  };

  renderCount++;

  return (
    <div className="form-container">
      <h1>{renderCount}</h1>
      <form
        action="#"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
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
                message: "Emial is Required.!",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: (fieldValue) => {
                return (
                  fieldValue !== "admin@examle.com" ||
                  "Enter a different email address"
                );
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
          <button type="submit">Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
