const fetchStations = async () => {
  console.log("Test");

  // Zufällige Basis-URL des Radioservers abrufen
  const randomBaseUrl = await getRadiobrowserBaseUrlRandom();

  // Konfiguration des ausgewählten Servers abrufen
  const config = await getRadiobrowserServerConfig(randomBaseUrl);

  // Liste der verfügbaren Sender abrufen
  const stationResponse = await fetch(`${randomBaseUrl}/json/stations`);

  // Überprüfen, ob die Anfrage erfolgreich war
  if (!stationResponse.ok) {
    throw new Error("Network response was not ok");
  }

  // JSON-Daten aus der Antwort extrahieren
  const stationData = await stationResponse.json();
  console.log(stationData);

  return stationData;
};

// Funktion, um eine zufällige Basis-URL des Radioservers abzurufen
async function getRadiobrowserBaseUrlRandom() {
  // Fetch zur API-URL, Antwort wird in response gespeichert
  const response = await fetch(
    "http://all.api.radio-browser.info/json/servers"
  );

  // Überprüfen, ob die Anfrage erfolgreich war
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // JSON-Daten aus der Antwort extrahieren
  const data = await response.json();

  // Basis-URLs extrahieren und formatieren
  const hosts = data.map((server) => `https://${server.name}`);
  return hosts[Math.floor(Math.random() * hosts.length)];
}

// Funktion, um die Konfiguration des Radioservers abzurufen
async function getRadiobrowserServerConfig(baseurl) {
  const response = await fetch(`${baseurl}/json/config`);

  // Überprüfen, ob die Anfrage erfolgreich war
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // JSON-Daten aus der Antwort extrahieren und zurückgeben
  return await response.json();
}

export default fetchStations;
