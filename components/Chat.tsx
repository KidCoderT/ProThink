"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCodeStore } from "./CodeEditor";
import { useToast } from "@/hooks/use-toast";

interface ChatItems {
  role: "user" | "model";
  parts: { text: string }[];
}

const Chat = () => {
  const [history, setHistory] = useState<ChatItems[]>([
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Great to meet you. Ill do my best to help you to solve this problem without solving it!",
        },
      ],
    },
  ]);
  const [message, setMessage] = useState<string>("");
  const { code } = useCodeStore();
  const { toast } = useToast();

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are a Programming Teacher and Avid Practitioner of Socratic teaching method. Help the student to solve the problem by helping him think step by step. If he asks any syntax or non solution questions do help. DONT GIVE CODE SNIPPETS. AND ONLY GIVE CODE IN JAVASCRIPT",
  });

  const sendMessage = async (task: string) => {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Hello. Here is the Problem we are trying to solve: 
        # Gear Ratios
        The engine schematic (your puzzle input) consists of a visual representation of the engine.
        There are lots of numbers and symbols you don&apos;t really understand, but apparently **any number adjacent to a symbol**,
        even diagonally, is a "part number" and should be included in your sum. (Periods (\`.\`) do not count as a symbol.)
        
        Here is an example engine schematic:
        
        ~~~
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        ~~~
        
        In this schematic, two numbers are not part numbers because they are **not** adjacent to a symbol: \`114\` (top right) and \`58\` (middle right). Every other number **is** adjacent to a symbol and so is a part number; their sum is *4361*.
        
        Of course, the actual engine schematic is much larger. **What is the sum of all of the part numbers in the engine schematic?**
        
        ---

        > Your code must print out a single number of the maximum number of steps you can take.
        Nothing else
        > If you wish to use Custom Functions Ensure that they are written under the main function Otherwise they won&apos;t be seen
`,
            },
          ],
        },
        ...history.slice(1),
      ],
    });

    const response = await chat.sendMessage(`${task}

    Here is my current code:
    ${code}`);

    setHistory([
      ...history,
      { role: "user", parts: [{ text: task }] },
      { role: "model", parts: [{ text: response.response.text() }] },
    ]);
  };

  const onBtnClick = async () => {
    const msg = message;
    setMessage("");

    toast({
      title: "Message Sent",
      description: "Ai Responding please wait!",
    });

    await sendMessage(msg);
  };

  const sendMsg = async (task: any) => {
    toast({
      title: "Message Sent",
      description: "Ai Responding please wait!",
    });

    await sendMessage(task);
  };

  return (
    <div className="w-full h-full p-6">
      <div className="h-full flex flex-col">
        <Card className="rounded-sm h-full flex flex-col grow-2 mb-4 overflow-x-hidden overflow-y-auto">
          {history.map((msg, idx) => (
            <div
              key={idx}
              className={`w-full flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } items-end m-2`}
            >
              <div
                className={`max-w-[350px] break-words p-2 rounded-md ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-tr-md rounded-l-md mr-4"
                    : "bg-gray-200 rounded-tl-md rounded-r-md ml-2"
                }`}
              >
                {msg.parts.map((val) => val.text).join(" ")}
              </div>
            </div>
          ))}
        </Card>
        <div className="grid max-h-[140px] min-h-[140px] w-full gap-2">
          <div className="flex justify-between">
            <Button
              onClick={() =>
                sendMsg("I am lost not sure what to do. What do i Do?")
              }
            >
              Help me!
            </Button>
            <Button
              onClick={() =>
                sendMsg("Is there a way to do what im doing better?")
              }
            >
              How can I improve?
            </Button>
            <Button
              onClick={() =>
                sendMsg(
                  "Am I doing this correctly? Is this really the most effective way?"
                )
              }
            >
              verify if i am on the right path.
            </Button>
            <Button
              onClick={() =>
                sendMsg(
                  "I dont get the question at all. Please explain it to me a bit simpler"
                )
              }
            >
              Explain question better!
            </Button>
          </div>
          <Textarea
            value={message}
            onChange={(target) => setMessage(target.target.value)}
            className="h-full"
            placeholder="Type your message here."
          />
          <Button disabled={message.length == 0} onClick={() => onBtnClick()}>
            Send message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
