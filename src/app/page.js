import Image from "next/image";
import Login from "./components/login";

export default function Home() {
  return (
    <div className="fixed flex inset-0 justify-center items-center">
      <Login />
    </div>
  );
}
