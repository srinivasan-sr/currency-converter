import { NewContainer } from "./components/NewContainer";

import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-row mt-2">
        <NewContainer />
      </div>
    </div>
  );
};
export default App;
