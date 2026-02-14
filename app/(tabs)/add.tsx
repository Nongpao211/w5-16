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

    // 👉 กลับหน้าแรก
    router.replace("/")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สถานะการสั่งซื้อ</Text>

      <TextInput
        placeholder="Motorcycle Model"
        value={brand}
        onChangeText={setBrand}
        style={styles.input}
      />

      <TextInput
        placeholder="color"
        value={size}
        onChangeText={setSize}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>บันทึก</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 12 },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
})