import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Share,
} from "react-native";
import { useState, useEffect } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";

export default function History() {
  return (
    <SQLiteProvider databaseName="QRApp.db">
      <QrList />
    </SQLiteProvider>
  );
}

export function QrList() {
  const db = useSQLiteContext();
  const [history, setHistory] = useState([]);

  async function fetchHistory() {
    const result = await db.getAllAsync(
      "SELECT * FROM qrScanHistory ORDER BY id DESC"
    );
    console.log(result);
    setHistory(result);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  const openLink = (qrData) => {
    if (Linking.canOpenURL(qrData)) {
      Linking.openURL(qrData);
    } else {
      alert("Invalid URL");
    }
  };

  const shareLink = async (qrData) => {
    try {
      await Share.share({
        message: qrData,
      });
    } catch (error) {
      console.error("Error in sharing: ", error);
    }
  };

  const copyToClipboard = (qrData) => {
    Clipboard.setStringAsync(qrData);
    alert("Copied to Clipboard");
  };

  async function deleteQR(id) {
    let deletion = await db.runAsync("DELETE FROM qrScanHistory WHERE id = ?", [
      id,
    ]);
    fetchHistory();
    Alert.alert("Deleted!!");
  }
  return (
    <ScrollView>
      <View style={StyleSheet.container}></View>
      {history.map((item, index) => {
        return (
          <View key={index} style={styles.tile}>
            <Text style={styles.txtDt}>{item.date}</Text>
            <Text style={styles.txtData}>{item.qrData}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => openLink(item.qrData)}
              >
                <Text style={styles.touchable}>
                  <Ionicons name="open" size={25} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => shareLink(item.qrData)}
              >
                <Text style={styles.touchable}>
                  <Ionicons name="share-social" size={25} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => copyToClipboard(item.qrData)}
              >
                <Text style={styles.touchable}>
                  <Ionicons name="copy" size={25} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => deleteQR(item.id)}
              >
                <Text style={styles.touchable}>
                  <Ionicons name="trash-bin" size={25} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "col",
  },
  tile: {
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 10,
  },
  txtData: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  txtDt: {
    color: "white",
    fontStyle: "italic",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  touchable: {
    width: "25%",
  },
  icons: {
    textAlign: "center",
    backgroundColor: "black",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
});
