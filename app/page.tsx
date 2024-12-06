import { Spotlight } from "./components/ui/Spotlight";
import { Main } from "./pages/Main";

export default function Home() {
  return (
    <>
      <Main />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 "
        fill="white"
      />
    </>
  );
}
