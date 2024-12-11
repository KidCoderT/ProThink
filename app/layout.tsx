import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "ProThink",
  description: "learn to solve questions by yourself the professional way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Dialog defaultOpen>
          <main>{children}</main>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Welcome to ProThink</DialogTitle>
            </DialogHeader>
            <div className="text-pretty">
              <p className="text-lg mb-4 leading-relaxed">
                I designed this app as a simple project with a powerful purpose
                - to help you become a better problem solver. While it functions
                as an online code editor, its primary focus is on the journey of
                problem-solving. Instead of directly providing code solutions,
                it offers helpful hints and suggestions, explaining any problems
                and difficulties you may encounter. The AI implements the
                Socratic method, engaging you in thoughtful dialogue to reach
                solutions.
              </p>

              <p className="text-lg mb-4 leading-relaxed">
                You&apos;ll find the code editor in the top right corner where you
                can write your code. Just above it is a run button that will
                open the testcases tab. Of course, you can also manually access
                the testcases by clicking the tab directly.
              </p>

              <p className="text-lg mb-4 leading-relaxed">
                In the bottom right, you&apos;ll see the chat tab - your portal for
                interacting with the AI. Feel free to ask questions and receive
                guided assistance.
              </p>

              <p className="text-lg mb-4 leading-relaxed">
                The problem to solve appears on the left side. While there&apos;s
                currently only one challenge available (sourced from the Advent
                of Code 2023), I hope you&apos;ll enjoy the solving process
                nonetheless!
              </p>
            </div>
          </DialogContent>

          <Toaster />
        </Dialog>
      </body>
    </html>
  );
}
