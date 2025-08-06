import Button from "@/components/button";
import FileUploader from "@/components/fileUploader";

export default function Veicoli() {
  return (
    <div className="flex flex-col p-10 gap-25">
      <div className="flex justify-start items-start">
        <Button />
      </div>
      <div className="flex flex-col justify-center items-center gap-6 h-full">
        <h1 className="text-white text-center text-8xl mb-16">Macchina o Moto?</h1>
        <FileUploader />
        <h1 className="text-green-500 text-5xl">aereo</h1>
      </div>
    </div>
  );
}
