import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { orange, purple, red } from "@mui/material/colors";

// Individuelle Themen
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: orange[600], // #ec6525
    },
    secondary: {
      main: purple[800], // #af368c
    },
    error: {
      main: red[700], // #cf1820
    },
  },
  typography: {
    fontFamily: [
      "Heavitas",
      "Coolvetica",
      "Fira Sans",
      "Roboto Slab",
      "PT Sans",
      "Myriad Pro",
    ].join(","),
  },
  shape: {
    borderRadius: 8,
  },
});

const KartenDesign = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: 640,
          height: 400,
          backgroundColor: "primary.main",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image="https://via.placeholder.com/640x420" // Ersetzen Sie den Link durch Ihr Bild
          alt="Card Image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="secondary"
          >
            Titel der Karte
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hier finden Sie eine Beschreibung des Karteninhalts. Sie können hier
            weitere Informationen hinzufügen.
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default Kartendesign;
