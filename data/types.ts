export interface TestCase {
  hidden: boolean;
  answer: string;
  case: string;
}

export interface Problem {
  markdown: string;
  testCases: TestCase[];
  dummyCode: string;
  handler: (fn: any) => TestCaseStatus[];
}

export enum Status {
  NO_CODE_RUN = "NO_CODE_RUN",
  SUCCESS = "SUCCESS",
  BUG = "BUG",
  ERROR = "ERROR",
}

export interface TestCaseStatus {
  status: Status;
  out: string | null;
  err: string | null;
}

export interface TestCaseState {
  testCaseStatus: TestCaseStatus[][];
  setTestCaseStatus: (testCaseStatus: TestCaseStatus[], idx: number) => void;
}
