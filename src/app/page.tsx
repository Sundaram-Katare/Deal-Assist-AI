import Problems from "@/components/ui/sections/problems";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-950 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center py-6 mt-36 font-semibold">
        <h1 className="font-sansSerif text-6xl text-white">Your team's AI Copilot</h1>
        <h1 className="font-sansSerif text-6xl text-white">
          for <span className="text-[#00c896]">Smarter Sales</span>
        </h1>

        <div className="text-center text-white max-w-xl py-6 my-6 font-normal">
          Upload your sales knowledge, product docs, and competitor insights. Empower your sales team with instant AI-powered answers.
        </div>

        <div className="text-center flex gap-8 text-black max-w-xl py-6 my-6 font-normal">
          <Link href={"/sign-in"} className="flex gap-1 items-center  hover:scale-[1.05] transition-all duration-300 text-2xl rounded-full px-4 py-2 text-black font-normal bg-[#00c896]">
            Start Free <MoveRight />
          </Link>

          <div className= "hover:scale-[1.05] transition-all duration-300 text-2xl rounded-full px-4 py-2 text-black font-normal bg-white">
            Book Demo
          </div>
        </div>

        <Problems />
      </main>
    </div>
  );
}
