import { View, Text, Share, TextInput, Button, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
// import * as MediaLibrary from "expo-media-library";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const viewShotRef = useRef(null);
  const [hasMediaLibraryPermission, setMediaLibraryPermission] = useState();

  useEffect(() => {
    // (async () => {
    //   const mediaLibraryPermission =
    //     await MediaLibrary.requestPermissionsAsync();
    //   setMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    // })();
  }, []);

  const generateQR = () => {
    if (!text.trim()) {
      Alert.alert("Please Enter Text to Generate QR Code.");
      return;
    }
    setQrValue(text);
  };

//   const downloadQRCode = async () => {
//     try {
//       if (!viewShotRef.current || !qrValue) {
//         Alert.alert("Error", "Generate a QR Code First");
//         return;
//       }
//       const uri = await viewShotRef.current.capture();

//       await MediaLibrary.saveToLibraryAsync(uri).then(() => {
//         Alert.alert("QR code saved to Media Library");
//       });
//     } catch (error) {
//       console.error("Error saving QR Code:", error);
//       Alert.alert("Error saving QR code: ", error.message);
//     }
//   };

  function createAnother() {
    setQrValue(null);
    setText("");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ margin: 10 }}>Enter Link To QR Code</Text>
      <TextInput
        placeholder="Enter Text"
        value={text}
        onChangeText={setText}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "80%",
          marginBottom: 20,
          textAlign: "center",
        }}
      />
      {qrValue ? (
        <Button title="Create Another" onPress={createAnother} color="black" />
      ) : (
        <Button title="Create QR Code" onPress={generateQR} color="black" />
      )}
      {qrValue && (
        <View style={{ margin: 20 }}>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "jpg", quality: 1.0 }}
            style={{
              marginVertical: 20,
              padding: 30,
              backgroundColor: "white",
            }}
          >
            <QRCode value={qrValue} size={200} />
          </ViewShot>
          <Button
            title="Download QR code"
            onPress={downloadQRCode}
            color="black"
          />
        </View>
      )}
    </View>
  );
}
