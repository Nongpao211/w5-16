import { View, Text, StyleSheet, FlatList, Pressable } from "react-native"
import { useCallback, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "expo-router"

type Item = {
  id: string
  brand: string
  size: string
  status: string
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  const loadData = async () => {
    const data = await AsyncStorage.getItem("items")
    if (data !== null) {
      setItems(JSON.parse(data))
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [])
  )

  const deleteItem = async (id: string) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
    await AsyncStorage.setItem("items", JSON.stringify(newItems))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้าแรก</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>รุ่น: {item.brand}</Text>
            <Text>สี: {item.size}</Text>
            <Text style={styles.status}>สถานะ: {item.status}</Text>

            {/* ปุ่มลบมุมขวาล่าง */}
            <Pressable
              style={styles.deleteBtn}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={{ color: "#fff" }}>ลบ</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    position: "relative",
  },
  status: { marginTop: 4, color: "red" },
  deleteBtn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
})