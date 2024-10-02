"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MAIN_FUNCTION_NAME,
  questions,
  useTestCasesStore,
} from "@/data/question";
import { Button } from "@/components/ui/button";
import Editor from "./Editor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCodeStore } from "./CodeEditor";
import { useToast } from "@/hooks/use-toast";

export const CodeEditor = () => {
  const { testCaseStatus, setTestCaseStatus } = useTestCasesStore();
  const { code, updateCode } = useCodeStore();
  const { toast } = useToast();

  const SubmitQuestion = () => {
    let userCode = code.slice(code.indexOf(MAIN_FUNCTION_NAME));
    console.log(userCode);
    const cb = new Function(`return ${userCode}`)();
    const handler = questions[0].handler;

    if (typeof handler === "function") {
      const out = handler(cb);
      setTestCaseStatus(out, 0);
      toast({
        title: "Ran TestCases",
        description: "Check Output in TestCase Tab",
      });
    } else {
      alert("Handler function not found.");
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-6 w-full overflow-y-clip">
      <Tabs defaultValue="editor" className="w-full h-full flex flex-col">
        <div style={{ flexGrow: 0 }} className="flex justify-between">
          <TabsList className="max-w-fit">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="testcases">Testcases</TabsTrigger>
          </TabsList>
          <Button onClick={SubmitQuestion}>Run</Button>
        </div>
        <TabsContent
          value="editor"
          style={{ flexGrow: 5 }}
          className="w-full h-full "
        >
          <Editor initialDoc={code} onChange={(doc) => updateCode(doc)} />
        </TabsContent>
        <TabsContent
          value="testcases"
          style={{ flexGrow: 5 }}
          className="w-full h-full"
        >
          <div className="w-full h-full  p-6 overflow-y-auto">
            {questions[0].testCases.map((testCase, index) => (
              <div key={index} className="mb-4">
                <Collapsible>
                  <CollapsibleTrigger className="w-full">
                    <Button className="w-full">
                      TestCase {index + 1} {testCase.hidden ? "[Hidden]" : ""}
                      {(() => {
                        switch (testCaseStatus[0][index].status) {
                          case "SUCCESS":
                            return "✅";
                          case "BUG":
                            return "❌";
                          case "ERROR":
                            return "⚠️";
                          default:
                            return "";
                        }
                      })()}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border border-gray-300 rounded-md mt-2">
                    {testCaseStatus[0][index].status === "NO_CODE_RUN" ? (
                      "Code Not Run Yet!"
                    ) : (
                      <div>
                        {testCase.hidden || (
                          <p>Correct Answer: {testCase.answer}</p>
                        )}
                        <p>User Output: {testCaseStatus[0][index].out}</p>
                        <p>Error: {testCaseStatus[0][index].err}</p>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
