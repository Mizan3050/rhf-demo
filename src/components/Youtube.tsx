import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray } from "react-hook-form";

// Async api call
/* async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  const data = await response.json();
*/

export const YouTubeForm = () => {
  const form = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();

      return {
        username: "L",
        email: data.email,
        channel: "Y",
        social: {
          twitter: "x",
          facebook: "f",
        },
        phoneNumbers: [
          {
            number: "1",
          },
          {
            number: "2",
          },
        ],
      };
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors }: { errors: any } = formState;
  const { fields } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="error">{errors?.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors?.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  type="text"
                  id="facebook"
                  {...register(`phoneNumbers.${index}.number` as const)}
                />
              </div>
            );
          })}
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
