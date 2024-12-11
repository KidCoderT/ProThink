import Chat from "@/components/Chat";
import { CodeEditor } from "@/components/CodeEditor.1";
import Question from "@/components/Question";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { questions } from "@/data/question";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-screen justify-center w-full flex-col relative">
            <DialogTrigger asChild>
              <Button className="absolute right-10 top-10">
                Help <QuestionMarkIcon className="size-4" />{" "}
              </Button>
            </DialogTrigger>
            <Question markdown={questions[0].markdown} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <Chat />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
