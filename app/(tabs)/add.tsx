import { View, Text, TextInput, StyleSheet, Pressable } from "react-native"
import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

type Item = {
  id: string
  brand: string
  size: string
  status: string
}

export default function Add() {
  const [brand, setBrand] = useState("")
  const [size, setSize] = useState("")
  const router = useRouter()

  const saveData = async () => {
    if (!brand || !size) return

    const newItem: Item = {
      id: Date.now().toString(),
      brand,
      size,
      status: "ยังไม่ซื้อ",
    }

    const oldData = await AsyncStorage.getItem("items")
    const items: Item[] = oldData ? JSON.parse(oldData) : []

    await AsyncStorage.setItem("items", JSON.stringify([...items, newItem]))

    setBrand("")
    setSize("")
    router.replace("/")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏍 HONDA ORDER</Text>
      <Text style={styles.subHeader}>แบบฟอร์มสั่งซื้อรถจักรยานยนต์</Text>

      <View style={styles.card}>
        <Text style={styles.label}>รุ่นรถ</Text>
        <TextInput
          placeholder="เช่น CBR150R, PCX160"
          placeholderTextColor="#999"
          value={brand}
          onChangeText={setBrand}
          style={styles.input}
        />

        <Text style={styles.label}>สีรถ</Text>
        <TextInput
          placeholder="เช่น แดง, ดำ, ขาว"
          placeholderTextColor="#999"
          value={size}
          onChangeText={setSize}
          style={styles.input}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={saveData}
        >
          <Text style={styles.buttonText}>บันทึกคำสั่งซื้อ</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D50000",
    textAlign: "center",
    marginBottom: 4,
  },
  subHeader: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#D50000",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
})
