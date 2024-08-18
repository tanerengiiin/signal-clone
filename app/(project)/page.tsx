import SignalLogo from "@/components/signal-logo";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <SignalLogo className="w-28 h-auto" />
            <h1 className="text-4xl font-semibold mt-8 text-center text-primary">
                Welcome to Signal
            </h1>
        </div>
    );
}