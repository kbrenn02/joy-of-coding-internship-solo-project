// HomePage

import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
    {/* Need to center the title "welcome to task manager" */}
        <div className="flex justify-center">Welcome to the Task Manager</div>
        <Flex gap="2" className="w-full">
            <div className="bg-red-400 w-1/2 h-96">
                Div 1
            </div>
            <div className="bg-orange-400 w-1/2 h-96">
                Div 2
            </div>
        </Flex>
        <Flex gap="2" className="w-full">
            <div className="bg-yellow-400 w-1/2 h-96">
                Div 3
            </div>
            <div className="bg-green-400 w-1/2 h-96">
                Div 4
            </div>
        </Flex>
        <Flex gap="2" className="w-full">
            <div className="bg-blue-400 w-1/2 h-96">
                Div 5
            </div>
            <div className="bg-purple-400 w-1/2 h-96">
                Div 6
            </div>
        </Flex>
        <Flex gap="2" className="w-full">
            <div className="bg-pink-400 w-1/2 h-96">
                Div 7
            </div>
            <div className="bg-gray-400 w-1/2 h-96">
                Div 8
            </div>
        </Flex>
    </>
  );
}
