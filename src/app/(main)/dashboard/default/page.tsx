import { LinearPlot } from "./_components/linear-plot";
//import { PDFViewer } from "./_components/pdf-viewer";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <LinearPlot />
      <iframe
        src="/Playing_Atari_with_Deep_Reinforcement_Learning.pdf"
        title="Research Paper PDF"
        className="h-[80vh] w-full"
      />
    </div>
  );
}
