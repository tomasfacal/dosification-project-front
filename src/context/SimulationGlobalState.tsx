import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface SimulationGlobalStateInterface {
  document_number: number;
  model_drug: string;
  covariates: any; // Definir tipo de covariables en global.d.ts
  output: string;
  treatments: TreatmentJSON[];
}

const SimulationGlobalStateContext = createContext({
  state: {} as Partial<SimulationGlobalStateInterface>,
  setState: {} as Dispatch<
    SetStateAction<Partial<SimulationGlobalStateInterface>>
  >,
});

const SimulationGlobalStateProvider = ({
  children,
  value = {} as SimulationGlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<SimulationGlobalStateInterface>;
}) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("state")!)
      ? JSON.parse(localStorage.getItem("state")!)
      : value
  ); // Cuando se hace un reload, si habia algo en el localStorage, se carga el state

  useEffect(() => {
    //Actualizo el localstorage cuando se detectan cambios
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <SimulationGlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </SimulationGlobalStateContext.Provider>
  );
};

const useSimulationGlobalState = () => {
  const context = useContext(SimulationGlobalStateContext);
  if (!context) {
    throw new Error(
      "useSimulationGlobalState must be used within a SimulationGlobalStateContext"
    );
  }
  return context;
};

export { SimulationGlobalStateProvider, useSimulationGlobalState };
