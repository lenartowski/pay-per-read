import * as ReactDOM from "react-dom/client";
import * as React from "react";
import { Container } from "@mui/material";
import RecipeReviewCard from "./PayablePost";
import { getUsersPermissions } from "./web3Client";


function App() {
  React.useEffect(() => {
    console.log("getting users permissions");
    getUsersPermissions().then((result) => {console.log(result)})
  }, [])

  return (
    <Container>
      <RecipeReviewCard />
    </Container>
  );
}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
