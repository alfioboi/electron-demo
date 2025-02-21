import {ProcessStatus} from "../enums/process-status";

export interface IFileToProcess {
  name: string;
  path: string;
  size?: number;
  progress?: number;
  status?: ProcessStatus
}
