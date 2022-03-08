import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface ObservationsGlobalStateInterface {
  document_number: number;
  model_id: number;
  model_name: string;
}

const ObservationsGlobalStateContext = createContext({
  state: {} as Partial<ObservationsGlobalStateInterface>,
  setState: {} as Dispatch<
    SetStateAction<Partial<ObservationsGlobalStateInterface>>
  >,
});

const ObservationsGlobalStateProvider = ({
  children,
  value = {} as ObservationsGlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<ObservationsGlobalStateInterface>;
}) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("observation")!)
      ? JSON.parse(localStorage.getItem("observation")!)
      : value
  ); // Cuando se hace un reload, si habia algo en el localStorage, se carga el state

  useEffect(() => {
    //Actualizo el localstorage cuando se detectan cambios
    localStorage.setItem("observation", JSON.stringify(state));
  }, [state]);

  return (
    <ObservationsGlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </ObservationsGlobalStateContext.Provider>
  );
};

const useObservationsGlobalState = () => {
  const context = useContext(ObservationsGlobalStateContext);
  if (!context) {
    throw new Error(
      "useObservationsGlobalState must be used within a ObservationsGlobalStateContext"
    );
  }
  return context;
};

export { ObservationsGlobalStateProvider, useObservationsGlobalState };
