import { FC} from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "pages/home";
import MintNFT from "pages/mint";


const AppRoutes: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mint-nft/:user_address"  element={<MintNFT />} />
    </Routes>
  );
};
export default AppRoutes;
