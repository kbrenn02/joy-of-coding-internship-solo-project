// HomePage

import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="h-screen">
    {/* Need to center the title "welcome to task manager" */}
        <div className="flex justify-center h-16 text-3xl font-extrabold">Welcome to the Task Manager</div>
        <Flex gap="2" className="w-full h-full">
            <div className="bg-red-400 w-1/2 h-full border border-gray-light rounded-xl shadow">
                Div 1
            </div>
            <div className="bg-orange-400 w-1/2 h-full border border-gray-light rounded-xl shadow">
                Div 2
            </div>
        </Flex>       
    </div>
  );
}
