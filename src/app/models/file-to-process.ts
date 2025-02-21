import {ProcessStatus} from "../enums/process-status";

export interface IFileToProcess {
  name: string;
  size?: number;
  avanzamento?: number;
  status?: ProcessStatus
}
