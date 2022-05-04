declare interface TreatmentJSON {
  cycle_duration: number;
  quantity: number;
}

declare interface PatientInfo {
  document_number: number;
  first_name: string;
  last_name: string;
  sex: string;
}

declare interface SimulationJSON {
  model: string;
  patient: string;
  output: string;
}

declare interface ModelInfo {
  id: number;
  name: string;
}

declare interface ResponseResultJSON {
  auc: number;
  minimum: number;
  tss: number;
  maximum: number;
  cycle_duration: number;
  number_of_repetitions: number;
  quantity: number;
  values: number[][];
}

declare interface Metrics {
  steady_state: boolean;
  tss: number;
  auc: number;
  maximum: number;
  minimum: number;
}
