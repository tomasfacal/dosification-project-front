import React, {Fragment} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { Routing } from '../../constant/Routing';

type FormValues = {
  cedula: string;
  modelo: string;
};

export default function Form() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  const breadcrumbs = [
    {
        name: 'Inicio',
        link: '/',
        clickable: true,
        actual: false,
      },
      {
        name: 'Seleccionar modelo/paciente',
        link: Routing.SELECCIONAR_PACIENTE,
        clickable: false,
        actual: true,
      },
      {
        name: 'Seleccionar covariables/output',
        link: Routing.MODEL_DRUG,
        clickable: false,
        actual: false,
      },
      {
        name: 'Seleccionar Tratamiento',
        link: Routing.SELECT_TREATMENTS,
        clickable: false,
        actual: false,
      },
      {
        name: 'Simulación',
        link: Routing.SIMULATION_PAGE,
        clickable: false,
        actual: false,
      }
    ];

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("cedula", { required: true })} placeholder="Ingrese la cedula" />
        <input {...register("modelo")} />

        <input type="submit" />
      </form>
    </Fragment>
  );
}
