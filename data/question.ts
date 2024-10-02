import { Problem, Status, TestCaseState } from "./types";
import { testCase as aLongWalk } from "./questionOne";
import { create } from "zustand";

export const CURRENTQUESTION = 0;

export const questions: Problem[] = [aLongWalk];

export const MAIN_FUNCTION_NAME = `function main(`;

export const useTestCasesStore = create<TestCaseState>((set) => ({
  testCaseStatus: questions.map((questionList) =>
    Array.from({ length: questionList.testCases.length }, () => ({
      status: Status.NO_CODE_RUN,
      out: null,
      err: null,
    }))
  ),
  setTestCaseStatus: (testCaseStatus, idx) =>
    set((state) => ({
      testCaseStatus: state.testCaseStatus.map((testCases, i) =>
        i === idx ? testCaseStatus : testCases
      ),
    })),
}));
