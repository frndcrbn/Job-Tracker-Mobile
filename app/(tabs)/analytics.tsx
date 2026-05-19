import { View, Text, StyleSheet } from "react-native";

export default function Analytics() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Analytics</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});