import "./../App.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("usernameeeeee is required..!"),
  email: yup
    .string()
    .email("Email format is not Valid...")
    .required("email is required..!"),
  channel: yup.string().required("channel is required..!!!"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeFormYup = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(schema),
  });

  const { control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted.", data);
  };

  return (
    <div className="form-container">
      <form
        action="#"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
          <p className="errorMessage">{errors.username?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
          <p className="errorMessage">{errors.email?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="channel">Channel:</label>
          <input type="text" id="channel" />
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

export default YouTubeFormYup;
