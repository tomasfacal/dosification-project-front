import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  cedula: string;
  modelo: string;
};

export default function Form() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("cedula", { required: true })} placeholder="Ingrese la cedula" />
      <input {...register("modelo")} />

      <input type="submit" />
    </form>
  );
}