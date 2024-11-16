import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <Button variant="destructive" size="icon"> Click me</Button>
      <div>
        <button className="bg-mylight1 text-white dark:bg-amber-500 dark:text-black">Click me</button>
      </div>
      <ModeToggle />
    </div>
  );
}
