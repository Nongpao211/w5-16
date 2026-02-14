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
      <Text style={styles.title}>📦 รายการสินค้า</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>ยังไม่มีข้อมูล</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>รุ่น</Text>
              <Text style={styles.value}>{item.brand}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>สี</Text>
              <Text style={styles.value}>{item.size}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>สถานะ</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.deleteBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={styles.deleteText}>ลบ</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3, // android shadow
    shadowColor: "#000", // ios shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  value: {
    color: "#333",
  },
  status: {
    color: "#E53935",
    fontWeight: "600",
  },
  deleteBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "#E53935",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
})
