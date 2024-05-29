#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

// Definir los pines de los LEDs y el sensor PIR
#define DHTPIN D4       // Pin digital conectado al DHT
#define DHTTYPE DHT11   // Cambia a DHT22 si usas ese sensor
#define LED_1 D1
#define LED_0 D0


DHT dht(DHTPIN, DHTTYPE);


// Reemplaza con tus credenciales de WiFi
const char* ssid = "Alumnos";
const char* password = "itpalumnos";

// Reemplaza con la URL del servidor al que deseas hacer la petición POST
const char* serverName = "http://100.73.131.10:3000/api/temperature/humidity";

void setup() {
  // Inicializar los pines
  pinMode(LED_0, OUTPUT);
  pinMode(LED_1, OUTPUT);

  // Inicializar el sensor DHT
  dht.begin();

  // Inicializar el puerto serie
  Serial.begin(9600);

  // Conectarse a WiFi
  connectToWifi();

  // Metod POST
  sendData();

}

void loop() {
    // Enviar la petición POST
    sendData();
    delay(5000);

}


void connectToWifi(){

  // Connect to Wifi Network
  WiFi.begin(ssid, password);

  //Mientras ESP8266 NO este conectado se queda esperando conección
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_0, HIGH);
    delay(1000);
    Serial.print(".");
    digitalWrite(LED_0, LOW);
  }
  
  digitalWrite(LED_1, HIGH);
  Serial.println("ESP8266 Connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

}

void sendData(){
  // Sensor readings
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  float presion = 1027;

  // Asegúrate de que la conexión WiFi esté establecida
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    WiFiClient client;

    String parameters = "?temperature=" + String(temperature) + "&humidity=" + String(humidity)+ "&pressure=" + String(presion);

    // Especifica la URL del servidor
    http.begin(client, serverName+ parameters);
    http.addHeader("Content-Type", "application/json");

    // Datos JSON a enviar
    String jsonData = "{\"value\": " + String(temperature)+"}";

    // Realizar la petición POST
    int httpResponseCode = http.POST(jsonData);

    // Comprobar el código de respuesta
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.print("Response: ");
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    // Liberar recursos
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}