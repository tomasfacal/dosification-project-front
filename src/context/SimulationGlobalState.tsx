import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface SimulationGlobalStateInterface {
  document_number: string;
  model_drug: string;
  covariates: any; // Definir tipo de covariables en global.d.ts
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
  const [state, setState] = useState(value);
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
