import * as ReactDOM from "react-dom/client";
import * as React from "react";
import RecipeReviewCard from "./PayablePost";
import { initWeb3, getUsersPermissions } from "./web3Client";
import Grid from '@mui/material/Grid';

function App() {
  React.useEffect(() => {
    initWeb3().then(() => {
      getUsersPermissions().then((result) => { console.log(result) })
    })
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <RecipeReviewCard articleId={1} />
      </Grid>
      <Grid item xs={12}>
      <RecipeReviewCard articleId={2} />
      </Grid>
    </Grid>
  );
}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
