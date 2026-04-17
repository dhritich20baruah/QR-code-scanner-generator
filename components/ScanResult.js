import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";

export default function QRScanResults({ route, qrData: propQrData }) {
  const qrData = propQrData || (route && route.params && route.params.qrData);

  const openLink = () => {
    if (Linking.canOpenURL(qrData)) {
      Linking.openURL(qrData);
    } else {
      alert("Invalid URL");
    }
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: qrData,
      });
    } catch (error) {
      console.error("Error in sharing: ", error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(qrData);
    alert("Copied to Clipboard");
  };

  return (
    <View style={style.container}>
      <Text style={style.urlTxt}>{qrData}</Text>
      <View style={style.btnContainer}>
        <TouchableOpacity style={style.touchable} onPress={openLink}>
          <Text style={style.icons}>
            <Ionicons name="open" size={45} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.touchable} onPress={shareLink}>
          <Text style={style.icons}>
            <Ionicons name="share-social" size={45} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.touchable} onPress={copyToClipboard}>
          <Text style={style.icons}>
            <Ionicons name="copy" size={45} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  urlTxt: {
    fontSize: 20,
    fontWeight: 600,
    margin: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  touchable: {
    width: "30%",
  },
  icons: {
    textAlign: "center",
    backgroundColor: "black",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});
