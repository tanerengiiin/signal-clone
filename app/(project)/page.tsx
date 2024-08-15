import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Image
        className="w-28 h-auto"
        sizes="100vw"
        width={0}
        height={0}
        src={"/signal-logo.svg"}
        alt="Signal Logo"
      />
      <h1 className="text-4xl font-semibold mt-8 text-center text-primary">
        Welcome to Signal
      </h1>
    </div>
  );
}
