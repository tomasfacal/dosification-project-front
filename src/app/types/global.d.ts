declare interface TreatmentJSON {
  cycle_duration: number;
  number_of_repetitions: number;
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

declare interface BreadcrumbsItem {
  name: string,
  link: string,
}

declare interface BreadcrumbsProps {
  values: Array<BreadcrumbsItem>;
}
