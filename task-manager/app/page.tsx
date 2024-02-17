// HomePage

import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
        <Flex gap="2" className="w-full">
            <div className="bg-amber-400 w-1/2">
                Div 1
            </div>
            <div className="bg-purple-400 w-1/2">
                Div 2
            </div>
        </Flex>
    </>
  );
}
